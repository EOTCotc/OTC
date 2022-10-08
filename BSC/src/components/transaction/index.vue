<template>
  <div class="main">
    <white :title="title"></white>
    <div class="content">
      <div class="gross">
        <p class="title">交易总量</p>
        <div class="grossBox">
          <div>
            <p>总交易量(USDT)</p>
            <p>50.45万</p>
          </div>
          <div></div>
          <div>
            <p>总交易人数(人)</p>
            <p>5.28万</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import white from '@/components/Nav/white.vue'
export default {
  components: {
    white,
  },
  data() {
    return {
      title: '交易数据',
    }
  },
  created() {
    Dialog.alert({
      title: '错误信息',
      message: '646448',
    }).then(() => {
      console.log(123)
    })
  },
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  background: #f3f4f5;
  .content {
    padding: 30px;
    .gross {
      margin-bottom: 40px;
      .title {
        font-size: 32px;
        margin-bottom: 30px;
      }

      .grossBox {
        padding: 17px 0 35px 0;
        background: #fff;
        border-radius: 16px;
        display: flex;
        justify-content: space-around;
        div {
          p:first-child {
            margin-bottom: 5px;
            font-size: 24px;
            color: #666;
          }
          p:last-child {
            font-size: 36px;
            font-weight: bolder;
          }
        }
        div:nth-child(2) {
          border-right: 1px solid #ccc;
        }
      }
    }
  }
}
</style>
