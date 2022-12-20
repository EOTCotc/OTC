<template>
  <div class="currency">
    <div>
      <van-tabs @change="currency_Change" v-model="active" line-height="2px" swipeable>
        <!-- selsect 内容筛选 -->
        <div class="selsect">
          <selectNav @change-pay="changePay" @change-size="changeSize" />
        </div>
        <div class="ordernum" v-if="count!=0">
          <p>{{$t('components.chooseWay.currencyType.title[0]')}} {{count}} {{ $t('components.chooseWay.currencyType.title[1]') }}</p>
          <van-button
            round
            size="small"
            type="primary"
            :to="{name:'orderGather-full'}"
          >{{$t('components.chooseWay.currencyType.handle')}}</van-button>
        </div>
        <van-loading
          size="24px"
          vertical
          v-if="listLoading"
        >{{$t('components.chooseWay.currencyType.loading.text')}}</van-loading>

        <van-tab v-for="(item, index) in typeList" v-else :title="item" :key="index">
          <payment_empty v-if="isShow_empty" />

          <div v-else>
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="$t('components.chooseWay.currencyType.loading.finishedText')"
              @load="onLoad"
            >
              <!-- 交易列表 start -->
              <van-cell-group inset v-for="(items, i) in list" :key="i">
                <van-cell>
                  <template #title>
                    <!-- store -->
                    <div class="left" @click="to_merchantInfo(items)">
                      <div class="aut-img">
                        {{ items.sname.slice(0, 1) }}
                        <div class="online-icon" v-if="isActive_user(items.updateDate)">
                          <p class="online-status"></p>
                        </div>
                      </div>
                      <span class="text">{{ items.sname }}</span>
                    </div>
                  </template>
                  <template>
                    <div class="right">
                      <!-- {{items.eotc}} EOTC | -->
                      <span>{{ items.odid }} | {{ items.chenjiao }}%</span>
                    </div>
                  </template>
                </van-cell>
                <van-cell>
                  <template #title>
                    <div
                      class="left"
                    >{{ $t('components.chooseWay.currencyType.text[0]') }} {{ items.num | ThousandSeparator }} {{ item }}</div>
                  </template>
                  <template #label>
                    <div>
                      {{ $t('components.chooseWay.currencyType.text[1]') }} {{ items.amount1 | ThousandSeparator }} -
                      {{ items.amount2 | ThousandSeparator }} CNY
                    </div>
                    <Pay-Icons :items="items"></Pay-Icons>
                  </template>
                  <template>
                    <div class="right">
                      <span>{{ $t('components.chooseWay.currencyType.text[2]') }}</span>
                    </div>
                  </template>
                  <template>
                    <div class="right">
                      <span class="txt">￥{{ items.cny }}</span>
                    </div>
                  </template>
                  <template>
                    <div>
                      <van-button class="comfig-button" size="mini" @click="SubmitTrading(i)">
                        {{ method }}
                        <!--   去购买 -->
                      </van-button>
                    </div>
                  </template>
                </van-cell>
              </van-cell-group>
              <!-- 交易列表 end -->
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 底部 -->
    <div class="tail">
      <div>
        <!-- <img src="@/assets/imgs/c.png" />
        <span>{{ $t("home.tags5") }}</span>-->
      </div>
      <div @click="handleTabLang">
        <span class="tab-lang">{{ textLang }}</span>
        <van-icon :name="iconLang" />
      </div>
    </div>
    <!-- 选择语言 -->
    <van-popup
      v-model="showPopup2"
      :style="{ height: '100vh', background: '#1b2946', zIndex: '55' }"
      position="right"
    >
      <div class="menu">
        <div class="menu-every" v-for="item in lang" @click="tabLang(item)" :key="item.id">
          <span>{{ item.text }}</span>
        </div>
      </div>
    </van-popup>
    <!-- 购买交易弹窗 -->
    <van-popup
      v-model="isShowTradingPopup"
      round
      @opened="showModel"
      @closed="closeModel"
      :close-on-popstate="true"
      position="bottom"
      class="payPopou"
      get-container="body"
      closeable
      :style="{ height: '50%' }"
    >
      <!-- 购买交易弹窗 main 内容-->
      <payFllow
        :curPayData="list[activeIndex]"
        :activePayType="typeList[active]"
        :sellerMthods="sellerMthods"
        :key="activeIndex"
        ref="pay-popup"
      ></payFllow>
    </van-popup>
  </div>
</template>

<script>
import Dayjs from 'dayjs'

import PayIcons from './pay-Icons'
import selectNav from '@/components/selectNav'
import payFllow from '@/components/deal-Fllow/pay-Fllow.vue'
import payment_empty from '@/views/order-gather/payment-empty.vue'

import { EotcBuyOrder, UserBind, Eotcdis_Order, CoinList } from '@/api/trxRequest'

import { myPayment } from '@/api/payverification'

import { payInfoUser } from '@/api/payverification'
import { getItem, getItemSession, setItemSession } from '@/utils/storage'
import { loadweb3, userBaseMes } from '@/utils/web3'

import { getcreditscorebyuid, getuserrisklevel } from '@/api/arbitrationMsg'

import { Dialog } from 'vant'

import { SetPayType } from '@/api/payverification'

export default {
  name: 'Currency-Type-content',
  components: {
    PayIcons,
    selectNav,
    payFllow,
    payment_empty,
  },
  data() {
    return {
      active: 0, // 交易类型列表 当前激活项
      activeIndex: undefined, // 当前正在交易
      // activeSelect: 0, // 当前交易选择类型
      list: [], // 货单交易列表
      listLoading: true,
      pay: '', //支付交易方式列表
      loading: false, // 数据加载
      finished: false,
      isShowTradingPopup: false, // 购买交易弹窗控制
      sellerMthods: myPayment(), //用户可选择的 付款方式
      curTime: 0,
      select_pay_method: 0, //  选择当前交易方式
      select_money_range: 0, // 金额选择范围
      isShow_empty: false,

      count: 0,
      //多币种列表
      coinList: '',
      // typeList: [],

      iconLang: 'arrow-down', //语言的箭头
      showPopup2: false, //选择语言
      lang: [
        { id: 1, text: '简体中文', lang: 'zh' },
        { id: 2, text: 'English', lang: 'en' },
        { id: 3, text: '繁體中文', lang: 'zhTw' },
      ],
      textLang: '',
    }
  },
  //交易类型列表
  props: ['method', 'typeList'],
  created() {
    this.init()
  },
  mounted() {
    // 当前的语言
    if (localStorage.getItem('lang')) {
      this.textLang = JSON.parse(localStorage.getItem('lang')).text
    } else {
      let browserLang = navigator.language
      let langText = browserLang.slice(0, 2)
      switch (langText) {
        case 'zh':
          this.textLang = '简体中文'
          break
        case 'en':
          this.textLang = 'English'
          break
        case 'zhTw':
          this.textLang = '繁體中文'
          break
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('hashchange', this.hashChangeGoback)
  },
  provide() {
    return {
      sellerMthods: this.sellerMthods,
    }
  },
  methods: {
    async init() {
      await this.GetCoinlist()

      this.$emit('set-cur-state')
      //出售订单出错，关闭出售订单窗口
      this.$bus.$on('close-OrderSaleInfo', () => {
        this.isShowTradingPopup = false
      })
      this.$bus.$on('asd', () => {
        console.log('asd')
      })
      loadweb3(userBaseMes)
      this.$bus.$on('update-orderlist', () => {
        this.onLoad()
      })
      setTimeout(() => {
        if (this.listLoading) {
          loadweb3(userBaseMes)
        }
      }, 20000)

      window.addEventListener('hashchange', this.hashChangeGoback)
    },
    async onLoad(params) {
      // 异步更新数据
      this.$toast(this.$t('components.chooseWay.currencyType.loading.text'), {
        position: 'bottom-right',
        timeout: false,
      })
      localStorage.setItem('coinActive', this.active)

      try {
        // console.log(coinList)
        //查询待处理订单
        Eotcdis_Order({
          type: 1,
          t1: -1,
          t2: 2,
          coinID: this.coinList.length == this.active ? 0 : this.coinList[this.active].id,
        }).then((res) => {
          let data = res.data
          let count = 0
          console.log(data)
          for (let i of data) {
            let show = /^[^0][8,9][\d]{8}$/g.test(i.id)
            console.log(show)
            if (show) {
              if (i.dsx == '0' || i.dsx == '2') count++
            } else {
              if (i.dsx != '1') count++
            }
          }
          this.count = count
        })

        getcreditscorebyuid({}).then((res) => {
          localStorage.setItem('myjifen', res)
          this.fenkong()
        })

        const { data } = await EotcBuyOrder({
          pay: this.select_pay_method,
          dtype: 0,
          otype: getItem('netType'),
          amount: this.select_money_range,
          coinID: this.coinList.length == this.active ? 0 : this.coinList[this.active].id,
        })
        this.$emit('asd')

        if (data.length === 0) {
          this.isShow_empty = true
          this.loading = false
          this.finished = true
          // this.listLoading = false
          return false
        }
        this.isShow_empty = false
        const result = await this.filterData(data)
        this.list = result
        /**
         *  后端排序规则： 除去双方黑名单
         *  低价排名靠前
         *   是否在线
         */
        this.listLoading = false
        setItemSession('buydataList', result)
      } catch (err) {
        console.log(err)
        this.list = getItemSession('buydataList')
        console.warn('请求数据过于频繁')
      } finally {
        this.listLoading = false
        this.loading = false
        this.finished = true
        this.$toast.clear()
      }
    },
    //获取币种信息列表
    GetCoinlist() {
      return new Promise((resolve, reject) => {
        CoinList({})
          .then((res) => {
            let data = res.data
            console.log(data)

            for (let i of data) {
              i.name = i.name.trim()
              i.ads = i.ads.trim()
            }
            this.coinList = data
            localStorage.setItem('coinList', JSON.stringify(data))
            resolve()
          })
          .catch((err) => {
            console.log(err)
            if (err.response.status == 429) {
              this.coinList = JSON.parse(localStorage.getItem('coinList'))
              resolve()
            } else reject()
          })
      })
    },
    fenkong() {
      getuserrisklevel().then((result) => {
        console.log(result)
        if (result.items == 2) {
          Dialog.alert({
            title: 'DID抽审',
            message: `您的账号正被抽查DID身份认证的真实性，请耐心配合完成EOTC DAO的E3风控审查。E3风控通过后，账户所有功能恢复，\n请勿担心！`,
            confirmButtonText: '去完成E3风控审核',
          }).then(() => {
            window.location.href = 'https://did.eotc.im/'
          })
        }
      })
    },
    /**
     * 1. 我的黑名单： xid为 黑名单的用户uid
     */

    async filterData(meta_data) {
      let data
      try {
        data = await UserBind({
          type: 0, // 拉黑
        })
      } catch (err) {
        console.warn(err)
        return meta_data
      }

      data = data.data
      if (data.length === 0) {
        return meta_data
      }
      const Blacklisted_user = []
      const uid = localStorage.getItem('uid')
      data.forEach((user) => {
        if (uid === user.xid) {
          Blacklisted_user.push(user.uid)
        } else {
          Blacklisted_user.push(user.xid)
        }
      })
      // 1. 过滤掉我的黑名单 和  我被拉黑的用户订单
      meta_data = meta_data?.filter((order) => {
        if (Blacklisted_user?.includes(order.eid)) {
          // console.log("黑名单用户：", order.sname);
          return false
        }
        return order
      })
      return meta_data
    },
    to_merchantInfo(item) {
      this.$router.push({
        name: 'merchantInfo',
        params: {
          sell_Info: item,
        },
      })
    },
    closeModel() {
      this.$refs['pay-popup'].finishReset()
      this.$refs['pay-popup'].closeDelayTimeModel()
    },
    showModel() {
      //每次打开 交易弹窗，resetCount
      // this.$refs["pay-popup"].finishReset();
      this.$refs['pay-popup'].initTime()
    },
    hashChangeGoback() {
      this.isShowTradingPopup = false
    },
    changePay(pay) {
      this.select_pay_method = pay
      this.onLoad({
        pay,
        amount: this.select_money_range,
      })
    },
    changeSize(amount) {
      this.select_money_range = amount
      this.onLoad({
        amount,
        pay: this.select_pay_method,
      })
    },
    SubmitTrading(index) {
      console.log(this.typeList[this.active])
      // 购买订单
      let time = Date.now()
      if (time - this.curTime < 1000) {
        return false
      }
      this.curTime = time
      const userInfo = payInfoUser()
      this.activeIndex = index //设置 商品激活选项
      console.log(userInfo)
      // 付款方式是否满足
      if (this.payverification(userInfo) && this.isSatisfyPaymentMethod()) {
        this.isShowTradingPopup = true // 前提条件完成，弹出购买窗口
      }
    },
    payverification({ iskyc, xdnum, userdsx, myjifen }) {
      let payVeriFicationCount = 0
      // iskyc 实名认证审核通过 为2
      if (iskyc === '2') {
        payVeriFicationCount += 1
      } else {
        this.$toast.error(
          <div>
            <p style="font-size:13px;margin:5px">
              ${this.$t('components.chooseWay.currencyType.toast.error[0]')}
            </p>
            <p style="font-size:13px;margin:5px">
              ${this.$t('components.chooseWay.currencyType.toast.error[1]')}
            </p>
          </div>
        )
        return false
      }
      //xdnum 下单数量 0
      if (xdnum === '0') {
        payVeriFicationCount += 1
      } else {
        this.$toast.error(
          <div>
            <p style="font-size:13px;margin:5px">
              ${this.$t('components.chooseWay.currencyType.toast.error[2]')}
            </p>
            <p style="font-size:15px;margin:5px">
              ${this.$t('components.chooseWay.currencyType.toast.error[3]')}
            </p>
          </div>
        )
        return false
      }
      // 取消订单次数 每日8次  凌晨清零
      if (userdsx >= '0') {
        payVeriFicationCount += 1
      } else {
        this.$toast.warning(this.$t('components.chooseWay.currencyType.toast.error[4]'))
        return false
      }
      // myjifen 用户积分必须大于10
      if (Number(myjifen) >= 10) {
        payVeriFicationCount += 1
      } else {
        this.$toast.error(
          this.$t('components.chooseWay.currencyType.toast.error[5]') +
            '10' +
            this.$t('components.chooseWay.currencyType.toast.error[6]')
        )
        return false
      }
      return payVeriFicationCount === 4
    },
    isSatisfyPaymentMethod() {
      // payMent 商家收款方式  sellerMthods 我的收付款方式
      const payMent = this.getCurPayList(this.list[this.activeIndex])
      const viodFlg = Object.keys(this.sellerMthods).some(
        (payMethod) => payMent.includes(payMethod) && this.sellerMthods[payMethod]
      )
      if (viodFlg) {
        return true
      } else {
        this.$toast.clear()
        this.$toast.warning(this.$t('components.chooseWay.currencyType.toast.error[7]'))
        return false
      }
    },
    getCurPayList(item) {
      const Icons = []
      function hasCurrentPay(value) {
        return Boolean(value.split('&')[1])
      }
      for (const key of Object.keys(item)) {
        switch (key) {
          case 'bank':
            if (hasCurrentPay(item[key])) {
              Icons.push('yhk', 'mybank')
            }
            break
          case 'aipay':
            if (hasCurrentPay(item[key])) {
              Icons.push('zfb', 'myalipay')
            }
            break
          case 'wechat':
            if (hasCurrentPay(item[key])) {
              Icons.push('wx', 'mybmywechatnk')
            }
            break
        }
      }
      return Icons
    },
    // 选择语言更换图标
    handleTabLang() {
      this.showPopup2 = !this.showPopup2
      if (this.showPopup2) {
        this.iconLang = 'arrow-up'
      } else {
        this.iconLang = 'arrow-down'
      }
    },
    tabLang(item) {
      localStorage.setItem('lang', JSON.stringify(item))
      this.textLang = item.text
      this.$router.go(0)
    },
    currency_Change(tag_Name, title) {
      console.log(this.active)
      this.$toast.clear()
      // localStorage.setItem('coinActive', this.active)
      this.onLoad()
      // if (title !== 'USDT') {
      //   this.$toast.error(`目前暂时不支持 ${title}`)
      //   this.$nextTick(() => {
      //     // this.active = 0
      //   })
      //   return false
      // }
    },
    // 用户是否在线
    isActive_user(time) {
      const diff_30timeout = this.diff_30timeout(
        this.trsfTime_30timeout(time, 30),
        this.transformTime_Zh(Date.now())
      )

      return diff_30timeout >= 0 ? true : false
    },
  },
  filters: {
    ThousandSeparator(value) {
      if (!value) return ''
      return (
        value &&
        value.toString().replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
      )
    },
  },
}
</script>

<style lang="less" scoped>
@color-down: #e35e5e;
.currency {
  width: 100vw;
  position: relative;
  z-index: 0;
  top: 100px;
  /deep/ .van-tab--active {
    color: #000;
  }

  .comfig-button {
    background-color: #2483ff;
    color: #fff;
    width: 140px;
    border-radius: 10px;
  }
  .icon-jiantou {
    position: absolute;
    right: 20px;
    top: 28px;
  }
  .store {
    width: auto !important;
  }
  .left {
    display: flex;
    width: 6rem;
    // color: #969799;
    align-items: center;

    font-size: 26px;
    padding: 10px 0 0 0;
    .text {
      color: #000;
      font-weight: 700;
    }

    .aut-img {
      width: 64px;
      margin-right: 10px;
      display: block;
      height: 64px;
      line-height: 64px;
      position: relative;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background-color: #2483ff;
      .online-icon {
        position: absolute;
        bottom: 0px;
        right: 10px;
        flex-direction: column;
        justify-content: center;
        display: flex;
        align-items: center;
      }
      .online-status {
        width: 10px;
        height: 10px;
        background: #00b464;
        border: 1px solid #fff;
        border-radius: 50%;
      }
    }
  }
  .right {
    line-height: 64px;
    font-size: 24px;
    vertical-align: middle;
    .txt {
      color: @color-down;
    }
  }
}

.selsect {
  position: sticky;
  top: 190px;
  z-index: 5;
}
.ordernum {
  background: #e5f8f1;
  padding: 30px;
  margin: 20px 30px;
  border-radius: 20px;
  font-size: 32px;
  color: #00b87a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /deep/.van-button--small {
    padding: 0 40px;
  }
}
/deep/ .van-tabs__wrap {
  position: sticky !important;
  top: 20px;
  z-index: 3;
  width: 100vw;
  overflow-x: auto;
  // background-color: #eee;
}
// /deep/ .van-tabs__content {
// padding-top: 180px !important;
// }

.van-cell::after {
  border-bottom: none;
}
.tail {
  position: fixed;
  bottom: 0;
  padding: 0 40px;
  width: 92%;
  height: 96px;
  font-size: 24px;
  background: #111a2d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
  div:first-of-type {
    display: flex;
    align-items: center;
    color: #dcdcdc;
    img {
      margin-right: 14px;
      width: 36px;
      height: 36px;
    }
  }
  div:last-of-type {
    color: #fff;
    span {
      margin-right: 10px;
    }
  }
}
// 语言
.menu {
  margin-top: 88px;
  margin-bottom: 200px;
  .menu-every {
    margin: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    font-size: 32px;
    color: #b4b7c2;
    border-bottom: 1px solid #2b374f;
    img {
      margin-left: 50px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
