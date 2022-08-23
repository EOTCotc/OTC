<template>
  <div class="content">
    <div class="header">
      <p>二期可支配收益</p>
      <p>交易用户</p>
    </div>
    <div class="center">
      <div class="dataBox">
        <div>
          <p>USDT</p>
          <p>{{ USDT }}</p>
        </div>
        <div>
          <p>EOTC</p>
          <p>{{ EOTC }}</p>
        </div>
        <div>
          <p>LP</p>
          <p>{{ LPnum }}</p>
        </div>
        <div>
          <p>卡牌</p>
          <p>{{ card }}</p>
        </div>
      </div>
      <div class="function">
        <div @click="jump(1)">
          <p>交易质押</p>
          <p>OTC 币币质押明细</p>
          <span>去查看></span>
          <img src="../../static/icon/gold.png" alt="" />
        </div>
        <div @click="jump(2)">
          <p>链上理财赚币</p>
          <p>质押收益明细</p>
          <span>去查看></span>
          <img src="../../static/icon/wallet.png" alt="" />
        </div>
        <div @click="jump(3)">
          <p>EOTC NFT</p>
          <p>推广收益明细</p>
          <span>去查看></span>
          <img src="../../static/icon/nft.png" alt="" />
        </div>
        <div @click="jump(4)">
          <p>流动性挖矿</p>
          <p>推广收益明细</p>
          <span>去查看></span>
          <img src="../../static/icon/needle.png" alt="" />
        </div>
      </div>
      <div class="recharge">
        <van-button plain round type="info" :to="{name:'Withdraw'}">提现</van-button>
        <van-button round type="info" :to="{name:'recharge'}">充值</van-button>
      </div>
    </div>
  </div>
</template>

<script>
//二期推广
export default {
  data() {
    return {
      USDT: 123,
      EOTC: 456,
      LPnum: 3,
      card: 1,
    }
  },
  methods: {
    jump(index) {
      switch (index) {
        case 1:
          this.$router.push({ name: 'pledge' })
          break
        case 2:
          this.$router.push({ name: 'zyzb' })
          break
        case 3:
          this.$router.push({ name: 'NFT' })
          break
        case 4:
          this.$router.push({ name: 'mining' })
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  padding: 25px 32px 89px;
  background: #1b2945;
  color: #fff;
  font-size: 32px;
  display: flex;
  justify-content: space-between;
}
.center {
  padding: 0 32px;
  position: relative;
  .dataBox {
    position: absolute;
    top: -59px;
    width: calc(100vw - 128px);
    padding: 28px 30px 40px;
    background: #fff;
    box-shadow: 0px 3px 12px 1px rgba(27, 41, 69, 0.06);
    border-radius: 20px 20px 20px 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    div {
      width: 45%;
    }
    div:first-child {
      margin-bottom: 30px;
    }
    div p:first-child {
      font-size: 24px;
      color: #999999;
      margin-bottom: 12px;
    }
    div p:last-child {
      font-size: 36px;
      font-weight: bold;
    }
  }
  .function {
    padding-top: 258px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    div {
      width: 282px;
      border-radius: 10px;
      padding: 20px 24px;
      margin-bottom: 30px;
      overflow: hidden;
      background: #999999;
      font-size: 22px;
      position: relative;
      p:first-child {
        color: #854d1c;
        font-size: 32px;
        padding-bottom: 8px;
        font-weight: 800;
      }
      p:nth-child(2) {
        color: #854d1c;
        font-size: 24px;
        padding-bottom: 23px;
      }
      span {
        color: #fff;
        background: linear-gradient(136deg, #ed9a65 0%, #e27a40 100%);
        padding: 1px 10px;
        border-radius: 16px;
      }
      img {
        width: 125px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
    div:nth-child(1) {
      background: linear-gradient(134deg, #fcf2ea 0%, #f6d8bb 100%);
    }
    div:nth-child(2) {
      background: linear-gradient(134deg, #fff2ec 0%, #ffcbb5 100%);
    }
    div:nth-child(3) {
      background: linear-gradient(134deg, #e8effd 0%, #bccdfa 100%);
      p:first-child {
        color: #2e4a91;
      }
      p:nth-child(2) {
        color: #2e4a91;
      }
      span {
        background: linear-gradient(136deg, #608cf3 0%, #4774df 100%);
      }
    }
    div:nth-child(4) {
      background: linear-gradient(134deg, #fcf2ea 0%, #fed6b0 100%);
    }
  }
  .recharge {
    width: calc(100% - 64px);
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 32px;
    bottom: 60px;
    .van-button {
      width: 320px;
    }
  }
}
</style>
