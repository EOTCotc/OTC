<template>
  <div>
    <div class="tips-info" v-if="!againAffirmInfo">
      <h3>{{ $t("views.fllow.tips.title") }}</h3>
      <div class="tipMainmessage">
        {{ $t("views.fllow.tips.message") }}
      </div>
      <dl>
        <dt>{{ $t("views.fllow.tips.info") }}</dt>
        <dd>
          <span>{{ $t("views.fllow.tips.type") }}</span>
          <span class="title" v-if="curPay === 'wx'">{{
            $t("views.fllow.tips.wechat_pay")
          }}</span>
          <span class="title" v-else-if="curPay === 'xj'">{{
            $t("views.fllow.tips.transaction")
          }}</span>
          <span class="title" v-else-if="curPay === 'yhk'">{{
            $t("views.fllow.tips.bank_card")
          }}</span>
          <span v-else>{{ $t("views.fllow.tips.Alipay") }}</span>
        </dd>
        <dd>
          <span>{{ $t("views.fllow.tips.name") }}</span>
          <span>{{ name }}</span>
        </dd>
        <dd v-if="curPay === 'yhk'">
          <span>{{ $t("views.fllow.tips.account") }}</span>
          <span class="title">
              {{account}}
          </span>
        </dd>
        <dd v-else-if="curPay === 'wx'">
          <span>{{ $t("views.fllow.tips.account") }}</span>
          <span class="title">
              {{account_wx}}
          </span>
        </dd>
        <dd v-else-if="curPay === 'zfb'">
          <span>{{ $t("views.fllow.tips.account") }}</span>
          <span class="title">
              {{account_zfb}}
          </span>
        </dd>
      </dl>

      <van-button @click="accountPaid" size="large">>{{$t("views.fllow.tips.finish")}}</van-button>
      <van-button @click="unAccountPaid" size="large">{{ $t("views.fllow.tips.unfinished") }}</van-button>
    </div>
    <div class="tips-info" v-if="againAffirmInfo">
      <h3>{{ $t("views.fllow.tips.van_form[0]") }}</h3>
      <div :style="{marginBottom:'20px'}">
        <van-form class="tips-form">
          <van-field name="checkbox">
            <template #input>
              <van-checkbox v-model="checkbox" shape="square" />
            </template>
          </van-field>
          <span
            class="tips-text"
            @click="handleAffirmInfo"
            :class="{ 'error-text': ischeckbox }"
          >
            {{ $t("views.fllow.tips.van_form[1]") }}
            <b :style="{ color: 'red' }">{{ $t("views.fllow.tips.van_form[2]") }}</b
            >{{ $t("views.fllow.tips.van_form[3]") }}
          </span>
        </van-form>
      </div>
      <van-button
        @click="throttle(handlePayOK, 2000)"
        class="default-btn"
        type="default"
        size="large"
      >
        {{ $t("views.fllow.tips.van_form[4]") }}
      </van-button>
      <van-button @click="unAccountPaid" size="large">{{$t("views.fllow.tips.van_form[5]")}}</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "pay-info-tips",
  props: ["curPay", "name",'account','account_wx','account_yhk'],
  data() {
    return {
      checkbox: false,
      againAffirmInfo: false,
      ischeckbox: false,
    };
  },
  methods: {
    accountPaid() {
      this.againAffirmInfo = true;
    },
    init() {
      this.againAffirmInfo = false;
      this.checkbox = false;
    },
    handleAffirmInfo() {
      this.checkbox = !this.checkbox;
    },
    unAccountPaid() {
      this.$emit("set-info-tips", false);
    },
    handlePayOK() {
      if (this.checkbox) {
        this.$emit("go-await-seller-affirm", true);
      } else {
        this.$toast.warning(this.$t("views.fllow.tips.toast"));
        this.ischeckbox = true;
        setTimeout(() => {
          this.ischeckbox = false;
        }, 1500);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tips-info {
  padding: 30px 50px 30px 30px;
  box-sizing: content-box;
  .title{
    color: red;
  }
  dl {
    font-size: 30px;
    dd {
      padding: 5px 10px;
    }
  }
  .tipMainmessage {
    border-radius: 15px;
    text-indent: 0.3rem;
    padding: 20px;
    line-height: 0.7rem;
    color: var(--main-test-color);
    background-color: rgb(249, 249, 249);
  }

  h3 {
    margin: 0;
    font-size: .6rem;
    margin-bottom: 30px;
  }
  .van-cell {
    padding: 0;
  }
  .error-text {
    color: red;
  }
  .tips-form {
    position: relative;
  }

  .tips-text {
    position: absolute;
    left: 0.8rem;
    top: -5px;
  }
  .van-field {
    margin-bottom: 0;
  }
  div {
    font-size: 30px;
  }
  .van-button {
    font-weight: 700;
    background-color: rgb(242, 245, 252);
  }
  .default-btn {
    background-color: var(--main--color);
    color: #fff;
  }
}
/deep/ .van-icon {
  border-radius: 6px !important;
}
</style>
