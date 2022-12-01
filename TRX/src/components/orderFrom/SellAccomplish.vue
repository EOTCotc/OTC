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
    <div v-else class="order" v-for="(item, index) in dataList" :key="index">
      <div class="title">
        <p>
          <span>{{ item.mes | viod_value }}</span>&nbsp;
          <span>{{ item.amount2 | viod_value }}</span>
        </p>
        <span class="color-hui">{{ $t("components.orderFrom.lish") }}</span>
      </div>
      <div class="text">
        <div>
          <p>{{ $t("components.orderFrom.ordernum") }}</p>
          <p>{{ item.odid | viod_value }}({{ item.id | viod_value }})</p>
        </div>
        <div>
          <p>{{ $t("components.orderFrom.jiaoyinum") }}</p>
          <p>{{ item.num | viod_value }} USDT</p>
        </div>
        <div>
          <p>{{ $t("components.orderFrom.price") }}</p>
          <p>{{ item.cny | viod_value }} CNY</p>
        </div>
        <div>
          <p>{{ $t("components.orderFrom.tprice") }}</p>
          <span class="color-org">{{ item.amount1 | viod_value }} CNY</span>
        </div>
        <div>
          <p>{{ $t("components.orderFrom.subtime") }}</p>
          <p>{{ item.eotc | viod_value }}</p>
        </div>
      </div>
      <div class="van-hairline--bottom"></div>
      <div class="pay-message">
        <div class="title">
          <p>{{ $t("components.orderFrom.receipt") }}</p>
          <div class="color-blue" @click="appeal_issue(item)">
            <i class="iconfont icon-shensu"></i>
            {{ $t("components.orderFrom.lish_shensu") }}
          </div>
        </div>
        <div class="text">
          <div>
            <p>{{ $t("global.name") }}</p>
            <p>{{ item.mes | viod_value }}</p>
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
            v-else-if="getPayInfo(item)[2] === $t('components.orderFrom.cash')"
          ></div>
          <div v-else>
            <p>{{ $t("components.orderFrom.banknum") }}</p>
            <p>{{ getPayInfo(item)[1] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Eotcdis_Order } from '@/api/trxRequest'
import { VueLoading } from 'vue-loading-template'

export default {
  // 已完成订单
  name: 'Order-paid-ok',
  components: {
    VueLoading,
  },
  props: {
    coinId: {
      type: [String, Number],
    },
    coinType: {
      type: [String],
    },
    active: {
      type: [String, Number],
    },
  },
  data() {
    return {
      dataList: [],
      showLoading: true,
      kind: '',
    }
  },
  watch: {
    coinId: function (newVal, oldVal) {
      if (this.active == '2') this.initLoadingData(newVal)
    },
    active: function (newVal, oldVal) {
      if (newVal == '2') this.initLoadingData(this.coinId)
    },
  },
  created() {
    this.initLoadingData(this.coinId)
  },
  methods: {
    async initLoadingData(coinID) {
      try {
        const { data } = await Eotcdis_Order({
          type: 10,
          t1: 1,
          t2: 3,
          coinID: coinID,
        })
        this.dataList = data
      } catch (err) {
        this.$toast.error(this.$t("components.orderFrom.lish_error1"));
        console.warn(err);
      }
      this.showLoading = false
    },
    getPayInfo(item) {
      if (!item.sname) {
        return ' & & '
      }
      const value =
        item.sname?.split("&") ??
        `${this.$t("components.orderFrom.unknow_name")}
      &${this.$t("components.orderFrom.unknow_way")}
      &${this.$t("components.orderFrom.unknow")}`;

      if (!value[2]) {
        return value.push(this.$t("components.orderFrom.unknow"));
      }
      return [value[0]?.trim(), value[1]?.trim(), value[2]?.trim()]
    },
    appeal_issue(cur_item) {
      this.$toast.clear();
      this.$toast.warning(this.$t("components.orderFrom.lish_warn1"));
    },
  },
  filters: {
    viod_value(value) {
      return value ? value : this.$t("components.orderFrom.unknow");
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  min-height: 50vh;
  position: relative;
  .vue-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  padding-bottom: 96px;
}

.content {
  padding-bottom: 96px;
  .vue-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
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
      font-size: 40px;
      color: #247ff7;
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
