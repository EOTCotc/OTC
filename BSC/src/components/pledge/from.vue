<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <div class="top">
        <p>USDT余额</p>
        <p>{{usdt}}</p>
      </div>
      <van-field
        v-model="number"
        type="number"
        label="质押数量"
        placeholder="请输入质押数量"
      >
        <template #right-icon>
          <p>EOTC</p>
        </template>
        <template #extra>
          <p class="type" @click="show = true">节点类型</p>
        </template>
      </van-field>
      <p class="conversion">1EOTC=0.42USDT</p>
    </div>
    <div class="botton">
      <van-button block round color="#1B2945" @click="sumbit">提交</van-button>
    </div>
    <van-popup
      round
      v-model="show"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        title="选择节点类型"
        show-toolbar
        :columns="columns"
        :default-index="2"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
import { Toast } from "vant";
export default {
  //质押表单
  components: {
    white,
  },
  data() {
    return {
      title: "质押",
      number: "",
      show: false,
      columns: [
        "A1 100EOTC",
        "A2 1000EOTC",
        "A3 5000EOTC",
        "A4 10000EOTC",
        "A5 50000EOTC",
      ],
      usdt:''
    };
  },
  mounted(){
    this.usdt=localStorage.getItem('usdtsq')
  },
  methods: {
    sumbit() {
      if (this.number == "") {
        Toast.fail("请输入质押数量");
        return
      }
      if(this.number<= 0){
          Toast.fail("请输入有效质押数量");
        return
      }
    },
    onConfirm(value, index) {
      this.show = false;
      switch (index) {
        case 0:
          this.number = 100;
          break;
        case 1:
          this.number = 1000;
          break;
        case 2:
          this.number = 5000;
          break;
        case 3:
          this.number = 10000;
          break;
        case 4:
          this.number = 50000;
          break;
      }
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      this.show = false;
      Toast("取消");
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  font-size: 28px;
  .top {
    display: flex;
    align-items: center;
    padding: 28px 32px;
    font-weight: bold;
    p:first-child {
      margin-right: 66px;
    }
  }
  .type {
    color: #237ff8;
    margin-left: 49px;
  }
  .conversion {
    padding: 28px 32px;
  }
}
.botton {
  position: fixed;
  bottom: 60px;
  right: 32px;
  width: calc(100vw - 64px);
}
</style>
