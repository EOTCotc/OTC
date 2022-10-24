<template>
  <div>
    <white :title="title"></white>
    <div class="reminder">
      {{ $t("components.arbitration.again.form.title") }}
    </div>
    <div class="content">
      <div class="event">
        <p class="event_title">{{ $t("components.arbitration.again.form.event.title") }}</p>
        <div>
          <p
            v-for="(item, index) in days"
            :key="index"
            :class="item.show ? 'action' : ''"
            @click="oneClick(item)"
          >
            {{ item.day }}
          </p>
        </div>
      </div>
      <div class="text">
        <p>{{ $t("components.arbitration.again.form.event.label") }}</p>
        <van-field
          v-model="message"
          rows="2"
          :autosize="{ maxHeight: 150, minHeight: 150 }"
          type="textarea"
          maxlength="300"
          :placeholder="$t('components.arbitration.again.form.event.placeholder')"
          show-word-limit
        />
      </div>
      <div class="upimg">
        <p>{{ $t("components.arbitration.again.form.upload.title[0]") }}
          <span>({{ $t("components.arbitration.again.form.upload.title[1]") }})</span></p>
        <van-uploader
          v-model="fileList"
          :after-read="afterRead"
          preview-size="60"
          :max-count="6"
        />
      </div>
      <div class="add" v-if="stat == 1">
        <div class="addFlex">
          <p>{{ $t("components.arbitration.again.form.arbitrator.title") }}
            <span>({{ $t("components.arbitration.again.form.arbitrator.default") }}11{{ $t("components.arbitration.again.unit") }})</span>
          </p>
          <van-switch v-model="checked" @change="change()" />
        </div>
        <div v-if="checked" class="people" @click="showPicker = true">
          <p>{{ number }}</p>
          <p>{{ $t("components.arbitration.again.unit") }}</p>
        </div>
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </div>
      <div class="pay">
        <div>
          <p>{{ $t("components.arbitration.again.form.pay.title") }}</p>
          <p>{{ money }} EOTC</p>
        </div>
        <p class="explain">{{ explain }}</p>
      </div>
      <div class="footer">
        <van-button
          color="#1B2945"
          round
          block
          :disabled="message != '' || fileList.length > 0 ? false : true"
          @click="show = true"
        >
          {{ $t("components.arbitration.again.form.submit") }}
        </van-button>
      </div>
      <van-popup
        v-model="show"
        position="bottom"
        round
        @closed="checked = false"
      >
        <div class="pop">
          <p class="popTitle">{{ $t('components.arbitration.again.popup.title') }}</p>
          <p class="hint">
            {{ $t('components.arbitration.again.popup.text') }}
          </p>
          <van-checkbox v-model="checked" shape="square">{{ $t('components.arbitration.again.popup.checkbox') }}</van-checkbox>
          <div class="buttons">
            <van-button
              color="#1B2945"
              round
              block
              :disabled="checked ? false : true"
            >
              {{ $t('components.arbitration.again.popup.submit') }}
            </van-button>
            <p>{{ $t('components.arbitration.again.popup.cancel') }}</p>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import white from "@/components/Nav/white.vue";

export default {
  //申请再仲裁
  components: {white},
  data() {
    return {
      title: "",
      //文字信息
      message: "",
      days: [
        {
          day: this.$t('components.arbitration.again.form.event.type[0]'),
          show: true
        },
        {
          day: this.$t('components.arbitration.again.form.event.type[1]'),
          show: false
        }
      ],
      //图片上传
      fileList: [],
      //增加开关
      checked: false,
      //人数   增加默认人数
      number: 13,
      //增加人数弹出层
      showPicker: false,
      columns: [],
      show: false,

      stat: 0,
      explain: ""
    };
  },
  created() {
    this.stat = 1;
    if (this.stat == 1) {
      this.explain = `${this.$t('components.arbitration.again.form.pay.explain.again[0]')}500 EOTC，${this.$t('components.arbitration.again.form.pay.explain.again[1]')}11${this.$t('components.arbitration.again.unit')}，${this.$t('components.arbitration.again.form.pay.explain.again[2]')}10 EOTC`;
      this.title = this.$t('components.arbitration.again.navbar[0]');
      for (let i = 13; i <= 101; i += 2) {
        this.columns.push(i);
      }
    } else {
      this.explain = `${this.$t('components.arbitration.again.form.pay.explain.start[0]')}11${this.$t('components.arbitration.again.form.pay.explain.start[1]')}，${this.$t('components.arbitration.again.form.pay.explain.start[2]')}100 EOTC，${this.$t('components.arbitration.again.form.pay.explain.start[3]')}EOTC${this.$t('components.arbitration.again.form.pay.explain.start[4]')}`;
      this.title = this.$t('components.arbitration.again.navbar[1]');
    }
  },
  computed: {
    money() {
      if (this.stat == 0) {
        return 100;
      }
      if (!this.checked) {
        return 500;
      } else {
        return 500 + (this.number - 11) * 10;
      }
    }
  },

  methods: {
    oneClick(data) {
      if (data.show) {
        return;
      }
      for (let i of this.days) {
        i.show = false;
      }
      data.show = true;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
    },
    change() {
      if (this.checked) {
        this.number = 13;
      }
    },
    onConfirm(value) {
      this.number = value;
      this.showPicker = false;
    }
  }
};
</script>
<style lang="less" scoped>
.reminder {
  padding: 24px;
  color: #fc7542;
  background: #fffbe8;
  font-size: 28px;
}
.content {
  padding: 32px 32px 60px;
  font-size: 28px;
  .event {
    margin-bottom: 40px;
    .event_title {
      font-size: 32px;
      margin-bottom: 30px;
      white-space: pre-wrap;
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
  .text {
    margin-bottom: 40px;
    p {
      font-size: 32px;
      //   font-weight: bold;
      margin-bottom: 20px;
    }
    /deep/ .van-cell {
      border: 1px solid #c8cfde;
      border-radius: 20px;
    }
  }
  .upimg {
    margin-bottom: 40px;
    p:first-child {
      font-size: 32px;
      margin-bottom: 20px;
      span {
        font-size: 28px;
        color: #999;
      }
    }
  }
  .add {
    margin-bottom: 80px;
    .addFlex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 32px;
        span {
          font-size: 28px;
          color: #999;
        }
      }
    }
    .people {
      display: flex;
      justify-content: space-between;
      padding: 28px 32px;
      margin-top: 40px;
      border-radius: 8px;
      border: 0.5px solid #c8cfde;
    }
  }
  .pay {
    div {
      display: flex;
      justify-content: space-between;
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 45px;
      p:last-child {
        color: #fc7542;
      }
    }
    .explain {
      color: #999;
    }
  }
  .footer {
    margin-top: 80px;
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
