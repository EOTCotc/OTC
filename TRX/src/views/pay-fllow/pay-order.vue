<template>
  <div class="order-pay-container">
    <header class="header">
      <h4 class="title">{{ $t("views.fllow.order.title") }}</h4>
      <div class="pay-timeDown">
        <div class="pay-text">{{ $t("views.fllow.order.residue") }}</div>
        <van-count-down
          class="pay-time"
          ref="countDown"
          :time="time"
          format="mm:sss "
          @finish="autoCancel_order"
        />
      </div>
    </header>
    <!-- 边框线 -->
    <div class="van-hairline--bottom"></div>
    <!-- 卖家信息 -->

    <section class="seller-info">
      <div class="seller-info-top">
        <span class="pay-info1">{{ $t("views.fllow.order.hint") }}</span>
        <div class="info2">
          <span>
            {{ cacheData.payItem.sname }}
            <img
              class="info-rz"
              src="@/assets/currency-icons/rz.png"
              alt
            />
          </span>
          <!-- pending 1 订单 -->
          <van-icon name="orders-o" badge="1" @click="gotoWaterBill" />
        </div>
      </div>
      <article class="full-info">
        <div class="info-box" v-html="cacheData.payItem.mes"></div>
      </article>
    </section>
    <!-- 订单主要信息 -->

    <main class="main">
      <div class="top-text">
        <img
          class="icon-img"
          :src="require(`@/assets/currency-icons/${type.toLowerCase()}.png`)"
          alt
        />
        <span>{{ $t("views.fllow.order.buy") }} {{type}}</span>
      </div>
      <div class="top-main">
        <ul>
          <li @click="showPayInfo">
            <span>{{ $t("views.fllow.order.backbone") }}</span>
            <span>
              {{ netType }}
              <van-icon name="arrow" />
            </span>
          </li>
          <li v-show="isShowPayInfo">
            <span>{{ $t("views.fllow.order.wallet") }}</span>
            <span @click="copyContent(myaddress, $t('views.fllow.order.copy'))">
              {{ briefMyAddress(myaddress) }}
              <i
                class="iconfont icon-copy"
                :style="{ color: '#999' }"
              ></i>
            </span>
          </li>
          <li v-show="isShowPayInfo">
            <span>{{ $t("views.fllow.order.merchant") }}</span>
            <span
              @click="
                copyContent(cacheData.MerchanInfo.bank, $t('views.fllow.order.copy_merchant'))
              "
            >
              {{ briefMyAddress(cacheData.MerchanInfo.bank) }}
              <i
                class="iconfont icon-copy"
                :style="{ color: '#999' }"
              ></i>
            </span>
          </li>
          <li v-show="isShowPayInfo">
            <span>{{ $t("views.fllow.order.contract") }}</span>
            <span @click="copyContent(contractAddress, $t('views.fllow.order.copy_contract'))">
              {{ briefMyAddress(contractAddress) }}
              <i
                class="iconfont icon-copy"
                :style="{ color: '#999' }"
              ></i>
            </span>
          </li>
          <li v-show="isShowPayInfo">
            <span :style="{ color: '#000' }">{{ $t("views.fllow.order.look_order") }}</span>
            <span @click="show_imgPreview" :style="{ color: 'red' }">{{ $t("views.fllow.order.step") }}</span>
          </li>
          <li>
            <span>{{ $t("views.fllow.order.price") }}</span>
            <span>￥{{ cacheData.payItem.cny }}</span>
          </li>
          <li>
            <span>{{ $t("views.fllow.order.count") }}</span>
            <span>{{ cacheData.ordernum }} {{type}}</span>
          </li>
          <li
            @click.stop="
              copyContent(
                ThousandSeparator(cacheData.ordermoney),
                $t('views.fllow.order.total_copy')
              )
            "
          >
            <span>{{ $t("views.fllow.order.total") }}</span>
            <span class="importan-tTsxt">
              ￥{{ ThousandSeparator(cacheData.ordermoney) }}
              <i
                class="iconfont icon-copy"
                :style="{ color: '#999' }"
              ></i>
            </span>
          </li>
          <li>
            <span>{{ $t("views.fllow.order.way") }}</span>
            <span :style="{ display: 'flex', position: 'relative' }">
              <payIcons
                :items="cacheData.payItem"
                :style="{ marginRight: '10px', position: 'static' }"
                :cuePayType="cacheData.ordercuePayType"
              />
              {{ paytype(cacheData.ordercuePayType) }}
            </span>
          </li>
          <li>
            <span>{{ $t("views.fllow.order.account") }}</span>
            <span v-if="cacheData.ordercuePayType === 'yhk'">
              {{ cacheData.sellerMthods.mybank.split("&")[1] }}
              {{ cacheData.sellerMthods.mybank.split("&")[0] }}
            </span>
            <span v-if="cacheData.ordercuePayType === 'zfb'">{{ cacheData.sellerMthods.myalipay }}</span>
            <span
              v-if="cacheData.ordercuePayType === 'wx'"
            >{{ cacheData.sellerMthods.mybmywechatnk }}</span>
            <span v-if="cacheData.ordercuePayType === 'xj'">{{ $t("views.fllow.order.transaction") }}</span>
          </li>
          <li class="van-divider"></li>
          <li>
            <span>{{ $t("views.fllow.order.number") }}</span>
            <span @click="copyContent(cacheData.payItem.id, $t('views.fllow.order.number_copy'))">
              {{ cacheData.payItem.id }}
              (
              {{ cacheData.MerchanInfo.odid }} )
              <i
                class="iconfont icon-copy"
                :style="{ color: '#999' }"
                @click.stop="
                  copyContent(cacheData.MerchanInfo.odid, $t('views.fllow.order.create_copy'))
                "
              ></i>
            </span>
          </li>
          <li>
            <span>{{ $t("views.fllow.order.placeTime") }}</span>
            <span>{{ cacheData.nowTime | transformTime_Zh }}</span>
          </li>
        </ul>
      </div>
    </main>

    <!-- 底部取消订单 or 下一波 button -->

    <footer class="footer">
      <div class="cancel">
        <van-button type="default" @click="cancel_order">{{ $t("views.fllow.order.cencel") }}</van-button>
      </div>
      <div class="next">
        <van-button type="info" @click="payNextStep">{{ $t("views.fllow.order.next") }}</van-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { toastComponent } from '@/utils/element-config'
import payIcons from '@/components/ChooseWay/pay-Icons.vue'
import { contractAddress } from '@/utils/abi'
import { ImagePreview } from 'vant'
import loadingToast from '@/components/loading-toast'
import { runSign, Buy_user, Buy_cancel, Buy_verify } from '@/utils/web3'
import { subbuysellorder } from '@/api/trxRequest'

import { paytype } from '@/utils/utils'

import { OrderAudit } from '@/api/payverification'

export default {
  name: 'order-pay-fllow',
  props: [
    'item',
    'cuePayType',
    'num',
    'money',
    'MerchanInfo',
    'sellerMthods',
    'nowTime',
    'servicefee',
  ],
  components: {
    payIcons,
  },
  data() {
    return {
      isShowPayInfo: false,
      time: '',
      contractAddress: contractAddress,
      myaddress: localStorage.getItem('myaddress') || '暂时&未有地址',
      netType: localStorage.getItem('netType') || 'trx',
      cacheData: {},
      imgs: [
        require('../../assets/img-preview/sele-1.png'),
        require('../../assets/img-preview/sele-2.png'),
      ], // 图片预览 列表

      type: localStorage.getItem('userIconType'),
      gas: '',
    }
  },
  activated() {
    this.initcacheData()
  },
  mounted() {
    let coinList = JSON.parse(localStorage.getItem('coinList'))
    for (let i of coinList) {
      if (i.id == localStorage.getItem('userIconId')) this.gas = i.gas
    }
  },
  created() {
    this.initcacheData()
  },
  methods: {
    initcacheData() {
      console.log(this.item)
      if (this.item) {
        this.cacheData.payItem = this.item
        this.cacheData.ordercuePayType = this.cuePayType
        this.cacheData.ordernum = this.num
        this.cacheData.ordermoney = this.money
        this.cacheData.MerchanInfo = this.MerchanInfo
        this.cacheData.sellerMthods = this.sellerMthods
        this.cacheData.servicefee = this.servicefee
        this.cacheData.nowTime = this.nowTime || Date.now()
        //数据缓存
        this.$route.meta.cacheData = this.cacheData
      } else {
        //console.log("页面回退数据缓存", this.$route.meta.cacheData);
        this.cacheData = this.$route.meta.cacheData
        // 页面进行了缓存，切换数据需要 计算每一个订单
      }
      this.time = this.diff_30timeout(
        this.trsfTime_30timeout(this.cacheData.nowTime, 30),
        this.transformTime_Zh(Date.now())
      )
      const rcoin = this.cacheData.payItem.rcoin
      if (!rcoin || rcoin === '-1') {
        this.$toast.info(this.$t("views.fllow.order.toast[0]"), {
          timeout: false,
        })
      } else {
        this.$toast.success(
          <div>
            <p style="font-size:14px;margin:5px">{this.$t("views.fllow.order.toast[1]")}</p>
            <p style="font-size:15px;margin:5px">{this.$t("views.fllow.order.toast[2]")}!</p>
          </div>
        )
      }
    },
    show_imgPreview() {
      ImagePreview({
        images: this.imgs,
        onClose() {
          this.$toast.clear()
        },
        closeable: true,
      })
      this.$copyText('https://tronscan.io/#/contract/TBpcQXdZEX8vYqf2M2CQrHsGt9KZpAEVqu/code').then(
        (e) => {
          this.$toast.success(
            {
              component: toastComponent,
              props: {
                title: this.$t("views.fllow.order.toast[3]"),
                content: this.$t("views.fllow.order.toast[4]"),
              },
            },
            {
              timeout: false,
            }
          )
        },
        (e) => {
          this.$toast.error(this.$t("views.fllow.order.toast[5]"));
        }
      )
    },
    showPayInfo() {
      this.isShowPayInfo = !this.isShowPayInfo
    },
    cancel_order() {
      this.$dialog
        .confirm({
          title: this.$t("views.fllow.order.dialog[0]"),
          message:
            "<span class='activeInfo'>" +
            this.$t("views.fllow.order.dialog[1]") +
            "</span> <br />" +
            this.$t("views.fllow.order.dialog[2]"),
        })
        .then(() => {
          if (!this.random()) {
            return false
          }
          this.countDown_finish()
        })
        .catch(() => {
          // on cancel 取消订单 取消选择
        })
    },
    async countDown_finish() {
      let oid //子订单id
      // 确认取消订单
      try {
        this.cancelOrderModel_show = true
        this.$toast.warning(
          {
            component: loadingToast,
            props: {
              title: this.$t("views.fllow.order.toast[6]"),
            },
          },
          {
            icon: false,
            timeout: false,
          }
        )
        oid = this.cacheData.MerchanInfo?.odid ?? this.cacheData.payItem.oid //子订单id
        await runSign()
        if (this.cacheData.payItem.rcoin == 1)
          await Buy_cancel(oid, localStorage.getItem('userIconId'))
        const { data } = await subbuysellorder({
          oid,
          selectpayk: '',
          type: 0,
        })
        this.$toast.clear()
        if (data.State === '1') {
          this.$toast.error(oid + '  ' + this.$t("views.fllow.order.toast[7]"))
          this.$router.replace({
            name: 'CurrencyTrading',
          })
        } else {
          this.$toast.warning(oid + '  ' + this.$t("views.fllow.order.toast[8]"))
          this.$router.replace({
            name: 'CurrencyTrading',
          })
          localStorage.setItem('xdnum', '0')
        }
      } catch (err) {
        console.warn(err)
        this.$toast.clear()
        this.$toast.error(err, {
          timeout: false,
        })
      }
      this.cancelOrderModel_show = false
    },
    random() {
      if (Math.random() * 10 < 2) {
        return false
      }
      return true
    },
    async autoCancel_order() {
      let oid //子订单id
      // 确认取消订单
      try {
        this.cancelOrderModel_show = true
        this.$toast.warning(
          {
            component: loadingToast,
            props: {
              title: this.$t("views.fllow.order.toast[6]"),
            },
          },
          {
            icon: false,
            timeout: false,
          }
        )
        oid = this.cacheData.MerchanInfo?.odid ?? this.cacheData.payItem.oid //子订单id
        // Buy_cancel(oid,localStorage.getItem('userIconId'))
        const { data } = await subbuysellorder({
          oid,
          selectpayk: '',
          type: 0,
        })
        this.$toast.clear()
        //console.log(data);
        if (data.State === '1') {
          this.$toast.error(oid + '  ' + this.$t("views.fllow.order.toast[7]"))
          this.$router.replace({
            name: 'CurrencyTrading',
          })
        } else {
          this.$toast.warning(oid + '  ' + this.$t("views.fllow.order.toast[8]"))
          this.$router.replace({
            name: 'CurrencyTrading',
          })
          localStorage.setItem('xdnum', '0')
        }
      } catch (err) {
        console.warn(err)
        this.$toast.clear()
      }
    },
    gotoWaterBill() {
      const item = {
        ...this.cacheData.payItem,
        dsx: '0',
      }

      this.$router.replace({
        name: 'water-bill',
        params: {
          odid: this.cacheData.MerchanInfo.odid,
          MerchanInfo: this.cacheData.MerchanInfo,
          money: this.cacheData.ordermoney,
          time: this.time,
          nowTime: this.cacheData.nowTime,
          item,
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
    async payNextStep() {
      //中间插入 流水审查页面
      // rcoin 隔多长时间放币， 必须大于 0
      const rcoin = this.cacheData.payItem.rcoin
      console.log(this.cacheData)
      if (!rcoin || rcoin === '-1') {
        this.$toast.warning(
          <div>
            <p style="font-size:14px;margin:5px">{this.$t("views.fllow.order.toast[9]")}</p>
            <p style="font-size:15px;margin:5px">{this.$t("views.fllow.order.toast[10]")}</p>
          </div>
        )
        setTimeout(() => {
          this.gotoWaterBill()
        }, 1300)
      } else if (rcoin === '1') {
        let num = await Buy_verify(
          this.cacheData.MerchanInfo.odid,
          localStorage.getItem('userIconId')
        )
        if (num == this.cacheData.ordernum)
          this.$router.replace({
            name: 'CompleteOrderPayment',
            params: {
              item: this.cacheData.payItem,
              num: this.cacheData.ordernum,
              cuePayType: this.cacheData.ordercuePayType,
              money: this.cacheData.ordermoney,
              MerchanInfo: this.cacheData.MerchanInfo,
              nowTime: this.time,
              servicefee: this.cacheData.servicefee,
              sellerMthods: this.cacheData.sellerMthods,
            },
          })
        else this.$toast.warning('请重试！')
      } else if (rcoin === '0') {
        console.log(this.cacheData.payItem.id)
        let num
        //gas为0则商家交手续费，为1则用户交手续费
        if (this.gas == 1) {
          await Buy_user(
            this.cacheData.ordernum,
            this.cacheData.MerchanInfo.odid,
            this.cacheData.MerchanInfo.bank,
            this.cacheData.payItem.id,
            localStorage.getItem('userIconId')
          )
          while (true) {
            num = await Buy_verify(
              this.cacheData.MerchanInfo.odid,
              localStorage.getItem('userIconId')
            )
            if (num != 0) break
          }
        } else {
          num = await Buy_verify(
            this.cacheData.MerchanInfo.odid,
            localStorage.getItem('userIconId')
          )
        }

        OrderAudit({ rcoin: 1, oid: this.cacheData.MerchanInfo.odid }).then((res) => {
          let state = res.data.State
          if (state * 1 > 0 && num == this.cacheData.ordernum) {
            this.$router.replace({
              name: 'CompleteOrderPayment',
              params: {
                item: this.cacheData.payItem,
                num: this.cacheData.ordernum,
                cuePayType: this.cacheData.ordercuePayType,
                money: this.cacheData.ordermoney,
                MerchanInfo: this.cacheData.MerchanInfo,
                nowTime: this.time,
                servicefee: this.cacheData.servicefee,
                sellerMthods: this.cacheData.sellerMthods,
              },
            })
          } else {
            this.$toast.warning('锁定订单失败！')
            console.log(res)
          }
        })
      }
    },
    paytype(value) {
      return paytype(value)
    },
  },
}
</script>



<style lang="less" scoped>
/deep/ .icons9 {
  left: -0.8rem;
  bottom: 0;
}
/deep/ .van-divider {
  margin: 0;
}
.order-pay-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
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
      // color: #1989fa;
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
    // background: linear-gradient(to bottom,#d7e4e3,#b7e0de);
    background: url('@/static/image/pay-info-bg.png');
    background-size: cover;
    font-size: 30px;
    display: flex;
    padding: 20px;
    margin: 25px;
    border-radius: 15px;
    flex-direction: column;
    .seller-info-top {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .pay-info1 {
        flex: 50%;
        font-weight: 700;
      }
      .info2 {
        span {
          margin-left: auto;
          padding-left: 20px;
          margin-right: 20px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .info-rz {
            width: 32px;
            height: 32px;
            padding-left: 5px;
          }
        }
        flex: 70%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;
      }
    }
    .full-info {
      font-size: 24px;
      overflow-y: auto;
      max-height: 200px;
      .info-box {
        color: #888;
        line-height: 40px;
        // color: var(--main-test-color);
      }
    }
  }
  .main {
    margin: 25px;
    font-size: 26px;
    .top-text {
      display: flex;
      align-items: center;
      .icon-img {
        width: 40px;
        height: 40px;
        margin-right: 25px;
      }
      span {
        font-weight: bold;
      }
    }
    li {
      padding: 25px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span:first-child {
        color: var(--main-test-color);
      }
    }
  }
  .importan-tTsxt {
    color: var(--main--color);
    font-weight: 700;
    font-size: 42px;
  }
  .footer {
    display: flex;
    flex: 1;
    align-items: flex-end;
    justify-content: space-evenly;
    padding-bottom: 25px;

    button {
      font-size: 26px;
      display: block;
    }
    .van-button {
      height: 1rem;
    }
    .cancel {
      button {
        padding: 0 60px;
        color: #000;
      }
    }
    .next {
      button {
        padding: 0 100px;
      }
    }
  }
}
</style>

>