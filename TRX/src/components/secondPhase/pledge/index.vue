<template>
  <div class="content">
    <van-nav-bar fixed placeholder :title="title" left-arrow @click-left="onClickLeft" />
    <div class="top">
      <div @click="convert()">
        <p>{{ zyText }}</p>
        <img src="../../../static/icon/bothway.png" alt="" />
      </div>
      <p>交易用户</p>
    </div>
    <div class="center">
      <div class="total">
        <div class="total_flex">
          <div class="left_flex">
            <img src="@/static/image/zhiya2.png" alt="" />

            <p>质押总额</p>
          </div>

          <p class="number">{{ eotc }} EOTC</p>
        </div>

        <div class="van-hairline--bottom"></div>

        <div class="total_flex">
          <div class="left_flex">
            <img v-show="zyShow" src="@/static/image/zhiya.png" alt="" />
            <img v-show="!zyShow" src="@/static/image/discounts.png" alt="" />
            <p>{{ brokerage }}</p>
          </div>
          <div class="number">
            <p>{{ usdt }} USDT</p>
          </div>
        </div>
      </div>
      <div class="time">
        <p>质押到期时间</p>
        <p>2022.05.20</p>
      </div>
      <p class="hint">
        提示: 今日定期理财质押超过1000EOTC,次日即可减免25%的去中心化币币交易所手续费。
      </p>
      <div class="footer">
        <van-button color="#1B2945" block round @click="jump(1)">交易质押</van-button>
        <van-button color="#1B2945" plain block round @click="jump(2)">赎回</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //交易质押
  data() {
    return {
      zyShow: true,
      zyText: 'OTC质押',
      brokerage: '免手续费额度',

      eotc: '',
      usdt: 100,
      title: '交易质押',
    }
  },
  mounted() {
    this.eotc = localStorage.getItem('myeotc')
  },
  methods: {
    jump(index) {
      if (index == 1) {
        this.$router.push({ name: 'pledgFrom' })
      } else {
        this.$router.push({ name: 'shfrom' })
      }
    },
    onClickLeft() {
      this.$router.back()
    },
    //切换
    convert() {
      this.zyShow = !this.zyShow
      if (this.zyShow) {
        this.zyText = 'OTC质押'
        this.brokerage = '免手续费额度'
      } else {
        this.zyText = '币币质押'
        this.brokerage = '优惠手续费'
      }
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
  background: #1b2945;
}
/deep/[class*='van-hairline']::after {
  border: none;
}
/deep/.van-nav-bar__title {
  color: #fff;
}
/deep/.van-nav-bar .van-icon {
  color: #fff;
}
.content {
  .top {
    font-size: 40px;
    padding: 24px 32px 140px;
    background: #1b2945;
    color: #fff;
    font-size: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      padding: 10px 30px;
      background: #1b2945;
      color: #fff;
      display: flex;
      align-items: center;
      border: 1px #fff solid;
      border-radius: 40px;
      font-size: 28px;
      img {
        width: 28px;
        margin-left: 10px;
      }
    }
  }
  .center {
    background: #f3f4f5;
    min-height: calc(100vh - 480px);
    padding: 160px 32px 0;
    position: relative;
    .total {
      position: absolute;
      top: -110px;
      right: 32px;
      width: 622px;
      padding: 32px;
      font-size: 28px;
      background: #fff;
      border-radius: 20px;
      img {
        width: 40px;
        height: 40px;
        margin-right: 12px;
      }
      .total_flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999;
        .left_flex {
          display: flex;
          p {
            font-size: 32px;
            font-weight: bold;
            color: #333;
          }
          span {
            font-size: 28px;
          }
        }
        .right_flex {
          display: flex;
          align-items: center;
          color: #237ff8;
          p {
            margin-right: 10px;
          }
        }
        .right-text {
          p {
            margin-right: 10px;
          }
        }
        .number {
          color: #333;
          margin-right: 10px;
        }
      }
      .total_flex:first-child {
        padding-bottom: 40px;
      }
      .total_flex:last-child {
        padding-top: 40px;
      }
      .progress {
        margin-top: 30px;
      }
    }
    .time {
      display: flex;
      justify-content: space-between;
      padding: 38px 30px;
      font-size: 32px;
      background: #fff;
      border-radius: 20px;
    }
    .hint {
      margin-top: 30px;
      font-size: 28px;
      color: #fc7542;
      line-height: 48px;
    }
    .footer {
      width: calc(100vw - 128px);
      position: fixed;
      bottom: 60px;
      right: 64px;
      display: flex;
      justify-content: space-between;
      button {
        width: 45%;
      }
    }
  }
}
</style>
