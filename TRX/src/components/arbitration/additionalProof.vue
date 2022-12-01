<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <div class="text">
        <p>{{ $t('components.arbitration.additionalProof.form.text.title') }}</p>
        <van-field
          v-model="message"
          rows="2"
          :autosize={maxHeight:192}
          type="textarea"
          maxlength="3000"
          :placeholder="$t('components.arbitration.additionalProof.form.text.placeholder')"
          show-word-limit
        />
        <p>{{ $t('components.arbitration.additionalProof.form.text.text') }}</p>
      </div>
      <div class="image">
        <p>{{ $t('components.arbitration.additionalProof.form.upload.title') }}</p>
        <van-uploader
          v-model="fileList"
          :after-read="afterRead"
          preview-size=100
          :max-count="6"
        />
        <p>{{ $t('components.arbitration.additionalProof.form.upload.text') }} </p>
      </div>
      <div class="stance">

      </div>
      <div class="button">
        <van-button color="#1B2945" round block>
          {{ $t('components.arbitration.additionalProof.form.submit') }}
        </van-button>
    </div>
    </div>
    
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
export default {
  //追加举证
  components: {
    white,
  },
  data() {
    return {
      title: this.$t('components.arbitration.additionalProof.navbar'),
      message: "",
      fileList: [],
    };
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 32px 32px 60px;
  font-size: 28px;
  .text {
    margin-bottom: 40px;
    p:first-child {
      font-size: 32px;
      margin-bottom: 20px;
    }
    /deep/.van-cell {
      border: 1px solid #c8cfde;
      border-radius: 20px;
    }
    p:last-child {
      margin-top: 20px;
      color: #999;
    }
  }
  .image {
    p {
      white-space: pre-wrap;
    }
    p:first-child {
      font-size: 32px;
      margin-bottom: 20px;
    }
    p:last-child{
        margin-top: 60px;
        color: #FC7542;
    }
  }
  .button{
    width: 90%;
    position: fixed;    
    bottom: 60px;
    left: 5%;
  }
  .stance{
    width: 100%;
    height: 156px;
  }
}
</style>