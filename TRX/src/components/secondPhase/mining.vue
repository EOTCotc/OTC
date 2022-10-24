<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <div class="header">
        <img src="../../static/icon/shovel.png" alt />
        <p>
          {{ $t("components.secondPhase.mining_shouyi") }}
          <span>(EOTC)</span>
        </p>
        <p>{{ num }}</p>
      </div>
      <div class="datum">
        <div>
          <p>{{ $t("components.secondPhase.mining_zhitui") }}</p>
          <p>{{ zt }}</p>
        </div>
        <div>
          <p>{{ $t("components.secondPhase.mining_jiantui") }}</p>
          <p>{{ jt }}</p>
        </div>
        <div>
          <p>{{ $t("components.secondPhase.mining_shequ") }}</p>
          <p>{{ team }}</p>
        </div>
        <div>
          <p>{{ $t("components.secondPhase.mining_jiedian") }}</p>
          <p>{{ node }}</p>
        </div>
      </div>
      <div class="rule">
        <p class="title">{{ $t("components.secondPhase.mining_rule") }}</p>
        <div>
          <p>{{ $t("components.secondPhase.mining_p1") }}</p>
          {{ $t("components.secondPhase.mining_p2") }} <br />{{
            $t("components.secondPhase.mining_p3")
          }}<br />{{ $t("components.secondPhase.mining_p4") }} <br />{{
            $t("components.secondPhase.mining_p5")
          }}
        </div>
        <div>
          <p>{{ $t("components.secondPhase.mining_p6") }}</p>
          {{ $t("components.secondPhase.mining_p7") }}<br />
          {{ $t("components.secondPhase.mining_p8") }} <br />
          {{ $t("components.secondPhase.mining_p9") }}
          <br />{{ $t("components.secondPhase.mining_p10") }}
        </div>
        <div>
          <p>{{ $t("components.secondPhase.mining_p11") }}</p>
          {{ $t("components.secondPhase.mining_p12") }}
          <br />{{ $t("components.secondPhase.mining_p13") }} <br />
          {{ $t("components.secondPhase.mining_p14") }} <br />
          {{ $t("components.secondPhase.mining_p15") }}<br />{{
            $t("components.secondPhase.mining_p16")
          }}<br />{{ $t("components.secondPhase.mining_p17") }} <br />{{
            $t("components.secondPhase.mining_p18")
          }}<br />{{ $t("components.secondPhase.mining_p19") }}
        </div>
      </div>
      <div class="footer">
        <van-button color="#f69540" block round @click="jump()">{{
          $t("components.secondPhase.wakuang")
        }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
//流动性挖矿收益
export default {
  components: {
    white,
  },
  data() {
    return {
      title: this.$t("components.secondPhase.wakuang"),
      num: "",
      zt: "",
      jt: "",
      team: "",
      node: "",
    };
  },
  created() {
    this.zt = localStorage.getItem("lpZt");
    this.jt = localStorage.getItem("lpJt");
    // console.log()
    this.team = localStorage.getItem("lpTeams");
    this.node = localStorage.getItem("lpNode");
    this.num = this.zt * 1 + this.jt * 1 + this.team * 1 + this.node * 1;
  },
  methods: {
    jump() {
      window.location.href = "https://trx.swap.eotc.im";
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
    background: #f69540;
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
      margin-bottom: 20px;
      p {
        margin-bottom: 20px;
        font-weight: bold;
      }
    }
  }
  .footer {
    // width: calc(100vw - 128px);
    // position: fixed;
    // bottom: 60px;
    // right: 64px;
    margin: 30px 0 60px;
  }
}
</style>
