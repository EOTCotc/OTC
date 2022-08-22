<template>
  <div class="content">
    <div class="top">
      <p>质押获得能量和优惠</p>
    </div>
    <div class="center">
      <div class="total">
        <div>
          <div class="total_flex">
            <div class="left_flex">
              <img src="@/static/image/zhiya2.png" alt="" />
              <p>质押总额</p>
              <span v-if="eotc == 0">(暂未质押)</span>
            </div>
            <div v-if="eotc == 0" class="right_flex" @click="jump()">
              <p>去质押</p>
              <van-icon name="arrow" />
            </div>
            <p class="number" v-else>{{ eotc }} EOTC</p>
          </div>

          <div class="van-hairline--bottom"></div>

          <div class="total_flex">
            <div class="left_flex">
              <img src="@/static/image/zhiya.png" alt="" />
              <p>免费能量</p>
              <span v-if="eotc == 0">(暂无能量)</span>
              <span v-else-if="eotc > 100">({{ times }}倍)</span>
            </div>
            <div :class="eotc == 0 ? 'right-text' : 'number'">
              <p>{{usdt}} USDT</p>
            </div>
          </div>
        </div>

        <div class="progress">
          <van-progress
            :percentage="percentage"
            color="#888CE5"
            :show-pivot="false"
            stroke-width="8"
          />
        </div>
      </div>
      <div class="rulebox">
        <div>
          <p>如何获取免费能量？</p>
          <p>1.用户未质押买卖双方千分之三手续费</p>
          <p>2.用户质押100 EOTC以上，每天可免手续费交易10倍的USDT</p>
          <p>3.信用节点质押5000 EOTC以上代币，每天可免手续费交易的20倍USDT</p>
          <p>4.实时节点质押10000 EOTC以上代币，每天可免手续费交易的30倍USDT</p>
          <p>5.中级节点质押50000 EOTC以上代币，每天可免手续费交易的40倍USDT</p>
          <p>6.高级节点质押100000 EOTC以上代币，每天可免手续费交易的50倍USDT</p>
        </div>
        <div class="button">
          <van-button color="#1B2945" round block @click="jump()"
            >去质押</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //质押赚取能量
  data() {
    return {
      eotc: "",
      times: "",
      usdt: "",
      percentage: 0,
    };
  },
  mounted() {
    this.eotc = localStorage.getItem("myeotc");
    this.count(this.eotc);
  },
  methods: {
    jump() {
      this.$router.push({ name: "pledgFrom" });
    },
    count(item) {
      if ((item > 100) && (item <= 5000)) {
        this.times = 10;
        this.percentage=20;
        this.usdt=item * 10
      }else if(item>5000&&item<=10000){
        this.times = 20;
        this.percentage=40;
        this.usdt=item * 20
      }else if(item>10000&&item<=50000){
        this.times = 30;
        this.percentage=60;
        this.usdt=item * 30
      }else if(item>50000&&item<=100000){
        this.times = 40;
        this.percentage=80;
        this.usdt=item * 40
      }else if(item>100000){
        this.times = 50;
        this.percentage=100;
        this.usdt=item * 50
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  .top {
    font-size: 40px;
    height: 240px;
    background: #1b2945;
    color: #fff;
    p {
      padding: 32px;
    }
  }
  .center {
    background: #f3f4f5;
    padding: 206px 32px 0;
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
            // color: #999;
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
    .rulebox {
      min-height: calc(100vh - 605px);
      background: #fff;
      padding: 32px;
      border-radius: 20px 20px 0 0;
      font-size: 28px;
      color: #666;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        margin-bottom: 20px;
      }
      p:first-child {
        font-size: 32px;
        font-weight: bold;
      }
      .button {
        margin: 60px 21px 0;
      }
    }
  }
}
</style>
