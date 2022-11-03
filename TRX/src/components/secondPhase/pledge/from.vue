<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <van-field
        v-model="uid"
        readonly
        :label="$t('components.secondPhase.from_account')"
      />
      <van-field
        v-model="gross"
        :label="$t('components.secondPhase.from_zong')"
        readonly
      />

      <van-field
        readonly
        name="picker"
        :value="value"
        :label="$t('components.secondPhase.from_qixian')"
        :placeholder="$t('components.secondPhase.from_tab')"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="column"
          @confirm="onConfirm2"
          @cancel="showPicker = false"
        />
      </van-popup>

      <van-field
        v-model="number"
        type="number"
        :label="$t('components.secondPhase.from_num')"
        :placeholder="$t('components.secondPhase.from_pla')"
      >
        <template #right-icon>
          <p>EOTC</p>
        </template>
        <template #extra>
          <p class="type" @click="show = true">{{ type }}</p>
        </template>
      </van-field>
      <div class="hint">提示: 质押6个月年化收益24%，质押12个月年化收益36%,质押24个月年化收益50%，质押36个月年化收益60%</div>
    </div>
    <div class="botton">
      <van-button
        block
        round
        color="#1B2945"
        @click="sumbit"
        :disabled="gross != '' && number != '' && index != 0 ? false : true"
        >{{ $t("components.secondPhase.withdraw_sub") }}</van-button
      >
    </div>

    <van-popup
      round
      v-model="show"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        :title="$t('components.secondPhase.from_node_type')"
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
import { StakingEotc } from "@/api/trxRequest";
export default {
  //质押表单
  components: {
    white,
  },
  data() {
    return {
      title: this.$t("components.secondPhase.zhiya"),
      //质押账户
      uid: "",
      //数量
      number: "",

      type: this.$t("components.secondPhase.from_type"),
      show: false,
      columns: this.$t("components.secondPhase.from_columns"),

      buttonShow: false,

      //EOTC总量
      gross: "",

      value: "",
      column: this.$t("components.secondPhase.from_column"),
      showPicker: false,
      index: 0,
    };
  },
  mounted() {
    this.uid = localStorage.getItem("uid");
    this.gross = localStorage.getItem("eotc_stake");
  },
  watch: {
    number(newName, old) {
      console.log(newName);
      if (newName < 0) {
        Toast.fail(this.$t("components.secondPhase.from_youxiao"));
        this.number = "";
      } else if (newName > Number(this.gross)) {
        Toast.fail(this.$t("components.secondPhase.from_acc_buzu"));
        this.number = "";
      }
      if (newName >= 100 && newName < 5000) {
        this.type = this.$t("components.secondPhase.youxiao_user");
      } else if (newName >= 5000 && newName < 10000) {
        this.type = this.$t("components.secondPhase.xinyong_node");
      } else if (newName >= 10000 && newName < 50000) {
        this.type = this.$t("components.secondPhase.shishi_node");
      } else if (newName >= 50000 && newName < 100000) {
        this.type = this.$t("components.secondPhase.zhongji_node");
      } else if (newName >= 100000) {
        this.type = this.$t("components.secondPhase.gaoji_node");
      } else {
        this.type = this.$t("components.secondPhase.from_type");
      }
    },
  },
  methods: {
    sumbit() {
      StakingEotc({ num: this.number, zq: this.index }).then((res) => {
        let data = res.data;
        if (data.State < 0) {
          this.$toast.warning(this.$t("components.secondPhase.from_fail"));
        } else {
          this.$toast.success(this.$t("components.secondPhase.from_suc"));
          this.gross = this.gross - this.number;
          let num = (
            Number(localStorage.getItem("otczy")) + Number(this.number)
          ).toFixed(2);
          localStorage.setItem("otczy", num);
          localStorage.setItem("eotc_stake", this.gross);
        }
        console.log(res);
      });
    },

    onConfirm(value, index) {
      this.show = false;
      switch (index) {
        case 0:
          this.number = 100;
          this.type = this.$t("components.secondPhase.youxiao_user");
          break;
        case 1:
          this.number = 1000;
          this.type = this.$t("components.secondPhase.youxiao_user");
          break;
        case 2:
          this.number = 5000;
          this.type = this.$t("components.secondPhase.xinyong_node");
          break;
        case 3:
          this.type = this.$t("components.secondPhase.shishi_node");
          this.number = 10000;
          break;
        case 4:
          this.type = this.$t("components.secondPhase.zhongji_node");
          this.number = 50000;
          break;
        case 5:
          this.type = this.$t("components.secondPhase.gaoji_node");
          this.number = 100000;
          break;
      }
    },
    onConfirm2(value) {
      this.value = value;
      this.showPicker = false;
      console.log(value);
      if (value == `6${this.$t("components.secondPhase.from_months")}`) {
        this.index = 6;
      } else if (
        value == `12${this.$t("components.secondPhase.from_months")}`
      ) {
        this.index = 12;
      } else if (
        value == `24${this.$t("components.secondPhase.from_months")}`
      ) {
        this.index = 24;
      } else {
        this.index = 36;
      }
    },

    onCancel() {
      this.show = false;
      Toast(this.$t("components.secondPhase.from_cancel"));
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  font-size: 28px;
  border-top: 20px solid #f3f4f5;
  .hint {
    padding: 40px 32px 0;
    color: #fc7542;
    line-height: 50px;
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
