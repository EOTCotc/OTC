<template>
  <div class="order-gather-container">
    <div class="flexBox">
      <van-tabs
        @click="onClick"
        sticky
        :offset-top="offsetTop"
        v-model="active"
        line-height="3px"
        swipeable
        color="#ee0a24"
        background="#1B2945"
        title-active-color="#fff"
        title-inactive-color="#8D94A2"
      >
        <van-tab title="未完成">
          <OrderUndone ref="Undone" :id="option1[value1].id" :key="force_Update_num"></OrderUndone>
        </van-tab>
        <van-tab title="已完成">
          <OrderCompleted ref="Completed" :id="option1[value1].id"></OrderCompleted>
        </van-tab>
        <van-tab title="其他订单">
          <OrderCanceled ref="Canceled" :id="option1[value1].id" ></OrderCanceled>
        </van-tab>
        <van-tab disabled>
          <template #title>
            <van-dropdown-menu active-color="#1989fa">
              <van-dropdown-item @change="coinChange" v-model="value1" :options="option1" />
            </van-dropdown-menu>
          </template>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import OrderCanceled from './order-canceled/index.vue'
import OrderCompleted from './order-completed/index.vue'
import OrderUndone from './order-undone/index.vue'
export default {
  components: {
    OrderCanceled,
    OrderCompleted,
    OrderUndone,
  },
  name: 'order-gather',
  created() {
    console.log(123)
    this.active = this.$route.params.done ? 1 : 0
    this.$bus.$on('update-active', this.force_Update)
    this.$nextTick(() => {
      this.offsetTop = document.getElementById('nav').getBoundingClientRect().height
    })
    this.init()
  },
  data() {
    return {
      offsetTop: '45px',
      active: 0,
      forceUpdate: true,
      force_Update_num: Math.random() * Math.random(),
      value1: 0,
      option1: [],
    }
  },

  methods: {
    force_Update() {
      this.force_Update_num = Math.random() * Math.random()
      this.active = 0
    },
    init() {
      let coinList = JSON.parse(localStorage.getItem('coinList'))

      for (let i = 0; i < coinList.length; i++) {
        this.option1.push({ text: coinList[i].name, value: i, id: coinList[i].id })
      }
      //用户订单币种Id与类型
      localStorage.setItem('userIconId',this.option1[this.value1].id)
      localStorage.setItem('userIconType',this.option1[this.value1].text)
    },
    coinChange() {
      this.initialize(this.active)
    },
    onClick(name, title) {
      this.initialize(name)
    },
    initialize(id) {
      console.log(id)
      localStorage.setItem('userIconId',this.option1[this.value1].id)
      localStorage.setItem('userIconType',this.option1[this.value1].text)
      if (id == 0) {
        this.$refs.Undone.getinit_Data(this.option1[this.value1].id)
      } else if (id == 1) {
        this.$refs.Completed.getinit_Data(this.option1[this.value1].id)
      } else {
        this.$refs.Canceled.getinit_Data(this.option1[this.value1].id)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.order-gather-container {
  height: auto;
  /deep/.van-tab {
    position: relative;
    padding: 0;
    line-height: 1rem !important;
  }
}

/deep/ .van-tabs__wrap {
  height: 1rem !important;
  border-bottom: 2px solid #eee;
}
/deep/ .van-tabs__line {
  background-color: #237df4 !important;
}
button {
  border: none !important;
}
/deep/ .van-tab__text--ellipsis {
  overflow: visible;
}
/deep/ .van-button {
  flex: 1;
}

/deep/.van-dropdown-menu {
  width: 100%;
}
/deep/.van-dropdown-menu__title {
  color: #fff;
}
/deep/.van-dropdown-menu__bar {
  background-color: #1b2945;
}
</style>
