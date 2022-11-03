
<template>
  <div class="content">
    <div class="lang" @click="showPopup = true">
      <img src="@/assets/imgs/lang.png" alt="" />
      <span>{{ textLang }}</span>
    </div>
    <van-popup v-model="showPopup" round>
      <div class="popup">
        <div class="popup-title">选择语言</div>
        <ul>
          <li
            v-for="item in lang"
            :key="item.id"
            @click="tabLang(item)"
            :style="item.text == textLang ? 'color:#237FF8;' : ''"
          >
            <span>{{ item.text }} — {{ item.lang }}</span>
            <span v-show="item.text == textLang" style="font-weight: bold"
              >√</span
            >
          </li>
        </ul>
      </div>
    </van-popup>
    <div class="logo">
      <img src="@/static/image/login.png" alt="" />
      <p>EOTC</p>
    </div>
    <div class="login">
      <div class="login_content">
        <div class="out" @click="asd()">
          <div :class="actionShow ? 'action' : ''">登录</div>
          <div :class="!actionShow ? 'action' : ''"></div>
          <!-- <div :class="!actionShow ? 'action' : ''">注册</div> -->
        </div>
        <Login @switched="asd()" ref="log" v-show="actionShow"></Login>
        <signin @switched="asd()" ref="sig" v-show="!actionShow"></signin>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Logcomponent/index.vue";
import signin from "@/components/Logcomponent/Signin.vue";
export default {
  components: {
    Login,
    signin,
  },
  data() {
    return {
      actionShow: true,
      textLang: "",
      showPopup: false,
      lang: [
        { id: 1, text: "简体中文", lang: "zh" },
        { id: 2, text: "English", lang: "en" },
        { id: 3, text: "繁體中文", lang: "zhTw" },
      ],
      textLang: "",
    };
  },
  mounted() {
    // 当前的语言
    if (localStorage.getItem("lang")) {
      this.textLang = JSON.parse(localStorage.getItem("lang")).text;
    } else {
      let browserLang = navigator.language;
      let langText = browserLang.slice(0, 2);
      switch (langText) {
        case "zh":
          this.textLang = "简体中文";
          break;
        case "en":
          this.textLang = "English";
          break;
        case "zhTw":
          this.textLang = "繁體中文";
          break;
      }
    }
    if (this.$route.query.pid != undefined) {
      this.actionShow = false;
    }
  },
  methods: {
    tabLang(item) {
      localStorage.setItem("lang", JSON.stringify(item));
      this.textLang = item.text;
      this.$router.go(0);
    },
    asd() {
      // this.actionShow = !this.actionShow;
      //重置input输入
      if (this.actionShow) {
        this.$refs.log.email = "";
        this.$refs.log.verification = "";
      } else {
        this.$refs.sig.email = "";
        this.$refs.sig.verification = "";
        this.$refs.sig.address = "";
        this.$refs.sig.checked = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  min-height: 100vh;
  overflow: hidden;
  background: #1b2945;
}
// 选择语言
.lang {
  margin: 25px 35px 0 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  img {
    width: 28px;
    height: 28px;
  }
  span {
    margin-left: 14px;
    font-size: 28px;
    color: #fff;
  }
}
.popup {
  padding: 30px;
  width: 630px;
  height: 540px;
  border-radius: 20px;
  background: #fff;
  .popup-title {
    height: 80px;
    font-size: 36px;
    color: #333;
    border-bottom: 1px solid #f3f4f5;
  }
  li {
    font-size: 32px;
    color: #999;
    line-height: 80px;
    display: flex;
    justify-content: space-between;
  }
}
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 52px 0 88px 0;
  img {
    width: 144px;
    height: 144px;
  }
  p {
    margin-top: 20px;
    font-size: 46px;
    color: #e2ecff;
    font-weight: bold;
  }
}
.login {
  padding: 0 32px;
  .login_content {
    background: #fff;
    border-radius: 0px 20px 0px 0px;
    padding: 98px 32px 60px;
    position: relative;
    .out {
      width: 320px;
      height: 96px;
      background: #ffffff;
      box-shadow: 0px 6px 12px 2px rgba(204, 204, 204, 0.2);
      border-radius: 48px;
      position: absolute;
      top: -40px;
      left: 0;
      font-size: 40px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      div {
        width: 45%;
        height: 80%;
        text-align: center;
        line-height: 77px;
      }
      .action {
        color: #fff;
        background: #1b2945;
        border-radius: 48px;
      }
    }
  }
}
</style>