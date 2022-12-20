<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <div class="top">
        <p>{{$t('components.secondPhase.recharge_type')}}</p>
        <div class="category">
          <p
            v-for="(item, index) in category"
            :key="index"
            :class="item.show ? 'action' : ''"
            @click="switchTo(index)"
          >{{ item.title }}</p>
        </div>
      </div>
      <div>
        <van-field
          v-model="netType"
          :border="false"
          readonly
          :label="$t('components.secondPhase.recharge_net')"
        />
        <van-field
          v-model="address2"
          :border="false"
          readonly
          :label="$t('components.secondPhase.recharge_site')"
        />
        <van-field
          v-model="num"
          type="number"
          :border="false"
          :label="$t('components.secondPhase.recharge_num')"
          maxlength="10"
          :placeholder="$t('components.secondPhase.recharge_pla')"
        />
      </div>
      <div class="footer">
        <van-button
          type="info"
          block
          round
          :disabled="num != '' ? false : true"
          @click="recharge()"
        >{{ $t("components.secondPhase.recharge_wancheng") }}</van-button>
        <p @click="look()">{{ $t("components.secondPhase.recharge_recode") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SendUSDT,
  getTrxBalance,
  loadweb3,
  myUsdtAmount,
  myEOTCAmount,
  userBaseMes,
} from '@/utils/web3'
import { Recharge } from '@/api/trxRequest'
import { Dialog } from 'vant'
import white from '@/components/Nav/white.vue'
export default {
  //充值
  components: {
    white,
  },
  data() {
    return {
      title: this.$t('components.secondPhase.chongzhi'),
      category: [
        { title: 'EOTC', show: true },
        { title: 'USDT', show: false },
        { title: 'LP', show: false },
        { title: 'NFT', show: false },
      ],
      netType: '',
      address: '',
      address2: '',
      num: '',
    }
  },
  created() {
    setTimeout(() => {
      loadweb3(userBaseMes)
    }, 1000)
    this.netType = localStorage.getItem('netType')
    let net = localStorage.getItem('netType')
    if (net == 'bsc') {
      this.address = '0xdCAaB3E9Ade1000fd23Fa0EAcd2D7E1359300D8B'
    } else {
      this.address = 'TA6jfgkurdTrwqic3G56GpG2Keh5EWx2kq'
    }
    this.address2 =
      this.address.substring(0, 10) +
      '...' +
      this.address.substring(this.address.length - 10, this.address.length)
  },
  methods: {
    switchTo(index) {
      for (let i of this.category) {
        i.show = false
      }
      this.category[index].show = true
    },
    async recharge() {
      let money, num
      for (let i of this.category) {
        if (i.show) {
          if (i.title == 'EOTC' || i.title == 'USDT') {
            money = i.title
          } else {
            this.$toast.warning(`${i.title}${this.$t('components.secondPhase.recharge_data1')}`)
            return
          }
        }
      }
      if (money == 'USDT') {
        await myUsdtAmount()
        num = Number(localStorage.getItem('myamount'))
      } else if (money == 'EOTC') {
        await myEOTCAmount()
        num = Number(localStorage.getItem('eotcAmount'))
      }

      let that = this
      if (num >= that.num) {
        getTrxBalance(function () {
          SendUSDT(that.num, that.address, money).then((res) => {
            let net
            console.log(money)
            if (money == 'EOTC') {
              net = money.toLowerCase()
            } else if (money == 'USDT') {
              net = localStorage.getItem('netType')
            }
            console.log(net)
            Recharge({ hx: res, usdt: that.num, net: net }).then((res) => {
              console.log(res)
              if (res.data.State > 0) {
                Dialog.alert({
                  message: `${this.$t('components.secondPhase.recharge_data2')}\n${this.$t(
                    'components.secondPhase.recharge_data3'
                  )}`,
                }).then(() => {
                  // on close
                })
              }
            })
          })
        })
      } else {
        this.$toast.warning(
          `${this.$t('components.secondPhase.recharge_your')}${money}${this.$t(
            'components.secondPhase.recharge_data4'
          )}`
        )
      }
    },

    look() {
      this.$router.push({ name: 'rechargeRecord' })
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.van-cell {
  padding-left: 0;
  padding-right: 0;
}
.content {
  padding: 35px 30px 0;
  font-size: 28px;
  .top {
    .category {
      display: flex;
      justify-content: space-between;
      margin: 30px 0;
      p {
        padding: 14px 0;
        width: 20%;
        text-align: center;
        background: #f3f4f5;
        border: 1px solid #f3f4f5;
        border-radius: 16px;
      }
      .action {
        color: #237ff8;
        background: #fff;
        border: 1px solid #237ff8;
      }
    }
  }
  .footer {
    margin-top: 40px;
    p {
      text-align: center;
      color: #237ff8;
      margin-top: 30px;
    }
  }
}
</style>
