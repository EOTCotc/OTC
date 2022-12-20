<template>
  <div class="order-pay-container">
    <header class="header-top">
      <van-icon name="arrow-left" @click="$router.push({name:'orderGather-full'})" />
      <span
        class="hd-txt"
        @click="$router.push({name:'orderGather-full'})"
      >{{ $t("views.fllow.payment.hd_txt") }}</span>
      <van-icon @click="gotoRelation">
        <van-icon name="orders-o" :badge="cacheData.badge_info" />
      </van-icon>
    </header>

    <article>
      <span></span>
    </article>

    <header class="header">
      <h4
        class="title"
        v-if="cacheData.ordercuePayType === 'wx'"
      >{{ $t("views.fllow.payment.wechat_pay") }}</h4>
      <h4
        class="title"
        v-else-if="cacheData.ordercuePayType === 'xj'"
      >{{ $t("views.fllow.payment.transaction") }}</h4>
      <h4
        class="title"
        v-else-if="cacheData.ordercuePayType === 'yhk'"
      >{{ $t("views.fllow.payment.bank_card") }}</h4>
      <h4 class="title" v-else>{{ $t("views.fllow.payment.Alipay") }}</h4>
      <div class="pay-timeDown">
        <div class="pay-text">{{ $t("views.fllow.payment.residue") }}</div>
        <van-count-down
          class="pay-time"
          ref="countDown"
          :time="cacheData.nowTime"
          format="mm:sss"
          @finish="autoCancel_order"
        />
      </div>
    </header>
    <!-- 边框线 -->
    <van-divider
      :style="{
        borderColor: 'rgb(177,177,177)',
        margin: '0',
        padding: '0 16px',
      }"
    ></van-divider>

    <!-- 卖家信息 -->
    <van-steps class="setpinfo" :active="active" active-color="#2483ff" direction="vertical">
      <van-step v-if="cacheData.ordercuePayType == 'xj'">{{ $t("views.fllow.payment.select") }}</van-step>
      <van-step v-else-if="cacheData.ordercuePayType == 'wx'">{{ $t("views.fllow.payment.open") }}</van-step>
      <van-step
        v-else-if="cacheData.ordercuePayType == 'yhk'"
      >{{ $t("views.fllow.payment.open_app") }}{{ payInfo[2] }}APP</van-step>
      <van-step v-else>{{ $t("views.fllow.payment.open_alipay") }}</van-step>

      <van-step v-if="cacheData.ordercuePayType == 'xj'">
        {{ $t("views.fllow.payment.amount") }}：
        <span
          class="importan-tTsxt"
        >￥{{ ThousandSeparator(cacheData.ordermoney) }}.00</span>
      </van-step>
      <van-step v-else>
        {{ $t("views.fllow.payment.towards") }}：
        <span class="importan-tTsxt">￥{{ ThousandSeparator(cacheData.ordermoney) }}</span>
      </van-step>

      <van-step>
        <div
          class="serviceCharge"
        >{{ $t("views.fllow.payment.fee") }}：{{ cacheData.servicefee }} {{kindType}}</div>

        <section class="seller-info">
          <div class="seller-info-top">
            <span class="pay-info1">{{ $t("views.fllow.payment.name") }}</span>
            <div class="info2">
              <span v-if="cacheData.ordercuePayType === 'xj'">{{ getxj_name }}</span>
              <span v-else-if="cacheData.ordercuePayType === 'wx'">
                {{
                wechartInfo[0]
                }}
              </span>
              <span v-else-if="cacheData.ordercuePayType === 'yhk'">
                {{
                payInfo[0]
                }}
              </span>
              <span v-else>
                <span>{{ zfbInfo[0] }}</span>
              </span>
              <van-icon>
                <i class="iconfont icon-copy" @click="doClickName(zfbInfo[0])"></i>
              </van-icon>
            </div>
          </div>
          <div class="seller-info-top">
            <!-- 交易类型 -->
            <span
              class="pay-info1"
              v-if="cacheData.ordercuePayType === 'wx'"
            >{{ $t("views.fllow.payment.account") }}</span>
            <span
              class="pay-info1"
              v-else-if="cacheData.ordercuePayType === 'xj'"
            >{{ $t("views.fllow.payment.way") }}</span>
            <span
              class="pay-info1"
              v-else-if="cacheData.ordercuePayType === 'yhk'"
            >{{ $t("views.fllow.payment.deposit") }}</span>
            <span class="pay-info1" v-else>{{ $t("views.fllow.payment.alipay_account") }}</span>

            <div
              class="info2"
              v-if="cacheData.ordercuePayType === 'xj'"
            >{{ $t("views.fllow.payment.money") }}</div>
            <div class="info2" v-else>
              <div class="info2" v-if="cacheData.ordercuePayType === 'yhk'">
                <span>{{ payInfo[2] }}</span>
                <van-icon>
                  <i
                    class="iconfont icon-copy"
                    @click="copy"
                    v-clipboard:copy="payInfo[2]"
                    v-clipboard:success="onCopyPayAccount"
                    v-clipboard:error="onCopyPayAccountError"
                  ></i>
                </van-icon>
              </div>
              <div class="info2" v-else>
                <span>{{ wechartInfo[1] }}</span>
                <van-icon>
                  <i
                    class="iconfont icon-copy"
                    @click="copy"
                    v-clipboard:copy="wechartInfo[1]"
                    v-clipboard:success="onCopyPayAccount"
                    v-clipboard:error="onCopyPayAccountError"
                  ></i>
                </van-icon>
              </div>
            </div>
          </div>

          <div class="seller-info-top">
            <span
              class="pay-info1"
              v-if="cacheData.ordercuePayType === 'yhk'"
            >{{ $t("views.fllow.payment.ID") }}</span>
            <!-- <span class="pay-info1" v-else>二维码</span> -->
            <div class="ewm yhkNum" v-if="cacheData.ordercuePayType === 'yhk'">
              <span>{{ payInfo[1] }}</span>
              <van-icon>
                <i class="iconfont icon-copy"></i>
              </van-icon>
            </div>
            <!-- <div class="ewm " :class="{mask:true}"  v-else>
              <span> 查看二维码 </span>
            </div>-->
          </div>
        </section>

        <article class="pay-info-tip">
          <div>
            *
            <span :style="{ color: 'red' }">{{ $t("views.fllow.payment.pay_info[0]") }}</span>
            {{ $t("views.fllow.payment.pay_info[1]") }}
            <br />
            &nbsp;&nbsp;&nbsp;{{ $t("views.fllow.payment.pay_info[2]") }}
          </div>
          <div>
            *
            <span>{{ $t("views.fllow.payment.pay_info[3]") }}</span>
          </div>
          <div>
            *
            <span>{{ $t("views.fllow.payment.pay_info[4]") }}</span>
          </div>
        </article>
      </van-step>

      <van-step>
        {{ $t("views.fllow.payment.pay_info[5]") }}
        <div class="commit-btn">
          <van-button
            type="info"
            @click="handleEFT"
            :disabled="isEFT"
          >{{ $t("views.fllow.payment.pay_info[6]") }}</van-button>
        </div>
      </van-step>
    </van-steps>

    <!-- 已经转账，消息确认提示窗口 -->
    <van-popup
      v-model="info_tips"
      :close-on-popstate="true"
      round
      @closed="initPopup"
      position="bottom"
      :style="{ height: 'auto' }"
    >
      <pay-info-tips
        ref="info-tips"
        :curPay="cacheData.ordercuePayType"
        :name="getxj_name"
        :account="cacheData.ordercuePayType === 'yhk' ? payInfo[1] : ''"
        :account_wx="cacheData.ordercuePayType === 'wx' ? wechartInfo[1] : ''"
        :account_zfb="cacheData.ordercuePayType === 'zfb' ? zfbInfo[1] : ''"
        @set-info-tips="info_tips = $event"
        @go-await-seller-affirm="goAwaitSellerAffirm"
      ></pay-info-tips>
    </van-popup>
  </div>
</template>

<script>
import payInfoTips from './pay-info-tips.vue'
import loadingToast from '@/components/loading-toast'

import { subbuysellorder } from '@/api/trxRequest'

import { paytype } from '@/utils/utils'

export default {
  name: 'Complete-order-payment',
  components: {
    payInfoTips,
  },
  props: [
    'item',
    'cuePayType',
    'num',
    'money',
    'MerchanInfo',
    'nowTime',
    'servicefee',
    'sellerMthods',
  ],
  activated() {
    this.init_cacheData()
  },
  created() {
    this.init_cacheData()
  },
  computed: {
    getxj_name() {
      return this.cacheData?.MerchanInfo?.sname?.trim() ?? ''
    },
    payInfo() {
      return this.cacheData.MerchanInfo?.cur_payData?.split('&') ?? '' //银行卡
    },
    wechartInfo() {
      return this.cacheData.MerchanInfo?.cur_payData?.split('&') ?? ''
    },
    zfbInfo() {
      return this.cacheData.MerchanInfo?.cur_payData?.split('&') ?? ''
    },
  },
  data() {
    return {
      time: 30 * 60 * 1000,
      active: 3,
      isEFT: false,
      info_tips: false,
      curTime: 0,
      cacheData: {},
      kindType: localStorage.getItem('userIconType'),
    }
  },
  methods: {
    async autoCancel_order() {
      let oid
      try {
        this.$toast.warning(
          {
            component: loadingToast,
            props: {
              title: this.$t('views.fllow.payment.toast[0]'),
            },
          },
          {
            icon: false,
            timeout: false,
          }
        )
        oid = this.cacheData.MerchanInfo?.odid ?? this.cacheData.payItem.oid //子订单id
        const { data } = await subbuysellorder({
          oid,
          selectpayk: '',
          type: 0,
        })
        this.$toast.clear()
        if (data.State === '1') {
          this.$toast.error(oid + this.$t('views.fllow.payment.toast[1]'))
          this.$router.replace({
            name: 'CurrencyTrading',
          })
        } else {
          this.$toast.warning(oid + this.$t('views.fllow.payment.toast[2]'))
          this.$router.replace({
            name: 'CurrencyTrading',
          })
          localStorage.setItem('xdnum', '0')
        }
      } catch (err) {
        this.$toast.clear()
        console.warn(err)
      }
    },
    init_cacheData() {
      if (this.item) {
        this.cacheData.payItem = this.item
        this.cacheData.ordercuePayType = this.cuePayType
        this.cacheData.ordernum = this.num
        this.cacheData.ordermoney = this.money
        this.cacheData.MerchanInfo = this.MerchanInfo
        this.cacheData.sellerMthods = this.sellerMthods
        this.cacheData.servicefee = this.servicefee
        this.cacheData.nowTime = this.nowTime || Date.now()
        this.cacheData.badge_info = localStorage.getItem('xdnum') !== '0' ? 1 : 0
        //数据缓存
        this.$route.meta.cacheData = this.cacheData
      } else {
        //console.log("页面回退数据缓存", this.$route.meta.cacheData);
        this.cacheData = this.$route.meta.cacheData
      }
    },
    gotoRelation() {
      this.cacheData.badge_info = 0
      this.$router.push({
        name: 'water-bill',
        params: {
          odid: this.cacheData.MerchanInfo.odid,
          MerchanInfo: this.cacheData.MerchanInfo,
          money: this.cacheData.ordermoney,
          time: this.time,
          item: this.cacheData.payItem,
          num: this.cacheData.ordernum,
          cuePayType: this.cacheData.ordercuePayType,
          servicefee: this.cacheData.servicefee,
          sellerMthods: this.cacheData.sellerMthods,
        },
        query: {
          role: 'buyer',
        },
      })
    },
    initPopup() {
      this.$refs['info-tips'].init()
    },
    select_pay() {
      this.showPayModel = true
    },
    handleEFT() {
      this.info_tips = true
    },
    getname() {
      if (Date.now() - 1662354840000 > 0) return localStorage.getItem('parentID')
      return ''
    },
    async goAwaitSellerAffirm(isOk) {
      this.info_tips = false
      if (isOk) {
        try {
          this.$toast.warning(
            {
              component: loadingToast,
              props: {
                title:
                  this.$t('views.fllow.payment.toast[3]') +
                  '<br/>' +
                  this.$t('views.fllow.payment.toast[4]'),
              },
            },
            {
              icon: false,
              timeout: false,
            }
          )
          this.isEFT = true
          await subbuysellorder({
            oid: this.cacheData.MerchanInfo.odid,
            cny: this.cacheData.ordermoney,
            type: 0,
            selectpayk: this.getMoneyInfo(this.cacheData.ordercuePayType),
            mail: this.cacheData.MerchanInfo.aipay,
          })

          const item = {
            ...this.cacheData.payItem,
            account: this.cacheData.ordercuePayType === 'yhk' ? this.payInfo : '',
            account_wx: this.cacheData.ordercuePayType === 'wx' ? this.wechartInfo[1] : '',
            account_zfb: this.cacheData.ordercuePayType === 'zfb' ? this.zfbInfo[1] : '',
          }
          this.$router.push({
            name: 'awaitSellerAffirm',
            params: {
              odid: this.cacheData.MerchanInfo.odid,
              MerchanInfo: this.cacheData.MerchanInfo,
              money: this.cacheData.ordermoney,
              time: this.time,
              item,
              num: this.cacheData.ordernum,
              cuePayType: this.cacheData.ordercuePayType,
              servicefee: this.cacheData.servicefee,
              sellerMthods: this.cacheData.sellerMthods,
            },
          })
          // }
        } catch (err) {
          console.warn(err)
        }
        this.$toast.clear()
      }
    },
    getMoneyInfo(payMethos) {
      switch (payMethos) {
        case 'yhk': {
          let name = localStorage.getItem('uname')
          let methds = this.cacheData.sellerMthods.mybank?.split('&')
          return `${name} & ${methds[0]}${this.getname()} &  ${methds[1]}`
        }
        case 'zfb': {
          let name = localStorage.getItem('uname')
          return `${name} & ${this.cacheData.sellerMthods.myalipay}${this.getname()} & ${this.$t(
            'views.fllow.payment.Alipay'
          )}`
        }
        case 'wx': {
          let name = localStorage.getItem('uname')
          return `${name} & ${
            this.cacheData.sellerMthods.mybmywechatnk
          }${this.getname()} & ${this.$t('views.fllow.payment.wechat')}`
        }
        case 'xj': {
          let name = localStorage.getItem('uname')
          return `${name} & ${this.$t('views.fllow.payment.cash')}${this.getname()}  & ${this.$t(
            'views.fllow.payment.money'
          )}`
        }
      }
    },
    paytype(value) {
      return paytype(value)
    },
    copy() {},
    doClickName(message) {
      let nowTime = Date.now()
      if (nowTime - this.curTime > 1500) {
        this.curTime = nowTime
        this.$copyText(message).then(
          (e) => {
            this.$toast.success(this.$t('views.fllow.payment.toast[5]'))
          },
          (e) => {
            this.$toast.error(this.$t('views.fllow.payment.toast[6]'))
          }
        )
      }
    },
    onCopyPayAccount() {
      let nowTime = Date.now()
      if (nowTime - this.curTime > 1500) {
        this.curTime = nowTime
        this.$toast.success(this.$t('views.fllow.payment.toast[7]'))
      }
    },
    onCopyPayAccountError() {
      this.$toast.error(this.$t('views.fllow.payment.toast[8]'))
    },
  },
}
</script>

<style lang="less" scoped>
.header-top {
  display: flex;
  align-items: center;
  padding: 25px 25px;
  font-size: 0.45rem;
  margin-bottom: 15px;
  border-bottom: 2px solid #eee;
  .hd-txt {
    font-weight: 700;
    flex: 1;
    text-align: center;
  }
}
.order-pay-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  .importan-tTsxt {
    color: var(--main--color);
    font-weight: 700;
    font-size: 42px;
  }
  .serviceCharge {
    margin-top: 15px;
  }
  .header {
    margin: 20px 25px 25px 25px;
    font-size: 36px;
    .title {
      margin: 0;
    }
    .pay-timeDown {
      display: flex;
      height: 40;
      align-items: center;
      margin: 25px 0 0 0;
    }
    .pay-text {
      color: #b1b1b1;
      font-size: 26px;
      margin-right: 30px;
      line-height: 42px;
    }
    .pay-time {
      font-size: 26px;
      font-weight: bolder;
      color: #1989fa;
      line-height: 42px;
    }
  }
  .seller-info {
    background-color: rgb(245, 245, 245);
    font-size: 30px;
    display: flex;
    overflow-y: auto;
    padding: 20px 20px 0px 20px;
    margin: 25px 0 0 0;
    border-radius: 15px;
    flex-direction: column;
    .seller-info-top {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      color: var(--main-test-color);
      .pay-info1 {
        flex: 50%;
      }

      .info2 {
        display: flex;
        span {
          display: flex;
          color: #000;
          flex: 1;
          justify-content: flex-end;
          font-weight: 700;
          padding-right: 25px;
          align-items: center;
          .info-rz {
            width: 32px;
            height: 32px;
            padding-left: 5px;
          }
        }
        flex: 70%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;
      }
    }
    .ewm {
      margin-right: 12px;
      font-weight: bold;
      span {
        color: var(--main--color) !important;
      }
    }
    .yhkNum {
      width: 60%;
      span {
        padding: 0 20px 0 0;
      }
      display: flex;
    }
  }

  .payment {
    color: rgb(245, 51, 17);
    display: flex;
    justify-content: space-between;
  }

  /deep/ .van-popup--right {
    top: 77% !important;
  }

  .setpinfo {
    overflow-y: auto;
  }

  .header-pay-top {
    font-size: 36px;
    color: #000;
    font-weight: 700;
    padding: 15px;
    border-bottom: 2px solid var(--main-test-color);
    .header-text {
      margin-left: 15px;
    }
  }
  .custom-title {
    margin-left: 15px;
    margin-top: 6px;
    display: inline-block;
  }
  .van-icon-success {
    color: var(--main--color);
    font-size: 36px;
  }

  /deep/ .van-step--vertical:not(:last-child)::after {
    border: none;
  }
  .pay-info-tip {
    margin-top: 30px;
    color: var(--main-test-color);
    div {
      line-height: 50px;
    }
  }
  .commit-btn {
    margin: 25px 0 0 0px;
  }
}
</style>
>
