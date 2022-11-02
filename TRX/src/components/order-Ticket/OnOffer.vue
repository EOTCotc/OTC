<template>
  <div class="content-box-container">
    <VueLoading
      v-if="dataLoading_before"
      type="spiningDubbles"
      :size="{ width: '35px', height: '35px' }"
      :style="{ fill: 'rgb(219,9, 9)' }"
    />
    <van-empty class="null" v-else-if="sellDatalist.length == 0" description="暂无订单信息" />
    <div v-else>
      <van-tabs v-model="active"  animated swipeable background="#F3F4F5">
        <van-tab title="总订单">
          <SellBlanketOrder
            v-for="(orderItem, i) in sellDatalist"
            :key="random(i)"
            :orderItem="orderItem"
            @repetition="repetition"
            :coinId="coinId"
          />
        </van-tab>
        <van-tab title="待处理">
          <SellPending :active='active' :coinType="coinType"  :coinId="coinId"></SellPending>
        </van-tab>
        <van-tab title="已完成">
          <SellAccomplish :active='active' :coinType="coinType" :coinId="coinId"></SellAccomplish>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import SellBlanketOrder from '@/components/orderFrom/SellBlanketOrder.vue'
import SellPending from '@/components/orderFrom/SellPending.vue'
import SellAccomplish from '@/components/orderFrom/SellAccomplish.vue'

import { Toast } from 'vant'
import { VueLoading } from 'vue-loading-template'

import { Order_sj } from '@/api/trxRequest'

import PubSub from 'pubsub-js'

export default {
  name: 'my-onoffer', //商家出售
  components: {
    SellBlanketOrder,
    SellPending,
    SellAccomplish,
    VueLoading,
  },
  props: {
    coinId: {
      type: [String, Number],
    },
    coinType: {
      type: [String],
    },
  },
  watch: {
    coinId: function (newVal, oldVal) {
      this.getSellData(newVal)
    },
    // coinType: function (newVal, oldVal) {
    //   console.log(newVal)
    //   this.TypeChose(newVal)
    // },
  },
  created() {
    // this.TypeChose(this.coinType)
    this.getSellData(this.coinId)
    PubSub.unsubscribe('update-selltotal-orderData')
    PubSub.subscribe('update-selltotal-orderData', () => {
      this.getSellData(this.coinId)
      this.random(Math.random(0, 10))
    })
  },
  data() {
    return {
      sellDatalist: [],
      active: '',
      dataLoading_before: true,
    }
  },
  methods: {
    async getSellData(coinID) {
      console.log(456)
      try {
        const { data } = await Order_sj({
          type: 10,
          coinID: coinID,
        })
        console.log(data)
        this.sellDatalist = data.reverse()
        this.dataLoading_before = false
      } catch (err) {
        console.warn(err)
      }
    },
    random(i) {
      return Math.random(0, i) * Math.random(0, i)
    },
    repetition() {
      this.getSellData(this.coinId)
      Toast.clear()
    },
    // onclick() {
    //   console.log(this.$refs)
    // },
    // TypeChose(type) {
    //   console.log(this.$refs)
    //   // this.$refs.Pending.kindType(type)
    //   // this.$refs.Accomplish.kindType(type)
    // },
  },
}
</script>

<style lang="less" scoped>
.vue-loading {
  width: 100vh;
  height: 50vh;
  line-height: 50vh;
}

/deep/.van-tabs__nav--line {
  height: 90%;
}
/deep/.van-tab {
  background: #fff;
  border-radius: 60px;
  margin: 24px 10px 0;
}
/deep/.van-tab--active {
  color: #2483ff;
  border: 2px solid #247ff7;
  background: #e8f2ff;
}
/deep/.van-tabs__line {
  background: none;
}

.content-box-container {
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
}

.content-box {
  flex: 1;
  overflow-y: auto;
  background: #f3f4f5;
  // padding-bottom:96px;
  .null {
    min-height: calc(100vh - 228px);
  }
}
.pop {
  height: 100vh;
}
p {
  margin: 0;
}
</style>
>
