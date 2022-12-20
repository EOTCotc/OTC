<template>
  <div class="set-purchase-container">
    <Navwhite :title="title"></Navwhite>
    <div class="content">
      <div class="cell">
        <p class="cell_title">{{ $t("views.operation.chase.number") }}</p>
        <div class="inputs">
          <input
            type="number"
            v-model="number"
            @blur="onNumInput($event)"
            :placeholder="$t('views.operation.chase.placeholder[0]')"
          />
          <p style="color: #237ff8" >{{ coin.coinType }}</p>
        </div>
      </div>
      <div class="cell">
        <p class="cell_title">{{ $t("views.operation.chase.price") }}</p>
        <div class="inputs">
          <input
            type="number"
            v-model="price"
            @blur="onPriceInput(coinType.floor,coinType.ceiling , $event,coin.coinType)"
            :placeholder="
              $t('views.operation.chase.placeholder[1]') +
              coin.coinType +
              $t('views.operation.chase.placeholder[2]')
            "
          />
          <p>CNY</p>
        </div>
      </div>

      <div class="cell">
        <p class="cell_title">{{ $t("views.operation.chase.cell_title") }}</p>
        <div class="cell_flex">
          <div class="inputs cell_Width">
            <input
              type="number"
              :disabled="hasInput"
              v-model="MinLegalTender"
              @blur="onMinLegalTender"
              :placeholder="$t('views.operation.chase.placeholder[3]')"
            />
            <p>CNY</p>
            <span v-if="eror[0]" class="error-text">{{
                $t("views.operation.chase.error_text")
              }}</span>
          </div>
          <div class="inputs cell_Width">
            <input
              type="number"
              :disabled="hasInput"
              v-model="MinDigitalCash"
              @blur="onMinDigitalCash"
              :placeholder="$t('views.operation.chase.placeholder[3]')"
            />
            <p>{{ coin.coinType }}</p>
            <span v-if="eror[1]" class="error-text">{{
                $t("views.operation.chase.error_text")
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
              :placeholder="$t('views.operation.chase.placeholder[4]')"
            />
            <p>CNY</p>
            <span v-if="eror[2]" class="error-text">{{
                $t("views.operation.chase.error_text")
              }}</span>
          </div>
          <div class="inputs cell_Width">
            <input
              type="number"
              :disabled="hasInput"
              v-model="MaxDigitalCash"
              @blur="onMaxDigitalCash"
              :placeholder="$t('views.operation.chase.placeholder[4]')"
            />
            <p>{{ coin.coinType }}</p>
            <span v-if="eror[3]" class="error-text">{{
                $t("views.operation.chase.error_text")
              }}</span>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <h6>{{ $t("views.operation.chase.deal") }}</h6>
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
              $t("views.operation.chase.adopt")
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
              $t("views.operation.chase.adopt")
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
        type="primary"
        block
        round
        @click="popswitch"
        :disabled="vali_value"
      >{{ $t("views.operation.chase.create") }}</van-button
      >
    </div>

    <van-popup
      class="popup"
      :close-on-click-overlay="isclose_on_click_overlay"
      v-model="popshow"
      @close="close"
      round
      closeable
      position="bottom"
    >
      <div class="popup-content">
        <p class="pop-title">{{ $t("views.operation.chase.sure") }}</p>
        <p class="pop-message">{{ $t("views.operation.chase.current") }}</p>
        <div class="pop-data">
          <div>
            <p>{{ $t("views.operation.chase.price") }}</p>
            <p>{{ price }} CNY</p>
          </div>
          <div>
            <p>{{ $t("views.operation.chase.number") }}</p>
            <p>{{ number }} {{ coin.coinType }}</p>
          </div>
          <div>
            <p>{{ $t("views.operation.chase.cell_title") }}</p>
            <p>{{ MinLegalTender }} CNY ~ {{ MaxLegalTender }} CNY</p>
          </div>
          <div>
            <p>{{ $t("views.operation.chase.cell_title") }}</p>
            <p>
              {{ MinDigitalCash }} {{ coin.coinType }} ~ {{ MaxDigitalCash }} {{ coin.coinType }}
            </p>
          </div>
        </div>

        <van-checkbox shape="square" v-model="checked">{{
            $t("views.operation.chase.check")
          }}</van-checkbox>
        <van-button
          class="pop-button"
          @click="jump()"
          round
          color="#1B2945"
          block
          :disabled="!checked"
        >{{ $t("views.operation.chase.affirm") }}</van-button
        >
      </div>
    </van-popup>

    <!-- <van-popup v-model="kindShow" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup> -->
  </div>
</template>

<script>
import Navwhite from "@/components/Nav/white.vue";
import currency_mixin from "@/mixins/currency_mixins";
import loadingToast from "@/components/loading-toast";
import { addOrder } from "@/api/trxRequest";

export default {
  name: "setpur-chase", //挂收购单
  components: {
    Navwhite,
  },
  mixins: [currency_mixin],
  data() {
    return {
      hasInput: true,
      title: this.$t("views.operation.chase.title"),

      // kindShow: false,
      // kind: "USDT",
      // columns: ["USDT", "USDC", "BTC", "ETH", "BNB"],
      coin: '',
      address: '',
      coinType: '',
    };
  },
  created() {
    this.coin = this.$route.params
    let coinList = JSON.parse(localStorage.getItem('coinList'))
    for (let i of coinList) {
      if (i.id == this.coin.coinID) this.coinType = i
    }
  },
  methods: {
    //生成收购单
    async jump() {
      this.$toast.warning(
        {
          component: loadingToast,
          props: {
            title: this.$t("views.operation.chase.create_title"),
          },
        },
        {
          icon: false,
          timeout: false,
        }
      );
      this.isclose_on_click_overlay = false;
      try {
        const { data } = await addOrder({
          cny: this.price,
          num: this.number,
          amount1: this.MinLegalTender,
          amount2: this.MaxLegalTender,
          cash: this.cash,
          coinID: this.coin.coinID,
        });
        this.$toast.clear();
        if (data.State === "1") {
          this.$toast.error(
            <div>
              <p style="font-size:14px;margin:5px">
                {this.$t("views.operation.chase.exceed")}
              </p>
            </div>,
            {
              timeout: 3000,
            }
          );
          this.isclose_on_click_overlay = true;
          return false;
        }
        if(data.State === '-1'){
          this.$toast.error(
            <div>
              <p style="font-size:14px;margin:5px">请优先完成出售订单，再来挂收购单！</p>
            </div>,
            {
              timeout: 3000,
            }
          )
          this.isclose_on_click_overlay = true
          return false
        }
        this.$router.replace({
          name: "order-Ticket",
          params: {
            method: "buy",
          },
        });
      } catch (err) {
        console.warn(err);
        this.$toast.error(this.$t("views.operation.chase.toast"));
      }
      this.isclose_on_click_overlay = true;
    },
  },
};
</script>

<style lang="less" scoped>
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999;
}

.error-text {
  font-size: 14px;
  position: absolute;
  bottom: -40px;
  color: red;
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
.popup {
  .popup-content {
    padding: 32px;
    font-size: 28px;
    .pop-title {
      font-size: 40px;
      color: #1b2945;
      font-weight: bold;
      margin-bottom: 30px !important;
    }
    .pop-message {
      color: #fc7542;
      margin-bottom: 40px !important;
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
}
</style>
