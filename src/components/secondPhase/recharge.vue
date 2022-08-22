<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <div class="top">
        <p>充值类别</p>
        <div class="category">
          <p
            v-for="(item,index) in category"
            :key="index"
            :class="item.show?'action':''"
            @click="switchTo(index)"
          >{{item.title}}</p>
        </div>
      </div>
      <div>
        <van-field v-model="text"  label="充值网络" />
        <van-field v-model="text" label="充值网络" />
        <van-field v-model="text" label="充值网络" />
      </div>
    </div>
  </div>
</template>

<script>
import white from '@/components/Nav/white.vue'
export default {
  //充值
  components: {
    white,
  },
  data() {
    return {
      title: '充值',
      category: [
        { title: 'EOTC', show: true },
        { title: 'USDT', show: false },
        { title: 'LP', show: false },
        { title: 'NFT', show: false },
      ],

    }
  },
  methods: {
    switchTo(index) {
      for (let i of this.category) {
        i.show = false
      }
      this.category[index].show = true
    },
  },
}
</script>

<style lang="less" scoped>
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
}
</style>
