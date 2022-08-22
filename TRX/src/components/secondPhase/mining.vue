<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <div class="header">
        <img src="../../static/icon/shovel.png" alt="" />
        <p>推广总收益<span>(EOTC)</span></p>
        <p>19716.37</p>
      </div>
      <div class="datum">
        <div>
          <p>分享奖励(EOTC)</p>
          <p>154.23</p>
        </div>
        <div>
          <p>盲盒奖励(个)</p>
          <p>456</p>
        </div>
        <div>
          <p>推荐质押(人数)</p>
          <p>45</p>
        </div>
        <div>
          <p>推荐质押(EOTC)</p>
          <p>86699.00</p>
        </div>
      </div>
      <div class="footer">
        <van-button color="#1B2945" block round disabled>流动性挖矿</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
//流动性挖矿收益
export default {
  components: {
    white,
  },
  data() {
    return {
      title: "流动性挖矿",
    };
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 30px 32px 0;
  min-height: calc(100vh - 126px);
  font-size: 28px;
  background: #f3f4f5;
  .header {
    background: #f69540;
    border-radius: 20px;
    color: #fff;
    padding: 40px 30px 60px;
    margin-bottom: 30px;
    position: relative;
    span {
      font-size: 24px;
    }
    p:last-child {
      margin-top: 30px;
      font-size: 40px;
      font-weight: bold;
    }
    img {
      width: 180px;
      position: absolute;
      right: 30px;
      top: 23px;
    }
  }
  .datum {
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
      color: #666;
      margin-bottom: 12px;
    }
    div p:last-child {
      font-size: 36px;
      font-weight: bold;
    }
  }
  .footer{
    width: calc(100vw - 128px);
    position: fixed;
    bottom: 60px;
    right: 64px;
  }
}
</style>
