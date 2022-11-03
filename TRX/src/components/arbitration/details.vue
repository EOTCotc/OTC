<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <div class="top">
        <div :class="info.status === 0 ? 'black' : ''">
          <van-icon color='#237ff8' name="underway-o" />
          <van-count-down
            v-if="info.status === 0"
            :time="info.time"
            format="DD 天 HH 时 mm 分 "
          />
          <p class='text' v-else>{{ $t('components.arbitration.pendingDetail.top.title') }}</p>
        </div>
<!--        v-if="info.status === 0"-->
        <van-button
          plain
          round
          type="info"
          size="mini"
          v-if='!info.hasDelay'
          :to="{ name: 'adjourn', query: { id: $route.query.id } }"
        >
          {{ $t('components.arbitration.pendingDetail.top.delay') }}
        </van-button>
      </div>
      <div class="time">
        <p>{{ $t('components.arbitration.pendingDetail.time.title') }}</p>
        <p>{{ transformDate(info.createDate) }}</p>
      </div>
      <bothplan
        :info='info'
      ></bothplan>
      <div class="cause">{{ $t('components.arbitration.pendingDetail.reason.text') }}{{ getArbitrateType(info.arbitrateInType) }}</div>
      <twosides
        :plaintiffId='info.plaintiffId'
        :defendantId='info.defendantId'
        :list="info.adduce"
      />
      <orderDetails
        :messagelist="messagelist"
        :orderlist="orderlist"
      ></orderDetails>
      <van-row :gutter='15' v-if="info.status < 2" class="footer">
        <van-col :span='info.status === 0 ? 12 : 24' v-if='info.plaintiffUId === uid'>
          <van-button
            round
            block
            plain
            @click="cancelArbitrate"
          >{{ $t('components.arbitration.pendingDetail.cancel.button') }}
          </van-button>
        </van-col>
        <van-col v-if='info.status === 0' :span='info.plaintiffUId === uid ? 12 : 24'>
          <van-button
            round
            block
            color="#1B2945"
            :to='{ name: "additionalProof", query: { id: $route.query.id } }'
          >
            {{$t('components.arbitration.pendingDetail.append')}}
          </van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
import orderDetails from "@/components/arbitration/module/orderDetails.vue";
import twosides from "@/components/arbitration/module/twosides.vue";
import bothplan from "@/components/arbitration/module/both.vue";
import {
  cancel,
  detail
} from '@/api/arbitration'
import {
  $loading,
  $toast,
  getArbitrateType,
  transformDate
} from '@/utils/utils'
export default {
  //仲裁员身份的待处理详情
  //仲裁案详情
  components: {
    white,
    orderDetails,
    twosides,
    bothplan,
  },
  data() {
    return {
      title: this.$t('components.arbitration.pendingDetail.navbar'),
      uid: '',
      orderlist: [
        {
          title: this.$t('components.arbitration.order.order.number'),
          number: "7777781205789",
        },
        {
          title: this.$t('components.arbitration.order.order.quantity'),
          number: "997.00000 USDT",
        },
        {
          title: this.$t('components.arbitration.order.order.price'),
          number: "6.35 CNY",
        },
        {
          title: this.$t('components.arbitration.order.order.totalPrice'),
          number: "6350.00 CNY",
          show: true,
        },
        {
          title: this.$t('components.arbitration.order.order.createDate'),
          number: "2022.05.26 15:00:21",
        },
      ],
      messagelist: [
        { title: this.$t('components.arbitration.order.pay.name'), value: "李牧" },
        { title: this.$t('components.arbitration.order.pay.bank'), value: "工商银行" },
        { title: this.$t('components.arbitration.order.pay.id'), value: "4005633224656232" },
      ],
      info: {}
    };
  },
  methods: {
    transformDate,
    getArbitrateType,
    getDetail() {
      const loading = $loading(this.$t('components.arbitration.pendingDetail.loading.text'))
      detail(this.$route.query.id).then(res => {
        const items = res.items
        items.total = items.plaintiffNum + items.defendantNum
        items.adduce = items.adduce.map(item => ({...item, images: item.images.split(',')}))
        items.time = this.$dayjs(items.status === 0 ? items.adduceDate : items.voteDate).add(-8, 'hour').diff(this.$dayjs().utc(), 'millisecond')
        this.info = items
      }).catch((err) => {
        $toast('fail', this.$t('components.arbitration.pendingDetail.loading.fail'))
      }).finally(() => {
        loading.clear()
      })
    },
    // 取消仲裁
    cancelArbitrate() {
      this.$dialog.confirm({
        title: this.$t('components.arbitration.pendingDetail.cancel.button'),
        message: this.$t('components.arbitration.pendingDetail.cancel.message'),
        callback: action => {
          if (action === 'confirm') {
            const loading = $loading('loading', this.$t('components.arbitration.pendingDetail.cancel.loading'))
            cancel(this.$route.query.id).then(res => {
              $toast('success', this.$t('components.arbitration.pendingDetail.cancel.success'), () => this.$router.go(-1))
            }).catch(err => {
              $toast('fail', err.message || this.$t('components.arbitration.pendingDetail.cancel.fail'))
            }).finally(() => {
              loading.clear()
            })
          }
        }
      })
    }
  },
  created() {
    this.uid = localStorage.getItem('uid')
    this.getDetail()
  }
};
</script>

<style lang="less" scoped>
.content {
  padding: 32px;
  font-size: 28px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
    .black {
      color: #333;
    }
    div {
      display: flex;
      align-items: center;
      .text {
        color: #237ff8;
        font-weight: bold;
        font-size: 32px;
      }
      i {
        font-size: 42px;
        padding-right: 12px;
      }
      /deep/.van-count-down {
        color: #237ff8;
      }
    }
  }
  .time {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    p:first-child {
      font-weight: bold;
    }
    p:last-child {
      color: #999;
    }
  }
  .both {
    display: flex;
    justify-content: space-between;
    // margin-bottom: 30px;
    .bothBox {
      width: 40%;
      padding: 24px;
      box-shadow: 0px 3px 12px 1px rgba(27, 41, 69, 0.03);
      position: relative;
      .accuser {
        background: #4ea0f5;
        color: #fff;
        font-weight: bold;
        padding: 8px 24px;
        border-radius: 0 24px 24px 24px;
        position: absolute;
        top: 0;
        left: 0;
      }
      .accused {
        background: #ec6f66;
        color: #fff;
        font-weight: bold;
        padding: 8px 24px;
        border-radius: 0 24px 24px 24px;
        position: absolute;
        top: 0;
        left: 0;
      }
      div:first-of-type {
        display: flex;
        flex-direction: row-reverse;
      }
      div:last-child {
        display: flex;
        align-items: center;
        padding-top: 24px;
        img {
          width: 60px;
        }
        p {
          margin-left: 12px;
        }
        span {
          color: #999;
        }
      }
    }
  }
  .cause {
    padding: 24px;
    background: #f3f4f5;
    border-radius: 0px 20px 20px 20px;
    margin: 30px 0;
  }

  .footer {
    margin: 60px 0 30px;
  }

  .judgment-pop {
    padding: 32px 32px 60px;
    font-size: 32px;
    p {
      margin-bottom: 30px;
    }
    p:first-child {
      font-weight: bold;
    }
    p:nth-child(2) {
      color: #f37a4c;
    }
    .asd {
      border: 1px solid #c8cfde;
      border-radius: 20px;
      margin-bottom: 30px;
    }
    .button {
      display: flex;
      justify-content: space-between;
      button {
        width: 45%;
      }
    }
  }
  .winpop {
    padding: 32px 32px 60px;
    p:first-child {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    p:nth-child(2) {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    p:nth-child(3) {
      color: #666;
      margin-bottom: 100px;
    }
    .button {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      button {
        width: 45%;
      }
    }
  }
  .judgmentbox {
    div:first-child {
      display: flex;
      // padding: 0 30px;

      justify-content: space-between;
      p:first-child {
        font-size: 32px;
        font-weight: bold;
      }
      div {
        display: flex;
        align-items: center;
        color: #4ea0f5;
      }
    }
    .message {
      margin-top: 30px;
      padding: 24px;
      border-radius: 0px 20px 20px 20px;
      background: #f3f4f5;
    }
  }
}
</style>

