<template>
  <div>
    <white :title="title"></white>
    <div class="content" :class="{'down': !info.isVictory}">
      <div class="result" v-if='!info.isCancel'>
        <div class="left green" :class='info.isVictory ? "green" : "orange"'>
          <van-icon v-if='info.isVictory' name="fire-o" />
          <span>{{ info.isVictory ? $t('components.arbitration.finishDetail.top.title[0]') : $t('components.arbitration.finishDetail.top.title[1]') }}</span>
        </div>
        <div :class="info.isVictory ? 'green' : 'orange'">{{ info.isVictory ? '+' : '-' }}{{ info.eotc }} EOTC</div>
      </div>
      <div class="result" v-else>
        <div class="left gray">
          <span>{{ $t('components.arbitration.finishDetail.top.title[2]') }}</span>
        </div>
      </div>
      <both :info='info'></both>
      <p class="cause">{{ $t('components.arbitration.finishDetail.event.text') }}{{ getArbitrateType(info.arbitrateInType) }}</p>
      <div class="over">
        <p>{{ $t('components.arbitration.finishDetail.result.title') }}</p>
        <p>
          {{ $t('components.arbitration.finishDetail.result.text[0]') }}{{ info.total }}{{ $t('components.arbitration.finishDetail.unit') }}，{{ $t('components.arbitration.finishDetail.result.text[1]') }}，{{ info.plaintiffNum > info.defendantNum ? `${info.plaintiffNum}${ $t('components.arbitration.finishDetail.result.text[2]') }` : `${info.defendantNum}${$t('components.arbitration.finishDetail.result.text[3]')}` }}。
        </p>
      </div>
      <div class="time">
        <p>{{ $t('components.arbitration.finishDetail.time.title') }}</p>
        <p>{{ transformDate(info.voteDate) }}</p>
      </div>
      <twosides
        :plaintiffId='info.plaintiffId'
        :defendantId='info.defendantId'
        :list="info.adduce"
      />
      <orderDetails
        :messagelist="messagelist"
        :orderlist="orderlist"
      ></orderDetails>
      <van-collapse
        v-model="activeNames"
        :border="false"
        v-if="info.status > 1"
      >
        <van-collapse-item :title="$t('components.arbitration.finishDetail.public.title')" name="1">
          <div v-for="(item, index) in info.votes" :key="index" class="flexBox">
            <div class="flex">
              <div class="right">
                <p>{{ item.name }}</p>
                <p>{{ item.number }}</p>
              </div>
              <div class="left" v-if='item.voteStatus > 0' :class="item.voteStatus === 1 ? 'colour1' : 'colour2'">
                <van-icon name="good-job-o" />
                <p v-if="item.voteStatus === 1">{{ $t('components.arbitration.finishDetail.plaintiff') }}</p>
                <p v-else>{{ $t('components.arbitration.finishDetail.defendant') }}</p>
              </div>
              <div class="left colour2" v-else>
                <p>{{ $t('components.arbitration.finishDetail.public.result') }}</p>
              </div>
            </div>
            <p class="reason cause">{{ $t('components.arbitration.finishDetail.public.reason[0]') }}{{ item.voteStatus === 1 ? $t('components.arbitration.finishDetail.plaintiff') : $t('components.arbitration.finishDetail.defendant') }}{{$t('components.arbitration.finishDetail.public.reason[1]')}}</p>
          </div>
        </van-collapse-item>
      </van-collapse>
      <div class="footer" v-if="!info.isVictory && isOver">
        <div>
          <van-button
            round
            block
            color="#1B2945"
            :to="{name:'appeal', query: {id: info.arbitrateInfoId, plaintiff: info.plaintiffId, defendant: info.defendantId, orderId: order.id}}"
          >
            {{ $t('components.arbitration.finishDetail.again') }}
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
import both from "@/components/arbitration/module/both.vue";
import orderDetails from "@/components/arbitration/module/orderDetails.vue";
import twosides from "@/components/arbitration/module/twosides.vue";
import {
  $loading,
  $toast,
  getArbitrateType,
  transformDate
} from '@/utils/utils'
import {detail} from '@/api/arbitration'

export default {
  //已结案详情
  components: {
    white,
    both,
    orderDetails,
    twosides,
  },
  data() {
    return {
      title: this.$t('components.arbitration.finishDetail.navbar'),
      endStatic: 2,
      order: {
        id: ''
      },
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
      activeNames: [""],
      show: false,
      info: {}
    };
  },
  created() {
    this.getDetail()
  },
  computed: {
    isOver() {
      const now = new Date().getTime()
      const delayDate = new Date(this.info.voteDate || 0).getTime() + (7 * 24 * 3600 * 1000)
      return delayDate - now > 0
    }
  },
  methods: {
    getArbitrateType,
    transformDate,
    getDetail() {
      const loading = $loading(this.$t('components.arbitration.finishDetail.loading.text'))
      const uid = localStorage.getItem('uid')
      detail(this.$route.query.id).then(res => {
        const items = res.items
        items.isVictory = (items.status === 2 && items.plaintiffUId === uid) || (items.status === 3 && items.defendantUId === uid)
        items.total = items.plaintiffNum + items.defendantNum
        items.adduce = items.adduce.map(item => ({...item, images: item.images.split(',')}))
        this.info = items
      }).catch(() => {
        $toast('fail', this.$t('components.arbitration.finishDetail.loading.fail'))
      }).finally(() => {
        loading.clear()
      })
    },
  },
};
</script>


<style lang="less" scoped>
/deep/.van-cell--clickable {
  font-weight: bold;
  font-size: 32px;
  padding-left: 0;
  padding-right: 0;
}
/deep/.van-cell::after {
  border: none;
}
.down {
  margin-bottom: 156px;
}
.content {
  padding: 32px;
  font-size: 28px;
  .result {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 58px;
    font-weight: bold;
    .left {
      display: flex;
      font-size: 36px;
      align-items: center;
      span {
        display: block;
        margin-left: 17px;
      }
    }
    .green {
      color: #00b87a;
    }
    .orange {
      color: #fc7542;
    }
    .gray {
      color: #999;
    }
  }
  .cause {
    padding: 24px;
    background: #f3f4f5;
    border-radius: 0px 20px 20px 20px;
    margin-top: 30px;
  }
  .over {
    margin-top: 30px;
    p:first-child {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 16px;
    }
  }
  .time {
    margin: 30px 0;
    p:first-child {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 16px;
    }
  }
  .flexBox {
    margin-bottom: 30px;
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      div {
        display: flex;
        align-items: center;
      }
      .right {
        p:first-child {
          margin-right: 52px;
        }
      }
      .left {
        p:last-child {
          margin-left: 10px;
        }
      }
      .colour1 {
        color: #4ea0f5;
      }
      .colour2 {
        color: #ed7269;
      }
    }
    .reason {
      margin: 0;
    }
  }
  .footer {
    width: 100%;
    height: 156px;
    background: #fff;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 9;
    div {
      padding: 0 32px;
    }
  }
}
</style>
