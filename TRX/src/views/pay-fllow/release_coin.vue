<template>
  <div class="order-pay-container">
    <div class="header-div">
      <van-icon :style="{ flex: '1' }" name="arrow-left" @click="$router.go(-1)" />
      <span class="span">{{ $t("views.fllow.coin.release") }} {{this.cacheData.item.coinType}}</span>
      <span class="hd-txt">
        <van-icon @click="gotoRelation">
          <van-icon name="orders-o" :badge="badge" />
        </van-icon>
      </span>
    </div>

    <header class="header">
      <h4 class="title">{{ $t("views.fllow.coin.title") }}</h4>
      <div class="pay-timeDown">
        <div class="pay-text">{{ $t("views.fllow.coin.pay_text") }}</div>
      </div>
    </header>

    <!-- 边框线 -->
    <van-divider
      :style="{
        borderColor: 'rgb(177,177,177)',
        margin: '15px 0 18px 0',
        padding: '0 16px',
      }"
    />

    <!-- 订单主要信息 -->
    <main class="main">
      <div class="top-text">
        <img
          class="icon-img"
          :src="require(`@/assets/currency-icons/${this.cacheData.item.coinType.toLowerCase()}.png`)"
          alt
        />
        <span>{{ $t("views.fllow.coin.sell") }} {{this.cacheData.item.coinType}}</span>
      </div>
      <div class="top-main">
        <ul>
          <li @click="copyContent(myaddress, $t('views.fllow.coin.copy'))">
            <span>{{ $t("views.fllow.coin.merchant") }}</span>
            <span>
              {{ briefMyAddress(myaddress) }}
              <i
                class="iconfont icon-copy"
                :style="{ color: '#999' }"
              ></i>
            </span>
          </li>
          <li
            @click="
              copyContent(cacheData.item.smes.trim(), '商家钱包地址 已复制')
            "
          >
            <span>{{ $t("views.fllow.coin.wallet") }}</span>
            <span>
              {{ briefMyAddress(cacheData.item.smes.trim()) }}
              <i
                class="iconfont icon-copy"
                :style="{ color: '#999' }"
              ></i>
            </span>
          </li>
          <li>
            <span>{{ $t("views.fllow.coin.price") }}</span>
            <span>￥{{ cacheData.item.cny }}</span>
          </li>
          <li>
            <span>{{ $t("views.fllow.coin.count") }}</span>
            <span>{{ cacheData.item.num }} {{cacheData.item.coinType}}</span>
          </li>

          <li>
            <span>{{ $t("views.fllow.coin.total") }}</span>
            <span
              class="importan-tTsxt"
              @click="
                copyContent(
                  ThousandSeparator(cacheData.item.amount1),
                  $t('views.fllow.coin.total_copy')
                )
              "
            >
              ￥{{ ThousandSeparator(cacheData.item.amount1) }}
              <i
                class="iconfont icon-copy"
                :style="{ color: '#999' }"
              ></i>
            </span>
          </li>

          <li class="payInfo">
            <span>{{ $t("views.fllow.coin.proceeds") }}</span>
            <span :style="{ display: 'flex', position: 'relative' }" v-if="cuePayType[0] === 'yhk'">
              <i class="iconfont icon-yhk pay-icon1 pay-iconyhk"></i>
              &nbsp;&nbsp;{{ cuePayType[2] }}
            </span>
            <span :style="{ display: 'flex', position: 'relative' }" v-if="cuePayType[0] === 'wx'">
              <i class="iconfont icon-wx pay-icon2 pay-iconwx"></i>
              &nbsp;&nbsp;{{ $t("views.fllow.coin.wechat") }}
            </span>
            <span :style="{ display: 'flex', position: 'relative' }" v-if="cuePayType[0] === 'zfb'">
              <i class="iconfont icon-zfb pay-icon2 pay-iconzfb"></i>
              &nbsp;&nbsp;{{ $t("views.fllow.coin.Alipay") }}
            </span>
            <span :style="{ display: 'flex', position: 'relative' }" v-if="cuePayType[0] === 'xj'">
              <img class="xj_moeny" src="@/assets/currency-icons/moeny-c.png" alt="xj" />
              &nbsp;&nbsp;{{ $t("views.fllow.coin.transaction") }}
            </span>
          </li>

          <li v-if="cuePayType[0] !== 'xj'">
            <span>{{ $t("views.fllow.coin.shroff_account") }}</span>
            <span v-if="cuePayType[0] === 'yhk'">
              {{ cuePayType[2] }}&nbsp;
              {{ cuePayType[1] }}
            </span>
            <span v-if="cuePayType[0] === 'wx'">{{ cuePayType[1] }}</span>
            <span v-if="cuePayType[0] === 'zfb'">{{ cuePayType[1] }}</span>
          </li>
          <li class="van-divider"></li>
          <li>
            <span>{{ $t("views.fllow.coin.name") }}</span>
            <span>
              {{ cacheData.item.mes }}
              <img
                class="info-rz"
                src="@/assets/currency-icons/rz.png"
                alt="fig"
              />
            </span>
          </li>
          <li class="payInfo">
            <span>{{ $t("views.fllow.coin.user") }}</span>
            <span :style="{ display: 'flex', position: 'relative' }" v-if="cuePayType[0] === 'yhk'">
              <i class="iconfont icon-yhk pay-icon1 pay-iconyhk"></i>
              &nbsp;&nbsp;{{ cueCollectmoney[2] }}
            </span>
            <span :style="{ display: 'flex', position: 'relative' }" v-if="cuePayType[0] === 'wx'">
              <i class="iconfont icon-wx pay-icon2 pay-iconwx"></i>
              &nbsp;&nbsp;{{ $t("views.fllow.coin.wechat") }}
            </span>
            <span :style="{ display: 'flex', position: 'relative' }" v-if="cuePayType[0] === 'zfb'">
              <i class="iconfont icon-zfb pay-icon2 pay-iconzfb"></i>
              &nbsp;&nbsp;{{ $t("views.fllow.coin.Alipay") }}
            </span>
            <span :style="{ display: 'flex', position: 'relative' }" v-if="cuePayType[0] === 'xj'">
              <img class="xj_moeny" src="@/assets/currency-icons/moeny-c.png" alt="xj" />
              &nbsp;&nbsp;{{ $t("views.fllow.coin.transaction") }}
            </span>
          </li>

          <li v-if="cuePayType[0] !== 'xj'">
            <span>{{ $t("views.fllow.coin.payer") }}</span>
            <span v-if="cuePayType[0] === 'yhk'">
              {{ cueCollectmoney[2] }}&nbsp;
              {{ cueCollectmoney[1] }}
            </span>
            <span v-if="cuePayType[0] === 'wx'">{{ cueCollectmoney[1] }}</span>
            <span v-if="cuePayType[0] === 'zfb'">{{ cueCollectmoney[1] }}</span>
          </li>
          <li>
            <span>{{ $t("views.fllow.coin.number") }}</span>
            <span @click="copyContent(cacheData.item.id, '订单编号 已复制')">
              {{ cacheData.item.id }}
              （{{ cacheData.item.odid }}）
              <i
                class="iconfont icon-copy"
                :style="{ color: '#999' }"
              ></i>
            </span>
          </li>
          <li>
            <span>{{ $t("views.fllow.coin.placeTime") }}</span>
            <span>{{ cacheData.item.eotc | transformTime_Zh }}</span>
          </li>
        </ul>
      </div>
    </main>

    <article class="Riskwarning">{{ $t("views.fllow.coin.Riskwarning") }}</article>

    <!-- 底部 该收款按钮，默认禁用状态，买家点击已付款后，会变色，可以点击确认，
    买家没点付款前灰色，禁用状态不能点击-->
    <footer class="footer">
      <div class="cancel">
        <van-button @click="verify" block>{{ $t("views.fllow.coin.verify") }}</van-button>
      </div>
    </footer>

    <van-dialog
      v-model="releaseLd"
      show-cancel-button
      :showCancelButton="false"
      :showConfirmButton="false"
    >
      <van-loading size="36px" text-color="#000" vertical>{{ $t("views.fllow.coin.centre") }}</van-loading>
      <div class="ld-text">{{ $t("views.fllow.coin.ld_text") }}</div>
    </van-dialog>

    <van-dialog v-model="warning_Tips">
      <template #title>
        <van-icon name="warning-o" color="rgb(251,198,44)" size="1.5rem" />
      </template>

      <template>
        <div class="warning_Tips-text">
          <p>{{ $t("views.fllow.coin.warning_tips") }}</p>
        </div>
      </template>
    </van-dialog>
  </div>
</template>

<script>
import loadingToast from '@/components/loading-toast'

import { Reconstruction_getTrxBalance, outOrder } from '@/utils/web3'

import { UpdateOrderType, VerifyReleaseCoins } from '@/api/trxRequest'

import { paytype } from '@/utils/utils'

import { contractAddress } from '@/utils/abi'
import { getItem } from '@/utils/storage'

export default {
  name: 'repease-currency',
  //item --> 当前订单  num --> 出售udst的数量
  // totalMoney --> 该订单可以获得多少 money
  props: ['item'],
  data() {
    return {
      cuePayType: '', // 当前 收款方式
      cueCollectmoney: '',
      releaseLd: false, // 放币 加载
      warning_Tips: false, //交易风险提示
      contractAddress: contractAddress,
      //数据缓存
      cacheData: {},
      netType: localStorage.getItem('netType') || 'trx',
      myaddress: localStorage.getItem('myaddress') || contractAddress,
      badge: getItem('bsnum'),
    }
  },
  created() {
    this.handlecacheData()
  },
  methods: {
    gotoRelation() {
      this.$router.push({
        name: 'seller-water-bill',
        params: {
          odid: this.cacheData.item.id,
          item: this.cacheData.item,
        },
        query: {
          role: 'seller',
        },
      })
    },
    handlecacheData() {
      if (this.item) {
        this.cacheData.item = this.item
        //二次备份 给路由备份
        this.$route.meta.cacheData = this.cacheData
      } else {
        this.cacheData = this.$route.meta.cacheData
      }
      this.get_cuePayType()
      console.log(this.cacheData)
    },
    get_cuePayType() {
      const payMethod = this.cacheData.item.bank
      const CollectMethod = this.cacheData.item.sname
      // console.log(payMethod);
      // console.log(CollectMethod);
      const access_payMethod = payMethod ? payMethod.split('&') : ['未知', '未知', '未知']
      // this.$toast.info(access_payMethod[0]);
      const access_CollectMethod = CollectMethod
        ? CollectMethod.split('&')
        : [
          this.$t("views.fllow.coin.unknown"),
          this.$t("views.fllow.coin.unknown"),
          this.$t("views.fllow.coin.unknown"),
        ]
      // this.$toast.info(access_CollectMethod[0]);

      if (access_payMethod[2]?.includes('微信')) {
        this.cuePayType = ['wx', access_payMethod[1]?.trim()]
        this.cueCollectmoney = ['wx', access_CollectMethod[1]?.trim()]
      } else if (access_payMethod[2]?.includes('支付宝')) {
        this.cuePayType = ['zfb', access_payMethod[1]?.trim()]
        this.cueCollectmoney = ['zfb', access_CollectMethod[1]?.trim()]
      } else if (access_payMethod[2]?.includes('现金')) {
        this.cuePayType = ['xj', this.$t("views.fllow.coin.transaction")]
        this.cueCollectmoney = ['xj', this.$t("views.fllow.coin.transaction")]
      } else {
        this.cuePayType = ['yhk', access_payMethod[1]?.trim(), access_payMethod[2]?.trim()]
        this.cueCollectmoney = [
          'yhk',
          access_CollectMethod[1]?.trim(),
          access_CollectMethod[2]?.trim(),
        ]
      }
    },
    paytype(value) {
      return paytype(value)
    },
    //放币前校验
    verify() {
      // VerifyReleaseCoins({ oid: this.cacheData.item.id }).then((res) => {
      //   console.log(this.cacheData)
      //   if (res.data.State == '1') {
      this.releaseCurrency()
      // } else {
      //   this.$toast.warning('放币成功')
      //   this.$router.replace({
      //     name: 'sell-success',
      //     params: {
      //       totalMoney: this.cacheData.item.amount1,
      //       num: this.cacheData.item.num,
      //     },
      //     query: {
      //       role: 'merchant_seller',
      //     },
      //   })
      // }
      // })
    },

    // 已确认收款，进行放币
    async releaseCurrency() {
      try {
        this.releaseLd = true // 确认信息 放币中....
        this.$toast.warning(
          {
            component: loadingToast,
            props: {
              title: `${this.$t("views.fllow.coin.toast[1]")}：<br/><span style="color:red">￥ ${this.cacheData.item.amount1}</span> CNY`,
            },
          },
          {
            icon: false,
            timeout: false,
          }
        )
        let $order = this.cacheData.item

        if ($order.coinId != window.itself) {
          await Reconstruction_getTrxBalance()
        } else {
          await Reconstruction_getTrxBalance($order.num)
        }

        //oid --当前子订单id  num 数量
        await outOrder($order.id, $order.num, $order.coinId)
        const { data } = await UpdateOrderType({
          did: String($order.id),
          type: 10,
          mail: $order.aipay,
        })
        this.releaseLd = false
        localStorage.setItem('userIconType', $order.coinType)
        this.$router.replace({
          name: 'sell-success',
          params: {
            totalMoney: this.cacheData.item.amount1,
            num: this.cacheData.item.num,
          },
          query: {
            role: 'merchant_seller',
          },
        })
        this.$toast.clear()
      } catch (err) {
        this.$toast.clear()
        console.warn(err)
        this.$toast.error(err, {
          timeout: false,
        })
      } finally {
        this.releaseLd = false
      }
      this.releaseLd = false

      //测试专用 1000ms 后 关闭 loading
    },
    // 改变我已确认信息 勾选
    changeinfoIsOk() {
      this.infoIsOk = !this.infoIsOk
    },
    // 仲裁按钮是否禁用
    finishReset() {
      this.isDisabled = false
    },
    // 获取订单 商家的姓名
    get_other_name() {
      const item = this.cacheData.item
      if (item.aipay.includes('现金')) {
        return this.$t("views.fllow.coin.transaction")
      } else if (item.aipay.split('&')[0]) {
        return item.aipay.split('&')[0]
      } else if (item.bank.split('&')[0]) {
        return item.bank.split('&')[0]
      } else {
        return item.wechat.split('&')[0]
      }
    },
  },
}
</script>

<style lang="less" scoped>
.van-dialog {
  padding-top: 0 !important;
}

.payInfo {
  /deep/ .icon9 {
    position: static !important;
  }
}

.van-dialog__header {
  padding-top: 0;
}
.warning_Tips-text {
  padding: 10px 25px;
  font-size: 0.35rem;
}
.header-div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 25px;
  font-size: 0.45rem;
  margin-bottom: 15px;
  .span {
    flex: 1;
    font-weight: 700;
  }
  .hd-txt {
    font-weight: 700;
    flex: 1;
    font-size: 40px;
    text-align: right;
  }
}

.van-loading {
  padding: 80px 25px 0;
  height: 150px;
  font-weight: 700;
}
.van-form {
  margin-bottom: 25px;
}

.ld-text {
  text-align: center;
  font-size: 26px;
  padding-bottom: 55px;
}

.PaymentInfoAffirm {
  .PaymentInfoAffirm-info {
    margin: 0;
    padding: 20px 20px 0 20px;
  }
  .info-ok {
    font-size: 30px;
    color: #999;
    /deep/ .van-icon {
      border-radius: 10px;
    }
  }
  /deep/ .van-field__label {
    position: absolute;
    width: 7rem;
    left: 90px;
  }
  .notice-bar {
    margin: 0 20px;
  }
  ul {
    margin: 20px;
    background-color: rgb(247, 247, 247);
    border-radius: 10px;
    padding: 25px;
  }
  li {
    font-size: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      line-height: 40px;
      padding: 30px 0;
    }
    div {
      color: #999;
    }
    span:last-child {
      text-indent: 30px;
      font-weight: 700;
      color: #000;
    }
  }
  .footer {
    margin: 0 25px;
    font-weight: 700;
    div {
      display: flex;
      justify-content: space-evenly;
      button {
        width: 47%;
        border-radius: 15px;
        span {
          padding-right: 40px;
        }
      }
      button:last-child {
        background-color: rgb(235, 235, 235);
        color: #000;
      }
    }
  }
}

.order-pay-container {
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  .header {
    margin: 0px 25px 25px 25px;
    font-size: 40px;
    .title {
      margin: 0;
    }
    .pay-timeDown {
      display: flex;
      height: 40;
      font-weight: 700;
      align-items: center;
      margin: 25px 0 0 0;
    }
    .pay-text {
      color: rgba(0, 0, 0, 0.705);
      font-size: 26px;
      line-height: 42px;
      font-weight: 700;
    }
    .pay-time {
      font-size: 26px;
      font-weight: bolder;
      color: #1989fa;
      line-height: 42px;
    }
  }
  .info-rz {
    width: 40px;
    height: 40px;
    position: relative;
    top: 8px;
  }
  .main {
    margin: 25px;
    font-size: 26px;
    .top-text {
      display: flex;
      align-items: center;
      font-weight: 700;
      .icon-img {
        width: 40px;
        height: 40px;
        margin-right: 25px;
      }
    }
    /deep/ .van-divider {
      margin: 0;
    }
    li {
      padding: 18px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span:first-child {
        color: var(--main-test-color);
      }

      span:last-child {
        font-weight: 700;
      }
    }
  }
  .importan-tTsxt {
    color: var(--main--color);
    font-weight: 700;
    font-size: 42px;
  }
  .Riskwarning {
    color: var(--main-test-color);
    font-size: 24px;
    padding: 25px;
    margin: 25px;
    border-radius: 15px;
    line-height: 35px;
    background-color: rgb(235, 235, 235);
  }

  .footer {
    display: flex;
    flex: 1;
    align-items: flex-end;
    justify-content: space-evenly;
    padding: 0 40px 25px;
    .appeal {
      color: var(--main-test-color);
      .van-button__text {
        display: flex;
        align-items: center;
      }
    }
    button {
      font-size: 26px;
      display: block;
      font-weight: 700;
      border-radius: 25px;
    }
    .van-button {
      height: 1.2rem;
    }
    .cancel {
      display: flex;
      flex: 1;
      button {
        padding: 0 40px;
        color: #fff;
        background-color: blue;
      }
    }
  }
}
.payFullinfo {
  text-indent: 25px;
  padding: 15px 0 !important;
}
</style>
>
