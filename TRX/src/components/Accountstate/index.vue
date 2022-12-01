<template>
  <div class="content">
    <p>{{ $t('components.accountstate.account.title') }}</p>
    <div class="text">
      <!-- <van-uploader
        v-model="fileList"
        :after-read="afterRead"
        :preview-image="false"
      > -->
      <van-cell :title="$t('components.accountstate.account.content.avatar.label')" :value="$t('components.accountstate.account.content.avatar.value')" is-link>
        <template #default>
          <div class="img_flex">
            <div class="img_bg">
              <img :src="url" alt="" />
            </div>
          </div>
        </template>
      </van-cell>
      <!-- </van-uploader> -->

      <van-cell :title="$t('components.accountstate.account.content.email.label')" :value="email" />
      <van-cell title="UID" :value="uid">
        <template #right-icon>
          <i class="iconfont icon-fuzhi icon" @click="handleCopy(uid)"></i>
        </template>
      </van-cell>
      <van-cell :title="$t('components.accountstate.account.content.node.label')" :value="item" />
      <van-cell :title="$t('components.accountstate.account.content.telegram.label')" is-link @click="show = true" />
      <van-cell :title="$t('components.accountstate.account.content.walletAddress.label')">
        <template #default>
          <div class="van-ellipsis">{{ briefMyAddress(address) }}</div>
        </template>
        <template #right-icon>
          <i
            class="iconfont icon-fuzhi icon"
            @click="handleCopy(sureaddress)"
          ></i>
        </template>
      </van-cell>
      <van-cell title="" is-link :value="$t('components.accountstate.account.content.signOut.button')" @click="outshow = true" />
      <van-dialog
        v-model="outshow"
        show-cancel-button
        :title="$t('components.accountstate.account.content.signOut.title')"
        :message="$t('components.accountstate.account.content.signOut.message')"
        @confirm="logout"
      >
      </van-dialog>

      <van-dialog
        v-model="show"
        show-cancel-button
        :title="$t('components.accountstate.account.content.setting.title')"
        @confirm="setSure"
        :before-close="beforeClose"
      >
        <template #default>
          <div class="setTelegram">
            <van-cell-group :border="false">
              <van-field
                v-model="value"
                clearable
                :placeholder="$t('components.accountstate.account.content.setting.placeholder')"
              />
            </van-cell-group>
          </div>
        </template>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
import { UserInfo } from "@/utils/web3";
import { SetTelegram } from "@/api/trxRequest";

import { clearmymes } from "@/api/payverification";

export default {
  //账号信息
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      fileList: [],

      email: "",
      address: "",
      sureaddress: "",
      uid: "",

      url: require("@/static/image/head.png"),

      item: "",

      outshow: false,
      show: false,

      value: "",
    };
  },
  mounted() {
    this.userData();
  },
  methods: {
    logout() {
      clearmymes();
      this.$router.push({
        name: "login",
      });
    },
    handleCopy(val) {
      this.$copyText(val)
        .then(() => {
          Toast(this.$t('global.copy.success'));
        })
        .catch(() => {
          Toast(this.$t('components.accountstate.account.content.signOut.title'));
        });
    },
    afterRead(Fail) {
      this.url = Fail.content;
    },
    userData() {
      let asd = UserInfo();
      if (asd.item == this.$t('components.accountstate.account.userData')) {
        this.item = "A0";
      } else {
        this.item = asd.item;
      }
      this.email = asd.email;
      this.uid = asd.uid;
      this.sureaddress = asd.myaddress;
      this.address =
        asd.myaddress.substring(0, 10) +
        "..." +
        asd.myaddress.substring(
          asd.myaddress.length - 10,
          asd.myaddress.length
        );
      this.init();
    },
    init() {
      SetTelegram({}).then((res) => {
        if (res.data.State != "") {
          this.value = res.data.State;
        }
      });
    },
    //确定设置电报群
    setSure() {
      let show = /^\d{16,50}$/.test(this.value);
      if (show) {
        SetTelegram({ telegram: this.value }).then((res) => {
          let data = res.data;
          if (data.State == "1") {
            this.$toast.success(this.$t('components.accountstate.account.setTelegram.success'));
          }
        });
      } else {
        this.$toast.warning(this.$t('components.accountstate.account.setTelegram.fail'));
        this.value = "";
      }
      // console.log(show)
    },

    beforeClose(action, done) {
      if (action === "confirm") {
        if (this.value == "") {
          done(false);
          return;
        }
      }
      done();
      // }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.van-cell__value {
  overflow: visible;
}
.icon {
  font-size: 32px;
}
.content {
  padding-top: 32px;
  p {
    padding: 0 32px 40px;
    font-size: 40px;
    font-weight: bold;
    color: #1b2945;
  }
  .text {
    font-size: 28px;
    color: #333 !important;
    /deep/.van-uploader__input-wrapper {
      width: 100vw;
    }
    .img_flex {
      display: flex;
      justify-content: flex-end;
      .img_bg {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        overflow: hidden;
        // background: #1b2945;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    // .pop {
    //   background: #f3f4f5;
    //   border-color: #fff;
    //   font-weight: bold;
    //   color: #333333;
    //   //   position: relative;
    //   /deep/.van-button--normal {
    //     font-size: 32px;
    //   }
    //   /deep/.van-button--default {
    //     border-color: #fff;
    //   }
    //   .convention {
    //     height: 32%;
    //   }
    //   .convention:last-child {
    //     margin-top: 10px;
    //   }
    // }
  }
}
.setTelegram {
  margin: 10px 0 30px;
  /deep/.van-cell-group {
    display: flex;
    justify-content: center;
  }
  /deep/.van-cell {
    width: 80%;
    border: 1px solid #c8cfde;
    border-radius: 20px;
  }
  // p{
  //   padding: 0;
  //   font-size: 28px;
  //   font-weight: normal;
  //   text-align: center;
  //   color: #F37A4C;
  // }
}
</style>
