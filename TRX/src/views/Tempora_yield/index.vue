<template>
  <div class="Temporal_yield">
    <van-field
      ref="ipt"
      v-model="number"
      autofocus="autofocus"
      @blur="on_input(number)"
      :label="$t('views.tempora.label')"
    >
      <template #button>
        <van-button size="small" type="info" @click="setValue">{{$t("views.tempora.set") }}</van-button>
      </template>
    </van-field>
    <van-field readonly v-model="comValue" :label="$t('views.tempora.day')" />
  </div>
</template>

<script>
import { SetArp } from "@/utils/web3";

export default {
  name: "Temporal-yield",

  data() {
    return {
      number: "12%",
      val: 12,
      comValue: 329,
    };
  },
  methods: {
    on_input(value) {
      if ((value ?? "") !== "") {
        this.val = value;
        this.comValue = Math.round((Number(value.split("%")[0]) * 10000) / 365);
        if (this.number.slice(-1) === "%") {
          this.number = value;
          return false;
        }
        this.number = `${value}%`;
      }
    },
    setValue() {
      if ((this.number ?? "") !== "") {
        SetArp(this.comValue);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.Temporal_yield {
  width: 100vw;
}
</style>
