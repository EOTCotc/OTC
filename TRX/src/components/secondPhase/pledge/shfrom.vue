<template>
  <div>
    <van-nav-bar
      :title="$t('components.secondPhase.shfrom_shuhui')"
      left-arrow
      :border="false"
      fixed
      placeholder
      @click-left="onClickLeft"
    />
    <div class="content">
      <van-field
        v-model="num"
        :border="false"
        :label="$t('components.secondPhase.shfrom_num')"
        :placeholder="$t('components.secondPhase.shfrom_num2')"
      >
        <template #extra>
          <p class="all">{{ $t("components.secondPhase.withdraw_all") }}</p>
        </template>
      </van-field>
      <div class="buttBox">
        <van-button
          color="#1B2945"
          round
          block
          :disabled="num != '' ? false : true"
          @click="redeem()"
          >{{ $t("components.secondPhase.pledge_shuhui") }}</van-button
        >
      </div>
      <van-dialog
        v-model="show"
        :title="$t('components.secondPhase.shfrom_tip')"
        :message="$t('components.secondPhase.shfrom_cai')"
        :confirm-button-text="$t('components.secondPhase.shfrom_iknow')"
        confirm-button-color="#1B2945"
      ></van-dialog>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      num: "",
      show: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },

    redeem() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-dialog__message--has-title {
  color: #fc7542;
}
.content {
  font-size: 28px;
  border-top: 20px solid #f3f4f5;
  .all {
    color: #237ff8;
  }
  .buttBox {
    width: 90%;
    margin: 120px auto 0;
  }
}
</style>
