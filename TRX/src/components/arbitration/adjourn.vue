<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <div class="reason">
        <p>{{ $t('components.arbitration.adjourn.form.title') }}</p>
        <van-radio-group v-model="form.data.reason">
          <van-radio :name="0">{{ $t('components.arbitration.adjourn.form.status[0]') }}</van-radio>
          <van-radio :name="1">{{ $t('components.arbitration.adjourn.form.status[1]') }}</van-radio>
          <van-radio :name="2">{{ $t('components.arbitration.adjourn.form.status[2]') }}</van-radio>
          <van-radio :name="3">{{ $t('components.arbitration.adjourn.form.status[3]') }}</van-radio>
        </van-radio-group>
      </div>
      <div class="explain">
        <p>{{ $t('components.arbitration.adjourn.explain.title') }}</p>
        <van-field
          v-model="form.data.explain"
          rows="2"
          :autosize="{ maxHeight: 150, minHeight: 150 }"
          type="textarea"
          maxlength="3000"
          :placeholder="$t('components.arbitration.adjourn.explain.placeholder')"
          show-word-limit
        />
      </div>
      <div class="time">
        <p class="time-title">{{ $t('components.arbitration.adjourn.time.title') }}</p>
        <div>
          <p
            v-for="item in 7"
            :key="item"
            :class="{'action': form.data.day === item}"
            @click="form.data.day = item"
          >
            {{ item }}{{$t('components.arbitration.adjourn.time.day')}}
          </p>
        </div>
      </div>
      <div class="pay">
        <div>
          <p>{{ $t('components.arbitration.adjourn.pay.label') }}</p>
          <p>1100 USDT</p>
        </div>
        <p>{{ $t('components.arbitration.adjourn.pay.text') }}1100~2200 EOTC</p>
      </div>
      <div class="footer">
        <van-button
          color="#1B2945"
          round
          block
          :disabled='disabled'
          @click="show = true"
        >
          {{ $t('components.arbitration.adjourn.submit.button') }}
        </van-button>
      </div>
      <van-popup
        v-model="show"
        round
        position="bottom"
        @closed="checked=false">
        <div class="pop">
          <p class="popTitle">{{ $t('components.arbitration.adjourn.popup.title') }}</p>
          <p class="hint">
            {{ $t('components.arbitration.adjourn.popup.text') }}
          </p>
          <van-checkbox v-model="checked" shape="square">{{ $t('components.arbitration.adjourn.popup.checkbox') }}</van-checkbox>
          <div class="buttons">
            <van-button
              color="#1B2945"
              round
              block
              :disabled="!checked"
              @click='onSubmit'
            >
              {{ $t('components.arbitration.adjourn.popup.submit') }}
            </van-button>
            <p @click='reset'>{{ $t('components.arbitration.adjourn.popup.cancel') }}</p>
          </div>
        </div></van-popup
      >
    </div>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
import {delay} from "@/api/arbitration"
import {
  $loading,
  $toast
} from '@/utils/utils'
//申请延期
export default {
  components: {
    white,
  },
  data() {
    return {
      title: this.$t('components.arbitration.adjourn.navbar'),
      checked: false,
      show: false,
      form: {
        data: {
          arbitrateInfoId: null,
          reason: null,
          explain: "",
          day: 1,
          isArbitrate: 0
        }
      }
    };
  },
  created() {
    this.form.data.arbitrateInfoId = this.$route.query.id
  },
  computed: {
    disabled() {
      return Object.values(this.form.data).includes('')
    }
  },
  methods: {
    reset() {
      this.show = false
      this.checked = false
    },
    onSubmit() {
      const loading = $loading(this.$t('components.arbitration.adjourn.form.submit.loading'))
      delay(this.form.data).then(res => {
        $toast('success', this.$t('components.arbitration.adjourn.form.submit.success'), () => this.$router.go(-1))
      }).catch(err => {
        $toast('fail', err.message || this.$t('components.arbitration.adjourn.form.submit.fail'))
      }).finally(() => {
        loading.clear()
      })
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  font-size: 28px;
  padding: 32px 32px 60px;
  .reason {
    margin-bottom: 45px;
    p {
      margin-bottom: 30px;
    }
    /deep/.van-radio:not(:last-child) {
      margin-bottom: 36px;
    }
  }
  .explain {
    margin-bottom: 40px;
    p {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    /deep/.van-cell {
      border: 1px solid #c8cfde;
      border-radius: 20px;
    }
  }
  .time {
    margin-bottom: 60px;
    .time-title {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 24px;
    }
    div {
      display: flex;
      flex-wrap: wrap;
      .action {
        background: #fff;
        border: 2px solid #237ff8;
        color: #237ff8;
      }
      p {
        width: 140px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background: #f3f4f5;
        border: 2px solid #f3f4f5;
        border-radius: 8px;
        margin: 0 24px 20px 0;
      }
    }
  }
  .pay {
    margin-bottom: 278px;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 32px;
      margin-bottom: 40px;
      p:first-child {
        font-weight: bold;
      }
      p:last-child {
        font-weight: bold;
        color: #fc7542;
      }
    }
    p:last-child {
      color: #999;
    }
  }
  .pop {
    padding: 32px 32px 40px;
    .popTitle {
      font-size: 40px;
      font-weight: bold;
      margin-bottom: 30px;
      color: #1b2945;
    }
    .hint {
      color: #f37a4c;
      margin-bottom: 40px;
    }
    .buttons {
      margin-top: 40px;
      button {
        margin-bottom: 40px;
      }
      p {
        text-align: center;
        color: #666;
      }
    }
  }
}
</style>