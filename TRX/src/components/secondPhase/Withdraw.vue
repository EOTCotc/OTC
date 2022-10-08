<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <div class="top">
        <p>提现类别</p>
        <div class="category">
          <p
            v-for="(item,index) in category"
            :key="index"
            :class="item.show?'action':''"
            @click="switchTo(index)"
          >{{item.title}}</p>
        </div>
      </div>
      <div class="center">
        <van-field v-model="netType" :border="false" readonly label="网络类型" />
        <van-field v-model="address2" :border="false" readonly label="提现地址" />
        <van-field v-model="num" type="number" :border="false" label="提现数量" placeholder="请输入提现数量">
          <template #extra>
            <div class="all" @click="all()">全部</div>
          </template>
        </van-field>
        <p v-if="netType=='bsc'">手续费{{random}}BSC</p>
        <p v-else>手续费{{random}}TRX</p>
      </div>
      <div class="footer">
        <van-button type="info" block round :disabled="num!=''?false:true" @click="recharge(num)">提交</van-button>
        <p>最少提100 {{category[action].title}}，提币到账时间为T+1。</p>
        <!-- <p @click="look()">查看提现记录</p> -->
      </div>
    </div>
  </div>
</template>


<script>
import white from '@/components/Nav/white.vue'
import { getTrxBalance, oneSfeotc } from '@/utils/web3'
import { WithdrawCoins } from '@/api/trxRequest'
import { Toast } from 'vant'
export default {
  //提现
  components: {
    white,
  },
  data() {
    return {
      title: '提现',
      category: [
        { title: 'EOTC', show: true },
        { title: 'USDT', show: false },
        { title: 'LP', show: false },
        { title: 'NFT', show: false },
      ],
      action: 0,
      netType: '',
      address: '',
      address2: '',
      num: '',

      EOTCnum: '',
      USDTnum: '',

      random: 0,
      // net: '',
    }
  },
  created() {
    this.EOTCnum = this.$route.params.EOTC
    this.USDTnum = this.$route.params.USDT

    this.netType = localStorage.getItem('netType')
    this.address = localStorage.getItem('myaddress')
    this.address2 =
      this.address.substring(0, 10) +
      '...' +
      this.address.substring(this.address.length - 10, this.address.length)

    if (this.netType == 'bsc') {
      this.random = this.getRandom(33, 66) / 10000
    } else {
      this.random = this.getRandom(15, 30)
    }
  },
  methods: {
    switchTo(index) {
      this.action = index
      this.num = ''
      for (let i of this.category) {
        i.show = false
      }
      this.category[index].show = true
    },
    recharge(num) {
      let coin = this.category[this.action].title.toLowerCase()
      console.log(coin)
      if (this.action == 2 || this.action == 3) {
        this.$toast.warning('功能暂未开放，请耐心等待。')
        return
      }
      if (num < 100) {
        this.$toast.warning(`最少提100${this.category[this.action].title}！`)
        return
      } else if (this.action == 0 && num > this.EOTCnum * 1) {
        this.$toast.warning(`您的EOTC余额不足！`)
        return
      } else if (this.action == 1 && num > this.USDTnum * 1) {
        this.$toast.warning(`您的USDT余额不足！`)
        return
      }
      let that = this
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      })
      getTrxBalance(function () {
        oneSfeotc(that.random).then((success) => {
          WithdrawCoins({ num: that.num, coin: coin, hx: success.txid }).then((res) => {
            Toast.clear()
            that.$toast.success('提现成功，您提现的金额将在5分钟之内到账')
            if (coin == 'eotc') {
              that.EOTCnum = that.EOTCnum * 1 - that.num * 1
              let eotc = that.EOTCnum * 1 + localStorage.getItem('myeotc') * 1
              localStorage.setItem('eotc_stake', eotc)
            } else {
              that.USDTnum = that.USDTnum * 1 - that.num * 1
              localStorage.setItem('usdt_ye', that.USDTnum)
              console.log(res)
            }
          })
        })
      })
    },
    look() {
      this.$router.push({ name: 'WithdrawRecord' })
    },
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    all() {
      if (this.action == 0) {
        // console.log(this.EOTC)
        this.num = this.EOTCnum
      } else if (this.action == 1) {
        this.num = this.USDTnum
      } else {
        this.$toast.warning('功能暂未开放，请耐心等待。')
      }
      console.log(this.num)
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
  .center {
    .all {
      color: #237ff8;
    }
    p {
      margin-top: 20px;
    }
  }

  .footer {
    margin-top: 40px;
    p:nth-child(2) {
      margin-top: 40px;
      color: #999;
    }
    // p:last-child {
    //   text-align: center;
    //   color: #237ff8;
    //   margin-top: 30px;
    // }
  }
}
</style>
