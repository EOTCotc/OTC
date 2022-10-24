<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <div class="top">
        <p>{{ $t("components.secondPhase.tixian") }}</p>
        <p>{{ $t("components.secondPhase.record_statu") }}</p>
        <p>{{ $t("components.secondPhase.record_date") }}</p>
      </div>

      <div class="list" v-for="(item, index) in list" :key="index">
        <p>{{ item.num }}</p>
        <p>{{ item.Chu }}</p>
        <p>{{ item.Zdate }}</p>
      </div>
      <div v-if="list.length == 0">
        <van-empty
          image="error"
          :description="$t('components.secondPhase.record_not')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
import { Toast } from "vant";
import { RechargeList } from "@/api/trxRequest";
export default {
  components: {
    white,
  },
  data() {
    return {
      title: this.$t("components.secondPhase.record_title"),
      list: [],
      loading: false,
      finished: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: this.$t("components.secondPhase.record_loading"),
      });
      RechargeList({})
        .then((res) => {
          let data = res.data;
          console.log(data);
          for (let i of data) {
            switch (i.Chu) {
              case "0":
                i.Chu = this.$t("components.secondPhase.record_confing");
                break;
              case "1":
                i.Chu = this.$t("components.secondPhase.record_wancheng");
                break;
            }
            if (i.Coin != "eotc") i.Coin = "usdt";
            i.num = i.Ru + i.Coin.toUpperCase();
          }

          this.list = data;
          Toast.success(this.$t("components.secondPhase.record_suc"));
          // console.log(data);
        })
        .catch((err) => {
          Toast.fail(this.$t("components.secondPhase.record_fail"));
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  .top {
    background: #f3f4f5;
    padding: 20px 40px 20px 48px;
    color: #999;
    font-size: 28px;
    display: flex;
    justify-content: space-between;
  }
  .list {
    padding: 28px 40px;
    color: #666;
    font-size: 28px;
    display: flex;
    justify-content: space-around;
    p {
      width: 30%;
    }
    p:last-child {
      width: 40%;
      text-align: end;
    }
    p:nth-child(2) {
      flex: 1;
      text-align: center;
    }
  }
}
</style>