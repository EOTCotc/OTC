<template>
  <div>
    <van-nav-bar
      :title="title"
      :left-text="$t('views.appeal.left_text')"
      left-arrow
      @click-left="$router.go(-2)"
    />
    <!-- <div class="reminder">
      特别提示:
      伪造变造打款凭证是严重违法行为，如提交相关查询密码请注意保证个人资产安全
    </div>-->
    <div class="content">
      <div class="event">
        <p class="event_title">{{ $t("views.appeal.event_title") }}</p>
        <div>
          <p
            v-for="(item, index) in days"
            :key="index"
            :class="item.show ? 'action' : ''"
            @click="oneClick(item, index)"
          >
            {{ item.day }}
          </p>
        </div>
      </div>
      <div class="text">
        <p>{{ $t("views.appeal.text") }}</p>
        <van-field
          v-model="message"
          rows="2"
          :autosize="{ maxHeight: 150, minHeight: 150 }"
          type="textarea"
          maxlength="120"
          :placeholder="$t('views.appeal.van_field')"
          show-word-limit
        />
      </div>
      <div class="hint">
        <p>
          {{ $t("views.appeal.lint") }}
        </p>
      </div>

      <div class="footer">
        <van-button
          color="#1B2945"
          round
          block
          :disabled="message != '' || fileList.length > 0 ? false : true"
          @click="sumbit()"
          >{{ $t("views.appeal.submit") }}</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { Petition } from "@/api/trxRequest";
export default {
  //发起申诉
  data() {
    return {
      title: this.$t("views.appeal.title"),
      //文字信息
      message: "",
      days: [
        { day: this.$t("views.appeal.day[0]"), show: true },
        { day: this.$t("views.appeal.day[1]"), show: false },
        { day: this.$t("views.appeal.day[2]"), show: false },
      ],
      //图片上传
      fileList: [],
      columns: [],
      show: false,
      type: 0,

      stat: 0,
      explain: "",
      info: "",
    };
  },
  mounted() {
    this.stat = 1;
    this.info = this.$route.params.MerchanInfo;
    console.log(this.info);
  },
  computed: {},

  methods: {
    oneClick(data, index) {
      console.log(index);
      // if (data.show) {
      //   return
      // }
      for (let i of this.days) {
        i.show = false;
      }
      data.show = true;
      this.type = index;
    },
    sumbit() {
      Toast.loading({
        message: this.$t("views.appeal.message"),
        forbidClick: true,
        duration: 0,
      });
      Petition({
        oid: this.info.odid,
        type: this.type,
        msg: this.message,
      }).then((res) => {
        Toast.clear();
        let data = res.data.Code;
        if (data > 0) {
          this.$toast.success(this.$t("views.appeal.success[0]"));
          setTimeout(() => {
            this.$router.push({ name: "index" });
          }, 5000);
        } else {
          this.$toast.success(this.$t("views.appeal.success[1]"));
        }
      });
    },
  },
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
        // width: 140px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background: #f3f4f5;
        padding: 0 20px;
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
    /deep/.van-cell {
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
  .hint {
    color: #f37a4c;
    margin-bottom: 40px;
  }
}
</style>
