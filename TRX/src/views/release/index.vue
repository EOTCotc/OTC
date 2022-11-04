<template>
  <div>
    <white :title="title"></white>
    <div class="top">
      <div v-if="data.num != 0">
        <img width="240" src="@/static/image/release.gif" alt="" />
        <p>{{ $t("views.release.await") }}</p>
      </div>
      <div v-else>
        <img width="240" src="@/static/image/release.png" alt="" />
        <p>{{ $t("views.release.renewable") }}EOTC</p>
      </div>
    </div>
    <div class="content">
      <div class="text">
        <p>{{ $t("views.release.num") }} {{ data.num }} EOTC</p>
        <p>{{ $t("views.release.serial") }} {{ data.ads }}</p>
        <p>{{ $t("views.release.expedite") }}</p>
      </div>
      <div class="footer">
        <van-button color="#1B2945" round plain @click="$router.back()">{{
          $t("views.release.return")
        }}</van-button>
        <van-button
          color="#1B2945"
          v-if="data.iskt == 1"
          round
          :disabled="data.num == 0 ? true : false"
          @click="expedite()"
          >{{ $t("views.release.speed") }}</van-button
        >
        <van-button color="#1B2945" disabled v-else round>{{
          $t("views.release.speed_in")
        }}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import white from "@/components/Nav/white.vue";
import { Get_MyEOTC, myeotc_js } from "@/api/trxRequest";
import { sfeotc, getTrxBalance } from "@/utils/web3";
export default {
  components: {
    white,
  },
  data() {
    return {
      title: `${this.$t("views.release.title")}EOTC`,
      data: "",
      text: "",
    };
  },
  mounted() {
    let eotc = JSON.parse(localStorage.getItem("EOTCdata"));
    if (eotc != "" && eotc != null) {
      this.data = eotc;
    }
    this.init();
  },
  methods: {
    init() {
      Get_MyEOTC({}).then((data) => {
        let date = data.data;
        if (date.num == "") {
          date.num = 0;
        }
        this.data = date;
        let EOTCdata = JSON.stringify(date);
        localStorage.setItem("EOTCdata", EOTCdata);
      });
    },
    //加速事件
    expedite() {
      Dialog.alert({
        message: `${this.$t("views.release.message[0]")}20 TRX${this.$t("views.release.message[1]")}：\nTHNYKGqFBcs3V6WrEr1Qq4LCV8mvKuK6Hh\n${this.$t("views.release.message[2]")}EOTC${this.$t("views.release.message[3]")}`,
        width: "360px",
        confirmButtonColor: "#237FF8",
        closeOnClickOverlay: true,
      }).then(() => {
        this.speed();
      });
    },
    speed() {
      let that =this
      getTrxBalance(function () {
        sfeotc(function () {
          myeotc_js({}).then((res) => {
            that.data.iskt = '0';
            console.log(that.data)

          });
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.top {
  padding: 100px 0;
  font-size: 28px;
  color: #237ff8;
  text-align: center;
}
.content {
  padding: 0 32px;
  font-size: 28px;
  .text {
    margin-bottom: 180px;
    p:nth-child(2) {
      margin: 30px 0;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    button {
      width: 45%;
    }
  }
}
</style>
