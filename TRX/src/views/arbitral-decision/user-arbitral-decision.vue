<template>
  <div class="arbitral-decision">
    <!-- 买家用户 发起仲裁页面 -->
    <header class="header">
      <van-icon name="arrow-left" />
      <span class="hd-txt" @click="$router.go(-1)">
        {{ $t("views.arbitral.hd_txt") }}
      </span>
    </header>
    <main class="arbitral-main-container">
      <section class="arbitral-type">
        <div class="arbitral-evens">{{ $t("views.arbitral.evens") }}</div>
        <div>
          <van-button
            :class="{ 'active-btn-type': isActive }"
            @click="changeArbitral"
          >{{ $t("views.arbitral.not_received") }}</van-button
          >
          <van-button
            :class="{ 'active-btn-type': !isActive }"
            @click="changeDecision"
          >{{ $t("views.arbitral.other") }}</van-button
          >
        </div>
      </section>

      <section class="arbitral-evidence">
        <div class="evidence">{{ $t("views.arbitral.evidence") }}</div>

        <!-- 点击其他可以输入内容 -->
        <p v-if="!isActive" class="textAre">
          <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="80"
            show-word-limit
          />
        </p>
        <!-- 文件上传 -->
        <p>
          <van-uploader
            v-model="fileList"
            :after-read="afterRead"
            :max-count="2"
            :upload-text="$t('views.arbitral.upload_text')"
            preview-size="150px"
            capture="camera"
            :multiple="true"
          >
          </van-uploader>
        </p>
      </section>

      <article class="arbitral-info">
        {{ $t("views.arbitral.arbitral_info") }}
      </article>

      <p :style="{ color: 'rgb(252, 184, 66)' }">
        {{ $t("views.arbitral.tips") }}
      </p>
    </main>
    <footer class="footer">
      <van-button round :disabled="!alreadyEvidenced">
        {{ $t("views.arbitral.submit") }}
      </van-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "user-arbitral-decision",
  data() {
    return {
      isActive: true,
      fileList: [],
      message: "",
      alreadyEvidenced: false, //是否已经上传 证据
    };
  },
  methods: {
    changeArbitral() {
      this.isActive = true;
    },
    changeDecision() {
      this.isActive = false;
    },
    afterRead(file) {
      file.status = "uploading";
      file.message = this.$t("views.arbitral.message[0]");

      setTimeout(() => {
        file.status = "success";
        file.message = this.$t("views.arbitral.message[1]");
        this.alreadyEvidenced = true;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}

/deep/ .van-uploader__upload {
  width: 9.13333rem !important;
  height: 4.13333rem !important;
  border-radius: 20px !important;
  border: 2px dashed #999 !important;
}
.textAre {
  border: 2px solid #eee;
  border-radius: 10px;
}

.arbitral-decision {
  position: fixed;
  z-index: 99;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    align-items: center;
    padding: 25px 25px;
    font-size: 0.45rem;
    margin-bottom: 15px;
    border-bottom: 2px solid #eee;
    .hd-txt {
      font-weight: 700;
      flex: 1;
      text-align: center;
    }
  }
  .arbitral-main-container {
    font-size: 0.4rem;
    padding: 15px 25px 0 25px;

    // 仲裁类型
    .arbitral-type {
      .arbitral-evens {
        margin-bottom: 15px;
      }
      .van-button {
        height: 0.9rem;
        width: 2.5rem;
        border-radius: 15px;
        line-height: 0.9rem;
      }
      button:first-child {
        margin-right: 20px;
      }
      .active-btn-type {
        border: 5px solid rgb(104, 160, 210);

        color: rgb(104, 160, 210);
      }
    }

    // 仲裁证据
    .arbitral-evidence {
      .evidence {
        padding: 35px 0 10px 0;
      }
    }
    .arbitral-info {
      color: var(--main-test-color);
    }
  }
  .footer {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 25px 100px 25px;
    justify-content: flex-end;

    button {
      background-color: var(--main--color);
      color: #fff;
      font-weight: 700;
    }
  }
}
</style>