<template>
  <div class="content">
    <van-nav-bar
      fixed
      placeholder
      :title="title"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="top">
      <div @click="convert()">
        <p>{{ zyText }}</p>
        <img src="../../../static/icon/bothway.png" alt />
      </div>
      <p>{{ jdtype }}</p>
    </div>
    <div class="center">
      <div class="total">
        <div class="total_flex" @click="record()">
          <div class="left_flex">
            <img src="@/static/image/zhiya2.png" alt />

            <p>{{ $t("components.secondPhase.pledge_zong") }}</p>
          </div>

          <div class="right">
            <p class="number">{{ eotc }} EOTC</p>
            <p class="deli">{{ $t("components.secondPhase.pledge_ming") }}</p>
          </div>
        </div>

        <div class="van-hairline--bottom"></div>

        <div class="total_flex">
          <div class="left_flex">
            <img v-show="zyShow" src="@/static/image/zhiya3.png" alt />
            <img v-show="!zyShow" src="@/static/image/discounts.png" alt />
            <p>{{ brokerage }}</p>
          </div>
          <div class="number">
            <p v-if="zyShow">{{ earnings }} EOTC</p>
            <p v-else>2022.5.6</p>
          </div>
        </div>
      </div>
      <div class="service">
        <div>
          <div>
            <img v-show="zyShow" src="@/static/image/zhiya.png" alt />
            <p>{{ $t("components.secondPhase.pledge_mian") }}</p>
          </div>
          <p v-if="zyShow">{{ usdt }} USDT</p>
        </div>
        <van-progress
          class="progress"
          :percentage="percentage"
          color="#868BE9"
          stroke-width="8"
        />
      </div>
      <div v-show="zyShow" class="datum">
        <div>
          <p>{{ $t("components.secondPhase.pledge_zen") }}EOTC</p>
          <p>{{ presenter }}</p>
        </div>
        <div>
          <p>{{ $t("components.secondPhase.pledge_shou") }}(USDT)</p>
          <p>{{giftUSDT}}</p>
        </div>
        <div>
          <p>{{ $t("components.secondPhase.pledge_nft") }}</p>
          <p>0</p>
        </div>
        <div>
          <p>{{ $t("components.secondPhase.pledge_zen_nft") }}</p>
          <p>0</p>
        </div>
      </div>
      <div class="rule">
        <p class="title">2.0{{ $t("components.secondPhase.pledge_rule") }}</p>
        <div>
          {{ $t("components.secondPhase.pledge_jiaoyi") }}
          <br />{{ $t("components.secondPhase.pledge_p1") }}
        </div>
        <div>
          {{ $t("components.secondPhase.pledge_youxiao") }}
          <br />{{ $t("components.secondPhase.pledge_p2") }} <br />{{
            $t("components.secondPhase.pledge_p3")
          }}
          <br />{{ $t("components.secondPhase.pledge_p4") }} <br />{{
            $t("components.secondPhase.pledge_p5")
          }}
          <br />{{ $t("components.secondPhase.pledge_p6") }}
        </div>
        <div>
          {{ $t("components.secondPhase.pledge_xinyong") }}
          <br />{{ $t("components.secondPhase.pledge_p7") }} <br />{{
            $t("components.secondPhase.pledge_p8")
          }}
          <br />{{ $t("components.secondPhase.pledge_p9") }}
        </div>
        <div>
          {{ $t("components.secondPhase.pledge_shishi") }}
          <br />{{ $t("components.secondPhase.pledge_p10") }} <br />{{
            $t("components.secondPhase.pledge_p11")
          }}
          <br />{{ $t("components.secondPhase.pledge_p12") }} <br />{{
            $t("components.secondPhase.pledge_p13")
          }}
        </div>
        <div>
          {{ $t("components.secondPhase.pledge_zhongji") }}
          <br />{{ $t("components.secondPhase.pledge_p14") }} <br />{{
            $t("components.secondPhase.pledge_p15")
          }}
          <br />{{ $t("components.secondPhase.pledge_p16") }} <br />{{
            $t("components.secondPhase.pledge_p17")
          }}
          <br />{{ $t("components.secondPhase.pledge_p18") }}
        </div>
        <div>
          {{ $t("components.secondPhase.pledge_gaoji") }}
          <br />{{ $t("components.secondPhase.pledge_p19") }} <br />{{
            $t("components.secondPhase.pledge_p20")
          }}
          <br />{{ $t("components.secondPhase.pledge_p21") }} <br />{{
            $t("components.secondPhase.pledge_p22")
          }}
          <br />{{ $t("components.secondPhase.pledge_p23") }}
        </div>
      </div>
      <div v-show="!zyShow">
        <!-- <div  class="time">
        <p>质押到期时间</p>
        <p>2022.05.20</p>
        </div>-->
        <p class="hint">
          {{ $t("components.secondPhase.pledge_p24") }}
        </p>
      </div>

      <div v-show="zyShow" class="footer">
        <van-button color="#1B2945" block round @click="jump(1)">{{
          $t("components.secondPhase.pledge_zhiya")
        }}</van-button>
        <van-button color="#1B2945" plain block round @click="jump(2)">{{
          $t("components.secondPhase.pledge_shuhui")
        }}</van-button>
      </div>
      <div class="footer2" v-show="!zyShow">
        <van-button color="#1B2945" block round @click="jump(3)">{{
          $t("components.secondPhase.pledge_lian")
        }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { UserInfo } from "@/utils/web3";
import { MyStakeList } from "@/api/trxRequest";
export default {
  //交易质押
  data() {
    return {
      zyShow: true,
      zyText: this.$t("components.secondPhase.pledge_otc"),
      brokerage: this.$t("components.secondPhase.pledge_shouyi"),

      presenter: 0,

      eotc: "",
      usdt: 0,
      //质押收益
      earnings: 0,
      title: this.$t("components.secondPhase.zhiya"),
      //节点类型
      jdtype: "",
      percentage: 0,

      //手续费分红
      giftUSDT:''
    };
  },
  mounted() {
    // this.earnings=localStorage.getItem('nodeRate')

    this.allearning();

    this.presenter = localStorage.getItem("giftEotc");
    this.eotc = Number(localStorage.getItem("otczy"));
    this.giftUSDT = Number(localStorage.getItem('giftUSDT'))
    this.usdt = localStorage.getItem("freeNum") * 1;

    let data = UserInfo();
    let sum =
      Number(localStorage.getItem("otczy")) +
      Number(localStorage.getItem("giftEotc"));
    if (data.myjifen > 10 && sum > 100) {
      this.jdtype = this.$t("components.secondPhase.youxiao_user");
      if (sum > 5000 && data.ztman >= 5 && data.stakeMan >= 90) {
        this.jdtype = this.$t("components.secondPhase.xinyong_node");
      }
      if (
        sum > 10000 &&
        data.ztman >= 7 &&
        data.stakeMan >= 300 &&
        data.ztvip[1] * 1 >= 3
      ) {
        this.jdtype = this.$t("components.secondPhase.shishi_node");
      }
      if (
        sum > 50000 &&
        data.ztman >= 13 &&
        data.stakeMan >= 900 &&
        data.ztvip[1] * 1 >= 4
      ) {
        this.jdtype = this.$t("components.secondPhase.zhongji_node");
      }
      if (
        sum > 100000 &&
        data.ztman >= 19 &&
        data.stakeMan >= 3000 &&
        data.ztvip[1] * 1 >= 5
      ) {
        this.jdtype = this.$t("components.secondPhase.gaoji_node");
      }
    } else {
      this.jdtype = this.$t("components.secondPhase.youke");
    }
    this.plan();
  },
  methods: {
    jump(index) {
      if (index == 1) {
        this.$router.push({ name: "pledgFrom" });
      } else if (index == 2) {
        this.$router.push({ name: "shfrom" });
      } else {
        window.location.href = "https://fi.eotc.im/";
      }
    },
    onClickLeft() {
      this.$router.back();
    },
    //切换
    convert() {
      // this.zyShow = !this.zyShow
      // if (this.zyShow) {
      //   this.zyText = 'OTC质押'
      //   this.brokerage = '免手续费额度'
      // } else {
      //   this.zyText = '币币质押'
      //   this.brokerage = '当前可优惠至'
      // }
    },
    plan() {
      const myEoct = localStorage.getItem("myeotc") * 1;
      const otczy = localStorage.getItem("otczy") * 1;
      const giftEotc = localStorage.getItem("giftEotc") * 1;
      const myStakingEotc = localStorage.getItem("myStakingEotc") * 1;

      const max = myEoct + otczy + giftEotc + myStakingEotc;
      console.log(myEoct, otczy, giftEotc);
      console.log(max);
      if (max == 0) {
        return;
      }
      let num = max;
      if (max >= 100 && max < 5000) {
        num = max * 10;
      }
      if (max >= 5000 && max < 10000) {
        num = max * 20;
      }
      if (max >= 10000 && max < 50000) {
        num = max * 30;
      }
      if (max >= 50000 && max < 100000) {
        num = max * 40;
      }
      if (max >= 100000) {
        num = max * 50;
      }
      console.log(num);
      console.log(this.usdt);
      this.percentage = ((this.usdt / num) * 100).toFixed(2);
    },
    record() {
      this.$router.push({ name: "PledgeRecord" });
    },
    allearning() {
      MyStakeList({}).then((res) => {
        let zongnum = 0;
        let data = res.data;
        for (let i of data) {
          i.uid = i.uid * 1;
          if (i.uid == 6) {
            i.reward = (i.znum * 1 * 0.48 * i.uid) / 12;
          } else if (i.uid == 12) {
            i.reward = (i.znum * 1 * 0.72 * i.uid) / 12;
          } else if (i.uid == 24) {
            i.reward = (i.znum * 1 * i.uid) / 12;
          } else if (i.uid == 36) {
            i.reward = (i.znum * 1 * 1.2 * i.uid) / 12;
          }
          zongnum = zongnum + i.reward * 1;
        }
        this.earnings = zongnum;
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-nav-bar {
  background: #1b2945;
}
/deep/[class*="van-hairline"]::after {
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
            // display: flex;
            // align-items: center;
            // span{
            //   color: #999;
            //   font-size: 18px;
            // }
          }
          span {
            font-size: 28px;
          }
        }
        .right {
          .deli {
            display: flex;
            align-items: center;
            font-size: 24px;
            color: #237ff8;
            &::after {
              width: 11px;
              height: 11px;
              content: "";
              display: inline-block;
              border: 1px solid #237ff8;
              border-left: none;
              border-bottom: none;
              transform: rotate(45deg);
            }
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
    }
    .service {
      font-size: 28px;
      background: #fff;
      border-radius: 20px;
      padding: 32px;
      margin-bottom: 30px;
      img {
        width: 40px;
        height: 40px;
        margin-right: 12px;
      }
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
          display: flex;
        }
      }
      .progress {
        margin-top: 30px;
      }
    }
    .datum {
      width: calc(100vw - 128px);
      padding: 28px 30px 40px;
      background: #fff;
      box-shadow: 0px 3px 12px 1px rgba(27, 41, 69, 0.06);
      border-radius: 20px 20px 20px 20px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      div {
        width: 45%;
      }
      div:first-child {
        margin-bottom: 30px;
      }
      div p:first-child {
        font-size: 24px;
        color: #666;
        margin-bottom: 12px;
      }
      div p:last-child {
        font-size: 36px;
        font-weight: bold;
      }
    }
    .rule {
      background: #fff;
      border-radius: 20px;
      padding: 40px 30px 30px;
      margin: 30px 0 160px;
      box-shadow: 0px 3px 12px 1px rgba(27, 41, 69, 0.06);
      font-size: 28px;
      .title {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 30px;
      }
      div {
        color: #333;
        margin-bottom: 30px;
        p {
          margin-bottom: 30px;
        }
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
      width: calc(100vw - 60px);
      position: fixed;
      bottom: 0;
      right: 0;
      background: #fff;
      padding: 30px;
      display: flex;
      justify-content: space-between;
      button {
        width: 45%;
      }
    }
    .footer2 {
      width: calc(100vw - 128px);
      position: fixed;
      bottom: 60px;
      right: 64px;
    }
  }
}
</style>
