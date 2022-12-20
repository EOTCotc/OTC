<template>
  <div class="content">
    <VueLoading
      v-if="showLoading"
      type="spiningDubbles"
      :size="{ width: '35px', height: '35px' }"
      :style="{ fill: 'rgb(219,9, 9)' }"
    ></VueLoading>
    <van-empty
      class="null"
      v-else-if="dataList.length == 0"
      :description="$t('components.orderFrom.description')"
    />
    <template v-else v-for="(item, index) in dataList">
      <div class="order" v-if="item.dsx === '3'" :key="index">
        <div class="title">
          <p>
            <span>{{ item.mes }}</span
            >&nbsp;
            <span>{{ item.amount2 }}</span>
          </p>
          <span class="color-hui">{{ $t("components.orderFrom.yi") }}</span>
        </div>
        <div class="text">
          <div>
            <p>{{ $t("components.orderFrom.ordernum") }}</p>
            <p>{{ item.odid }}({{ item.id }})</p>
          </div>
          <div>
            <p>{{ $t("components.orderFrom.jiaoyinum") }}</p>
            <p>{{ item.num }} {{coinType}}</p>
          </div>
          <div>
            <p>{{ $t("components.orderFrom.price") }}</p>
            <p>{{ item.cny }} CNY</p>
          </div>
          <div>
            <p>{{ $t("components.orderFrom.tprice") }}</p>
            <span class="color-org">{{ item.amount1 }} CNY</span>
          </div>
          <div>
            <p>{{ $t("components.orderFrom.subtime") }}</p>
            <p>{{ item.eotc }}</p>
          </div>
        </div>
        <div class="van-hairline--bottom"></div>
        <div class="pay-message">
          <div class="title">
            <p></p>
            <div class="color-blue" @click="appeal_issue(item)">
              {{ $t("components.orderFrom.coin") }}
              <i class="iconfont icon-shensu"></i>
            </div>
          </div>

          <div class="text">
            <div>
              <p>{{ $t("global.name") }}</p>
              <p>{{ item.mes }}</p>
            </div>
            <div>
              <p>{{ $t("components.orderFrom.receipt_type") }}</p>
              <p v-if="getPayInfo(item)[2] === $t('global.alipay')">
                {{ $t("global.alipay") }}
              </p>
              <p v-else-if="getPayInfo(item)[2] === $t('global.wechat')">
                {{ $t("global.wechat") }}
              </p>
              <p
                v-else-if="
                  getPayInfo(item)[2] === $t('components.orderFrom.cash2')
                "
              >
                {{ $t("components.orderFrom.cash") }}
              </p>
              <p v-else>{{ getPayInfo(item)[2] }}</p>
            </div>

            <div v-if="getPayInfo(item)[2] === $t('global.alipay')">
              <p>{{ $t("components.orderFrom.alipaynum") }}</p>
              <p>{{ getPayInfo(item)[1] }}</p>
            </div>
            <div v-else-if="getPayInfo(item)[2] === $t('global.wechat')">
              <p>{{ $t("components.orderFrom.wechatnum") }}</p>
              <p>{{ getPayInfo(item)[1] }}</p>
            </div>
            <div
              v-else-if="
                getPayInfo(item)[2] === $t('components.orderFrom.cash')
              "
            ></div>
            <div v-else>
              <p>{{ $t("components.orderFrom.banknum") }}</p>
              <p>{{ getPayInfo(item)[1] }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { Eotcdis_Order } from "@/api/trxRequest";
import { VueLoading } from "vue-loading-template";

import { getcoinID } from "@/utils/utils";

import { UserBind } from "@/api/trxRequest";

export default {
  // 已完成订单
  name: "Order-ReceivedCoin-ok",
  components: {
    VueLoading,
  },
  data() {
    return {
      dataList: [],
      showLoading: true,
    };
  },
  props: {
    coinId: {
      type: [String, Number],
    },
    active: {
      type: [String,Number],
    },
    coinType: {
      type: [String],
    },
  },
  watch: {
    coinId: function (newVal, oldVal) {
      if (this.active == '3') this.initLoadingData(newVal)
    },
    active: function (newVal, oldVal) {
      if (newVal == '3')this.initLoadingData(this.coinId)
    },
  },
  created() {
    console.log(this.coinId)
    this.initLoadingData(this.coinId);
  },
  methods: {
    async initLoadingData(coinID) {
      console.log(3333)
      try {
        // let  coinID=getcoinID()
        const { data } = await Eotcdis_Order({
          t1: 1,
          t2: 4,
          coinID:coinID
        });
        this.dataList = data;
      } catch (err) {
        console.warn(err);
      }
      this.showLoading = false;
    },
    getPayInfo(item) {
      if (!item.sname) {
        return " & & ";
      }
      const value =
        item.sname?.split("&") ??
        `${this.$t("components.orderFrom.unknow_name")}&
      ${this.$t("components.orderFrom.unknow_way")}&${this.$t(
          "components.orderFrom.unknow"
        )}`;

      if (!value[2]) {
        return value.push(this.$t("components.orderFrom.unknow"));
      }
      return [value[0]?.trim(), value[1]?.trim(), value[2]?.trim()];
    },
    async appeal_issue(cur_item) {
      console.log(cur_item);
      //  await UserBind({
      //       gid: cur_item,
      //       type: 2, //关注
      //     });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  position: relative;
  min-height: 50vh;
  .vue-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  padding-bottom: 96px;
}

.icon-shensu {
  color: #f30707 !important;
}

.color-hui {
  font-weight: 700;
  color: #999999;
}
.color-org {
  color: #fc7542;
}
.color-blue {
  color: #247ff7;
  display: flex;
  align-items: center;
}
.order {
  margin: 24px;
  padding: 35px 32px 40px;
  font-size: 28px;
  background: #fff;
  color: #333;
  border-radius: 20px;
  .title {
    margin-bottom: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 32px;
      font-weight: bold;
    }
    i {
      font-size: 0.8rem;
      font-weight: 700;
    }
  }
  .text {
    margin-bottom: 30px;
    div {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      p:first-child {
        color: #999999;
      }
      .quota {
        color: #333 !important;
        display: flex;
        flex-flow: column;
        text-align: right;
      }
    }
  }
  .pay-message {
    padding-top: 30px;
    .title {
      margin-bottom: 20px;
    }
  }
  .button {
    margin: 20xp;
  }
}
.pop-content {
  padding: 32px;
  font-size: 28px;
  .title {
    font-size: 40px;
    font-weight: bold;
    color: #1b2945;
    margin-bottom: 30px;
  }
  .text {
    margin-bottom: 40px;
  }
  .button {
    margin-top: 40px;
    font-size: 32px;
    display: flex;
    flex-flow: column;
    align-items: center;
    p {
      padding: 40px 0 8px;
    }
  }
}
</style>
>
