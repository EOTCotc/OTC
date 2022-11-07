<template>
  <div class="set-purchase-container">
    <Navwhite :title="title"></Navwhite>
    <div class="content">
      <div class="cell">
        <p class="cell_title">{{ $t("views.operation.sell.number") }}</p>
        <div class="inputs">
          <input
            type="number"
            v-model="number"
            @blur="onNumInput($event)"
            :placeholder="$t('views.operation.sell.placeholder[0]')"
          />
          <p style="color: #237ff8" @click="kindShow = false">{{ kind }}</p>
        </div>
      </div>
      <div class="cell">
        <p class="cell_title">{{ $t("views.operation.sell.price") }}</p>
        <div class="inputs">
          <input
            type="number"
            v-model="price"
            @blur="onPriceInput(5, 7.5, $event, kind)"
            :placeholder="
              $t('views.operation.sell.placeholder[1]') +
              kind +
              $t('views.operation.sell.placeholder[2]')
            "
          />
          <p>CNY</p>
        </div>
      </div>

      <div class="cell">
        <p class="cell_title">{{ $t("views.operation.sell.sales") }}</p>
        <div class="cell_flex">
          <div class="inputs cell_Width">
            <input
              type="number"
              :disabled="hasInput"
              v-model="MinLegalTender"
              @blur="onMinLegalTender"
              :placeholder="$t('views.operation.sell.placeholder[3]')"
            />
            <p>CNY</p>
            <span v-if="eror[0]" class="error-text">{{
                $t("views.operation.sell.error_text")
              }}</span>
          </div>
          <div class="inputs cell_Width">
            <input
              type="number"
              :disabled="hasInput"
              v-model="MinDigitalCash"
              @blur="onMinDigitalCash"
              :placeholder="$t('views.operation.sell.placeholder[3]')"
            />
            <p>{{ kind }}</p>
            <span v-if="eror[1]" class="error-text">{{
                $t("views.operation.sell.error_text")
              }}</span>
          </div>
        </div>
        <div class="cell_flex">
          <div class="inputs cell_Width">
            <input
              type="number"
              :disabled="hasInput"
              v-model="MaxLegalTender"
              @blur="onMaxLegalTender"
              :placeholder="$t('views.operation.sell.placeholder[4]')"
            />
            <p>CNY</p>
            <span v-if="eror[2]" class="error-text">{{
                $t("views.operation.sell.error_text")
              }}</span>
          </div>
          <div class="inputs cell_Width">
            <input
              type="number"
              :disabled="hasInput"
              v-model="MaxDigitalCash"
              @blur="onMaxDigitalCash"
              :placeholder="$t('views.operation.sell.placeholder[4]')"
            />
            <p>{{ kind }}</p>
            <span v-if="eror[3]" class="error-text">{{
                $t("views.operation.sell.error_text")
              }}</span>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <h6>
        <span>{{ $t("views.operation.sell.deal") }}</span>
      </h6>
      <van-cell center :border="false">
        <template #icon>
          <img
            class="pay-img"
            :src="require('@/assets/currency-icons/unmoney.png')"
            alt="aug-icon"
          />
        </template>
        <template #title>
          <span class="custom-title">{{
              $t("views.operation.sell.adopt")
            }}</span>
        </template>
        <template #right-icon>
          <van-switch
            v-model="receiving_checked"
            @change="check_change('isMoney')"
            size="18px"
          />
        </template>
      </van-cell>
      <van-cell center :border="false">
        <template #icon>
          <img
            class="pay-img"
            :src="require('@/assets/currency-icons/curmoney.png')"
            alt="aug-icon"
          />
        </template>
        <template #title>
          <span class="custom-title">{{
              $t("views.operation.sell.adopt")
            }}</span>
        </template>
        <template #right-icon>
          <van-switch
            v-model="isMoney"
            @change="check_change('receiving_checked')"
            size="18px"
          />
        </template>
      </van-cell>
    </footer>

    <div class="button">
      <van-button
        color="#FC7542"
        block
        round
        @click="popswitch"
        :disabled="vali_value"
      >
        {{ $t("views.operation.sell.create") }}
      </van-button>
    </div>

    <van-popup
      :close-on-click-overlay="isclose_on_click_overlay"
      v-model="popshow"
      @close="close"
      round
      closeable
      position="bottom"
    >
      <div class="popup-content">
        <p class="pop-title">{{ $t("views.operation.sell.sure") }}</p>
        <p class="pop-message">{{ $t("views.operation.sell.current") }}</p>
        <div class="pop-data">
          <div>
            <p>{{ $t("views.operation.sell.price") }}</p>
            <p>{{ price }} CNY</p>
          </div>
          <div>
            <p>{{ $t("views.operation.sell.number") }}</p>
            <p>{{ number }} {{ kind }}</p>
          </div>
          <div>
            <p>{{ $t("views.operation.sell.quota") }}</p>
            <p>{{ MinLegalTender }} CNY ~ {{ MaxLegalTender }} CNY</p>
          </div>
          <div>
            <p>{{ $t("views.operation.sell.quota") }}</p>
            <p>
              {{ MinDigitalCash }} {{ kind }} ~ {{ MaxDigitalCash }} {{ kind }}
            </p>
          </div>
        </div>

        <van-checkbox shape="square" v-model="checked">{{
            $t("views.operation.sell.check")
          }}</van-checkbox>
        <van-button
          class="pop-button"
          @click="sellItem()"
          round
          color="#1B2945"
          block
          :disabled="!checked"
        >{{ $t("views.operation.sell.affirm") }}</van-button
        >
      </div>
    </van-popup>

    <van-popup
      v-model="contractShow"
      :style="{ height: '30%' }"
      round
      closeable
      position="bottom"
    >
      <div class="heyue">
        <p class="heyue_title">{{ $t("views.operation.sell.repaste") }}</p>
        <div class="heyue-text">
          <div>
            <p>{{ $t("views.operation.sell.site") }}</p>
            <p>{{ briefMyAddress(contractAddress) }}</p>
          </div>
          <div>
            <p>{{ $t("views.operation.sell.number") }}</p>
            <p>{{ number }} {{ kind }}</p>
          </div>
        </div>
        <van-button block color="#1B2945" round @click="transfer">{{
            $t("views.operation.sell.towards")
          }}</van-button>
      </div>
    </van-popup>
    <van-popup v-model="kindShow" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <PopLoad :loadShow="loadshow"></PopLoad>
  </div>
</template>

<script>
import Navwhite from "@/components/Nav/white.vue";
import PopLoad from "@/components/pop-load/index.vue";
import currency_mixin from "@/mixins/currency_mixins";
import { contractAddress } from "@/utils/abi";
import { CheckSellOrder } from "@/api/payverification";
import { addOrder } from "@/api/trxRequest";

import {
  Reconstruction_getTrxBalance,
  Reconstruction_myApprove,
  Reconstruction_verifyUSDT,
  sellOrders,
} from "@/utils/web3";

export default {
  name: "setpur-chase",
  components: {
    Navwhite,
    PopLoad,
  },
  mixins: [currency_mixin],
  data() {
    return {
      hasInput: true,
      title: this.$t("views.operation.sell.sell"),
      //合约转币
      contractShow: false,
      loadshow: false,
      contractAddress: contractAddress,

      kindShow: false,
      kind: "USDT",
      columns: ["USDT", "USDC", "BTC", "ETH", "BNB"],
    };
  },
  methods: {
    onConfirm(value) {
      this.kind = value;
      this.kindShow = false;
    },
    sellItem() {
      this.contractShow = true;
    },
    //向合约转币
    async transfer() {
      this.contractShow = false;
      this.loadshow = true;

      const cny = this.price;
      const usdtNum = this.number;
      const amount1 = this.MinLegalTender;
      const amount2 = this.MaxLegalTender;
      this.isclose_on_click_overlay = false;

      try {
        await Reconstruction_getTrxBalance(); // 支付 trx
        await Reconstruction_myApprove(usdtNum); // 授权
        await Reconstruction_verifyUSDT(parseFloat(usdtNum)); // 验证延保余额
        const { data } = await CheckSellOrder(); // 检查是否存在订单号
        const it = eval(data);
        //console.log(it);
        if (it.odid != "" && it.odid != "0") {
          //区块打包确认
          await sellOrders(usdtNum.toString(), it.id);
          const { data } = await addOrder({
            cny,
            num: usdtNum,
            amount1,
            amount2,
            type: 0, // 0 出售
            did: it.id,
            cash: this.cash,
          });
          const mynum =
            parseFloat(localStorage.getItem("myamount")) - parseFloat(usdtNum);
          localStorage.setItem("myamount", mynum);

          this.$router.replace({
            name: "order-Ticket",
            params: {
              method: "sell",
            },
          });
        } else this.$toast.error(this.$t("views.operation.sell.toast[0]"));
      } catch (err) {
        console.warn(err);
        this.$toast.warning(err.message);
        this.$toast.error(this.$t("views.operation.sell.toast[1]"));
      }
      this.isclose_on_click_overlay = true;
      this.loadshow = false;
    },
  },
};
</script>

<style lang="less" scoped>
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999;
}
.heyue {
  font-size: 0.45rem;
  display: flex;
  padding: 0 25px 25px;
  flex-direction: column;
  flex-flow: warp;
  .heyue_title {
    font-size: 0.55rem;
    font-weight: 700;
    padding: 15px 0 25px;
    border-bottom: 4px solid #eee;
  }
  .heyue-text {
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        line-height: 1rem;
        height: 1rem;
        padding: 10px 0;
      }
    }
    display: flex;
    flex-direction: column;
  }
  button {
    flex: 1;
    height: 80px;
    line-height: 80px;
    margin-top: 50px;
  }
}

.set-purchase-container {
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  .pay-img {
    width: 60px;
    height: 60px;
    margin-right: 15px;
  }
}

.footer {
  position: relative;
  flex: 460px;
  margin-bottom: 25px;
  h6 {
    margin: 0px 25px 10px;
    padding: 15px 0;
    font-size: 0.45rem;
    position: sticky;
    text-indent: 0.2rem;
    border-radius: 15px;
    z-index: 2;
    background-color: #eee;
    line-height: 40px;
    height: 40px;
    top: 0;
  }
  overflow-y: auto;
}

.button {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 25px 80px;
  height: 100px;
}

.content {
  padding: 32px 32px 0;
  .cell {
    font-size: 32px;
    margin-bottom: 30px;
    .cell_title {
      margin-bottom: 20px;
      font-weight: bold;
    }
    .cell_flex {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      margin-bottom: 0.6rem;

      .cell_Width {
        width: 48%;
        position: relative;
      }
    }
    .inputs {
      border: 1px solid #c8cfde;
      border-radius: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        width: 70%;
        height: 96px;
        border: none;
        background: none;
        padding-left: 24px;
      }
      p {
        padding-right: 12px;
        font-weight: 400;
      }
    }
  }
}

.popup-content {
  padding: 32px;
  font-size: 28px;
  .pop-title {
    font-size: 40px;
    color: #1b2945;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .pop-message {
    color: #fc7542;
    margin-bottom: 40px;
  }
  .pop-data {
    div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 32px;
      p:first-child {
        color: #999;
      }
      p:last-child {
        font-weight: bold;
      }
    }
  }
  .pop-button {
    margin-top: 60px;
  }
}

.error-text {
  font-size: 14px;
  position: absolute;
  bottom: -40px;
  color: red;
}
</style>
