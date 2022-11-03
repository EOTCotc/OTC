<template>
  <div class="content">
    <p class="title">{{ $t('components.accountstate.identity.form.title') }}</p>
    <van-form
      v-if="homeShow"
      validate-first
      @failed="onFailed"
      @submit="onSubmit"
    >
      <van-cell-group class="field" :border="false">
        <van-field
          v-model="name"
          :border="false"
          :label="$t('components.accountstate.identity.form.name.label')"
          name="name"
          :placeholder="$t('components.accountstate.identity.form.name.placeholder')"
          :rules="[{ validator: nameRule, message: $t('components.accountstate.identity.form.name.message') }]"
        />
        <van-field
          v-model="phone"
          :border="false"
          type="number"
          name="phone"
          :label="$t('components.accountstate.identity.form.phone.label')"
          maxlength="11"
          :placeholder="$t('components.accountstate.identity.form.phone.placeholder')"
          :rules="[{ validator: phoneRule, message: $t('components.accountstate.identity.form.phone.message') }]"
        />
        <van-field
          v-model="ID"
          :border="false"
          :label="$t('components.accountstate.identity.form.id.label')"
          name="ID"
          maxlength="18"
          :placeholder="$t('components.accountstate.identity.form.id.placeholder')"
          :rules="[{ validator: IDRule, message: $t('components.accountstate.identity.form.id.message') }]"
        />
      </van-cell-group>
      <van-button round block native-type="submit" color="#1B2945"
        >{{ $t('components.accountstate.identity.form.next') }}</van-button
      >
    </van-form>
    <div v-else-if="personShow">
      <p class="secondary">{{ $t('components.accountstate.identity.portrait.title') }}</p>
      <div class="sample">
        <img src="@/static/sample-picture/obverse.png" alt="" />
      </div>

      <p class="secondary">{{ $t('components.accountstate.identity.portrait.text') }}</p>
      <div class="idcard">
        <van-uploader
          multiple
          v-model="fileList"
          name="1"
          :after-read="afterRead"
          :max-count="1"
        >
          <template #default>
            <div class="upload">
              <div class="upload_text">
                <i class="iconfont icon-paizhao"></i>
                <p>{{ $t('components.accountstate.identity.portrait.button') }}</p>
              </div>
            </div>
          </template>
        </van-uploader>
        <p class="hint">{{$t('components.accountstate.identity.portrait.tip[0]')}}</p>
      </div>
      <div class="audit" v-if="url != ''">
        <van-image
          class="left"
          @click="imgStatic(0)"
          :src="url"
          fit="cover"
          alt=""
        >
          <div></div>
        </van-image>
        <van-image
          class="right"
          @click="imgStatic(1)"
          :src="url"
          fit="cover"
          alt=""
        >
          <div></div>
        </van-image>
        <van-notice-bar
          wrapable
          :scrollable="false"
          :text="$t('components.accountstate.identity.portrait.tip[1]')"
        />

        <van-image-preview
          v-model="imgShow"
          :images="images"
          :show-index="false"
        >
          <template v-slot:cover>
            <div
              @click="imgShow = false"
              :class="show ? 'shade-left' : 'shade-right'"
            ></div>
          </template>
        </van-image-preview>
      </div>

      <van-button
        round
        block
        color="#1B2945"
        :disabled="fileList.length != 0 ? false : true"
        @click="updata(fileList)"
        >{{ $t('components.accountstate.identity.next') }}</van-button
      >
    </div>
    <div v-else-if="countryShow">
      <p class="secondary">{{ $t('components.accountstate.identity.national.title') }}</p>
      <div class="sample">
        <img src="@/static/sample-picture/reverse.png" alt="" />
      </div>

      <p class="secondary">{{ $t('components.accountstate.identity.national.text') }}</p>
      <div class="idcard">
        <van-uploader
          multiple
          v-model="fileList1"
          name="2"
          :after-read="afterRead"
          :max-count="1"
        >
          <template #default>
            <div class="upload">
              <div class="upload_text">
                <i class="iconfont icon-paizhao"></i>
                <p>{{ $t('components.accountstate.identity.national.button') }}</p>
              </div>
            </div>
          </template>
        </van-uploader>
        <p class="hint">{{$t('components.accountstate.identity.national.tip[0]')}}</p>
      </div>
      <van-button
        round
        block
        color="#1B2945"
        :disabled="fileList1.length != 0 ? false : true"
        @click="updata(fileList1)"
        >{{ $t('components.accountstate.identity.next') }}</van-button
      >
    </div>
    <div v-else-if="handShow">

      <p class="secondary">{{ $t('components.accountstate.identity.handHeld.title') }}</p>
      <div class="sample">
        <img src="@/static/sample-picture/hand.png" alt="" />
      </div>

      <p class="secondary">{{ $t('components.accountstate.identity.handHeld.text') }}</p>
      <div class="idcard">
        <van-uploader
          multiple
          v-model="fileList2"
          name="3"
          :after-read="afterRead"
          :max-count="1"
        >
          <template #default>
            <div class="upload">
              <div class="upload_text">
                <i class="iconfont icon-paizhao"></i>
                <p>{{ $t('components.accountstate.identity.handHeld.button') }}</p>
              </div>
            </div>
          </template>
        </van-uploader>
        <p class="hint">{{$t('components.accountstate.identity.handHeld.tip[0]')}}</p>
      </div>
      <!-- <div class="footer"> -->
      <van-button
        round
        block
        color="#1B2945"
        :disabled="fileList2.length != 0 ? false : true"
        @click="updata(fileList2)"
        >{{ $t('components.accountstate.identity.submit.button') }}</van-button
      >
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { Toast, Notify, ImagePreview } from "vant";
import { SetUID, Update } from "@/api/trxRequest";
import { userSign } from "@/utils/web3";
export default {
  name: "identity",
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
  },
  data() {
    return {
      name: "",
      phone: "",
      ID: "",
      fileList: [],
      fileList1: [],
      fileList2: [],

      homeShow: true,
      personShow: false,
      countryShow: false,
      handShow: false,

      sign: "",

      url: "",
      images: [],
      imgShow: false,
      show: false,
    };
  },
  mounted() {
    //签名
    this.sign = localStorage.getItem("mysign");
    if (this.sign == null || this.sign == "") {
      userSign(window.signMes, null);
    }
  },
  methods: {
    afterRead(File) {
      this.$reduce(File, 0).then((data) => {
        File.file = data.fileZip;
        this.url = data.base64;
        this.images = [data.base64];
      });
    },
    nameRule(val) {
      return /^.{2,20}$/.test(val);
    },
    phoneRule(val) {
      let num = val.length;
      if (num > 4 && num < 11) {
        return true;
      } else if (num == 11) {
        return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          val
        );
      } else {
        return false;
      }
    },
    IDRule(val) {
      let num = val.length;
      if (num > 6 && num < 19) {
        return true;
      } else if (num == 18) {
        return /^[1-8]{2}[0-9]{4}[0-9]{4}((0[1-9]{1})|(1[0-2]{1}))((0[1-9]{1})|(1[0-9]{1})|(2[0-9]{1})|(3[0-1]{1}))[0-9]{3}[0-9xX]{1}$/.test(
          val
        );
      } else {
        return false;
      }
    },
    //表单验证失败
    onFailed(errorInfo) {
      Toast.fail(errorInfo.errors[0].message);
    },
    // 表单验证成功
    onSubmit(values) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: this.$t('global.loading'),
      });
      SetUID({
        username: this.name,
        myzd: this.phone,
        ccid: this.ID,
        sign: this.sign,
      })
        .then((data) => {
          let datas = data.data.State;
          if (datas != "-1") {
            Toast.clear();
            this.homeShow = false;
            this.personShow = true;
          } else {
            Toast.clear();
            Notify({ type: "danger", message: this.$t('components.accountstate.identity.validate.error') });
          }
        })
        .catch((err) => {});
    },
    updata(item) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: this.$t('global.loading'),
      });
      let yanzheng;
      if (this.personShow) {
        yanzheng = 1;
      } else if (this.countryShow) {
        yanzheng = 2;
      } else if (this.handShow) {
        yanzheng = 3;
      }

      var fd = new FormData();
      fd.append("uid", localStorage.getItem("uid"));
      fd.append("ctype", yanzheng);
      fd.append("proof", item[0].file);
      fd.append("sign", this.sign);

      Update(fd).then((res) => {
        Toast.clear();
        let state = res.data.State;
        if (state != "x") {
          if (yanzheng == 1) {
            this.personShow = false;
            this.countryShow = true;
          }
          if (yanzheng == 2) {
            this.countryShow = false;
            this.handShow = true;
          }
          if (yanzheng == 3) {
            this.$router.push({ name: "index" });
          }
        } else {
          Toast.fail(this.$t('components.accountstate.identity.submit.error'));
        }
      });
    },
    imgStatic(index) {
      if (index == 0) {
        this.show = true;
      } else {
        this.show = false;
      }
      this.imgShow = true;
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  padding: 32px;
  /deep/.van-cell {
    padding-left: 0;
    padding-right: 0;
  }
  p {
    font-size: 28px;
    font-weight: bold;
  }
  .title {
    font-size: 40px;
    padding-bottom: 40px;
  }

  .field {
    padding-bottom: 40px;
  }
  .secondary {
    padding-bottom: 30px;
  }
  .sample {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    img {
      width: 80%;
    }
  }
  .idcard {
    padding-bottom: 40px;
    /deep/.van-uploader__preview-image {
      width: 686px;
      height: 340px;
    }
    /deep/.van-uploader__preview {
      margin: 0;
    }
    .hint {
      margin-top: 10px;
      font-weight: normal;
      color: #fc7542;
    }
    .upload {
      width: 686px;
      height: 340px;
      border: 1px dashed #eeeeee;
      border-radius: 20px;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      .upload_text {
        text-align: center;
        color: #999;
        i {
          font-size: 48px;
        }
        p {
          margin-top: 14px;
          font-weight: normal;
        }
      }
    }
  }
  .audit {
    margin-bottom: 30px;
    .left,
    .right {
      border-radius: 10px;
      overflow: hidden;
    }
    .left {
      width: 200px;
      margin-right: 20px;
      position: relative;
      div {
        width: 60%;
        height: 100%;
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
        position: absolute;
        top: 0;
      }
    }
    .right {
      width: 200px;
      position: relative;
      div {
        width: 40%;
        height: 100%;
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
.shade-left {
  width: 60vw;
  height: 100vh;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.shade-right {
  position: absolute;
  left: 40vw;
  width: 40vw;
  height: 100vh;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
</style>>

