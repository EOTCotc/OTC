<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <div class="header">
        <img src="../../static/icon/wallet2.png" alt />
        <p>
          {{ $t("components.secondPhase.zyzb_dingqi") }}
          <span>(EOTC)</span>
        </p>
        <p>{{ sum }}</p>
      </div>
      <div class="datum">
        <div>
          <p>{{ $t("components.secondPhase.zyzb_lixi") }}(EOTC)</p>
          <p>{{ interest }}</p>
        </div>
        <div>
          <p>{{ $t("components.secondPhase.nft_manghe") }}</p>
          <p>{{ boxnum }}</p>
        </div>
        <div>
          <p>{{ $t("components.secondPhase.zyzb_tuijian") }}</p>
          <p>{{ people }}</p>
        </div>
        <div>
          <p>{{ $t("components.secondPhase.zyzb_zongshu") }}</p>
          <p>{{ peopleNum }}</p>
        </div>
      </div>
      <div class="rule">
        <p class="title">{{ $t("components.secondPhase.zyzb_rule") }}</p>
        <div>
          {{ $t("components.secondPhase.zyzb_p1") }}
          <br />{{ $t("components.secondPhase.zyzb_p2") }} <br />{{
            $t("components.secondPhase.zyzb_p3")
          }}
          <br />{{ $t("components.secondPhase.zyzb_p4") }} <br />{{
            $t("components.secondPhase.zyzb_p5")
          }}
        </div>
        <div>
          <p>{{ $t("components.secondPhase.zyzb_p6") }}</p>
          {{ $t("components.secondPhase.zyzb_p7") }}
          <br />{{ $t("components.secondPhase.zyzb_p8") }} <br />{{
            $t("components.secondPhase.zyzb_p9")
          }}
          <br />{{ $t("components.secondPhase.zyzb_p10") }} <br />{{
            $t("components.secondPhase.zyzb_p11")
          }}
          <br />{{ $t("components.secondPhase.zyzb_p12") }}
        </div>
        <div>
          <p>{{ $t("components.secondPhase.zyzb_p13") }}</p>
          {{ $t("components.secondPhase.zyzb_p14") }}
          <br />{{ $t("components.secondPhase.zyzb_p15") }} <br />{{
            $t("components.secondPhase.zyzb_p16")
          }}
          <br />{{ $t("components.secondPhase.zyzb_p17") }} <br />{{
            $t("components.secondPhase.zyzb_p18")
          }}
          <br />{{ $t("components.secondPhase.zyzb_p19") }}
        </div>
        <div>
          <p>{{ $t("components.secondPhase.zyzb_p20") }}</p>
          {{ $t("components.secondPhase.zyzb_p21") }}
          <br />{{ $t("components.secondPhase.zyzb_p22") }} <br />{{
            $t("components.secondPhase.zyzb_p23")
          }}
          <br />{{ $t("components.secondPhase.zyzb_p24") }} <br />{{
            $t("components.secondPhase.zyzb_p25")
          }}
          <br />{{ $t("components.secondPhase.zyzb_p26") }}
        </div>
      </div>

      <div class="footer">
        <van-button color="#1B2945" block round @click="jump()">{{
          $t("components.secondPhase.zyzb_sub")
        }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import {  allOrder, allOrder1 } from '@/utils/web3'
import white from "@/components/Nav/white.vue";
//流动性挖矿收益
export default {
  components: {
    white,
  },
  data() {
    return {
      title: this.$t("components.secondPhase.zyzb_title"),
      //链上定期总量
      sum: 0,
      //利息
      interest: 0,
      //盲盒数量
      boxnum: 0,
      //推荐质押人数
      people: 0,
      //推荐质押总量
      peopleNum: 0,
    };
  },
  mounted() {
    this.boxnum = localStorage.getItem("handselBox");
    this.people = localStorage.getItem("stakingMan");
    this.peopleNum = localStorage.getItem("stakingNum");
  },
  created() {
    this.init();
  },
  methods: {
    jump() {
      window.location.href = "https://fi.eotc.im/";
    },
    init() {
      allOrder().then((res) => {
        console.log(res)
        for (let i of res) {
          if (i.isStop == 0) {
            this.sum+=i.amount
            this.interest += i.reward
          }
        }
        allOrder1().then((res) => {
          for (let i of res) {
            if (i.isStop == 0) {
              this.sum+=i.amount
              this.interest += i.reward
            }
          }
          this.sum=this.sum.toFixed(2)
          this.interest = this.interest.toFixed(2)
        })
      })
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 30px 32px 0;
  min-height: calc(100vh - 126px);
  font-size: 28px;
  background: #f3f4f5;
  .header {
    background: #ff9168;
    border-radius: 20px;
    color: #fff;
    padding: 40px 30px 60px;
    margin-bottom: 30px;
    position: relative;
    span {
      font-size: 24px;
    }
    p:last-child {
      margin-top: 30px;
      font-size: 40px;
      font-weight: bold;
    }
    img {
      width: 180px;
      position: absolute;
      right: 30px;
      top: 23px;
    }
  }
  .datum {
    width: calc(100vw - 128px);
    padding: 28px 30px 40px;
    margin-bottom: 30px;
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
    box-shadow: 0px 3px 12px 1px rgba(27, 41, 69, 0.06);
    font-size: 28px;
    .title {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    div {
      color: #666;
      margin-bottom: 30px;
      p {
        margin-bottom: 30px;
      }
    }
  }
  .footer {
    margin: 30px 0 60px;
  }
}
</style>
