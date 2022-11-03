<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <p>{{ $t('components.arbitration.reset.condition.title') }}</p>
      <van-radio-group v-model="radio">
        <van-radio name="1">{{ $t('components.arbitration.reset.condition.status[0]') }}</van-radio>
        <van-radio name="2">{{ $t('components.arbitration.reset.condition.status[1]') }}</van-radio>
      </van-radio-group>
      <p class="title">{{ $t('components.arbitration.reset.reason.title') }}</p>
      <van-field
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        :placeholder="$t('components.arbitration.reset.reason.placeholder')"
      />
      <div class="button">
        <van-button
          round
          color="#1B2945"
          block
          :disabled="message == '' ? true : false"
          @click="submit"
        >
          {{ $t('components.arbitration.reset.submit.button') }}
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import white from "@/components/Nav/white.vue";
import {Toast} from "vant";

export default {
  //发起重新举证
  components: {
    white
  },
  data() {
    return {
      title: this.$t('components.arbitration.reset.navbar'),
      radio: "1",
      message: ""
    };
  },
  methods: {
    submit() {
      Toast.loading({
        message: this.$t('components.arbitration.reset.submit.loading'),
        duration: 2000,
        forbidClick: true
      });
      Toast.success({
        message: this.$t('components.arbitration.reset.submit.success'),
        onClose: () => this.$router.go(-1)
      });
    }
  }
};
</script>
<style lang="less" scoped>
.content {
  font-size: 28px;
  padding: 32px;
  color: #333;
  p:first-child {
    margin-bottom: 30px;
  }
  /deep/ .van-radio {
    margin-bottom: 30px;
  }
  .title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  /deep/ .van-cell {
    border: 1px solid #c8cfde;
    border-radius: 20px;
  }
  /deep/ .van-field__control {
    min-height: 300px;
  }
  .button {
    width: 90%;
    position: absolute;
    bottom: 100px;
    left: 36px;
  }
}
</style>
