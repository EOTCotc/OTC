<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <div class="top">
        <p>{{ $t("components.secondPhase.tixian") }}</p>
        <p>{{ $t("components.secondPhase.record_statu") }}</p>
        <p>{{ $t("components.secondPhase.wrecord_date") }}</p>
      </div>

      <div class="list" v-for="(item, index) in list" :key="index">
        <p>{{ item.Coin }}</p>
        <p class="listState">{{ item.Chu }}</p>
        <p>{{ item.Zdate }}</p>
      </div>
      <div v-if="list.length == 0">
        <van-empty
          image="error"
          :description="$t('components.secondPhase.record_not')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import white from '@/components/Nav/white.vue'
import { Toast } from 'vant'
import { GetSymx, Gettbjl } from '@/api/trxRequest'
export default {
  components: {
    white,
  },
  data() {
    return {
      title: this.$t("components.secondPhase.wrecord_record"),
      list: [],
      loading: false,
      finished: false,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: this.$t("components.secondPhase.record_loading"),
      });
      GetSymx({})
        .then((res) => {
          let data = res.data
          console.log(data)
          for (let i of data) {
            switch (i.Chu) {
              case '0':
                i.Chu = '排队中'
                break
              case '9':
                i.Chu = '确认中'
                break
              case '1':
                i.Chu = '确认中'
                break
            }
          }
          this.list = data;
          Toast.success(this.$t("components.secondPhase.record_suc"));
          // console.log(data);
        })
        .catch((err) => {
          Toast.fail(this.$t("components.secondPhase.record_fail"));
          console.log(err);
        });
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  .top {
    background: #f3f4f5;
    padding: 20px 40px 20px 48px;
    color: #999;
    font-size: 28px;
    display: flex;
    justify-content: space-between;
    // p:last-child {
    //   width: 30%;
    //   text-align: center;
    // }
  }
  .list {
    padding: 28px 48px;
    color: #666;
    font-size: 28px;
    display: flex;
    justify-content: space-between;
    p:nth-child(2) {
      // flex: 1;
      width: 28%;
      text-align: end;
    }
  }
}
</style>