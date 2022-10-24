<template>
  <div class="app">
    <Nav></Nav>
    <div class="contatiner">
      <div class="top">
        <transition-page>
          <router-view></router-view>
        </transition-page>
      </div>
    </div>
    <!-- 底部 -->
    <div class="tail">
      <div>
        <!-- <img src="@/assets/imgs/c.png" />
        <span>{{ $t("home.tags5") }}</span> -->
      </div>
      <div @click="handleTabLang">
        <span class="tab-lang">{{ textLang }}</span>
        <van-icon :name="iconLang" />
      </div>
    </div>
    <!-- 选择语言 -->
    <van-popup
      v-model="showPopup2"
      :style="{ height: '100vh', background: '#1b2946', zIndex: '55' }"
      position="right"
    >
      <div class="menu">
        <div
          class="menu-every"
          v-for="item in lang"
          @click="tabLang(item)"
          :key="item.id"
        >
          <span>{{ item.text }}</span>
        </div>
      </div>
    </van-popup>
    <notification
      ref="notification"
      button-color="#237FF8"
      :title="$t('views.home.notification.title')"
      :button-text="$t('views.home.notification.buttonText')"
      :message="`${$t('views.home.notification.message[0]')} ${msgNum} ${$t(
        'views.home.notification.message[1]'
      )}`"
      :headerIcon="icon"
      @buttonClick="$router.push({ name: 'arbitrationMsg' })"
    />
  </div>
</template>
<script>
import Nav from "@/components/Nav";

import transitionPage from "@/components/transitionPage";
import { getmessageopen } from "@/api/arbitrationMsg";
import Notification from "@/components/notification";

export default {
  name: "home-index",
  components: {
    Nav,
    transitionPage,
    Notification,
  },

  data() {
    return {
      msgNum: 0,
      icon: require("@/static/image/pending.png"),
      iconLang: "arrow-down", //语言的箭头
      showPopup2: false, //选择语言
      lang: [
        { id: 1, text: "简体中文", lang: "zh" },
        { id: 2, text: "English", lang: "en" },
        { id: 3, text: "繁體中文", lang: "zhTw" },
      ],
      textLang: "",
    };
  },
  created() {
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
    this.getMsg();
  },
  methods: {
    // 选择语言更换图标
    handleTabLang() {
      this.showPopup2 = !this.showPopup2;
      if (this.showPopup2) {
        this.iconLang = "arrow-up";
      } else {
        this.iconLang = "arrow-down";
      }
    },
    tabLang(item) {
      localStorage.setItem("lang", JSON.stringify(item));
      this.textLang = item.text;
      this.$router.go(0);
    },
    getMsg() {
      getmessageopen().then((res) => {
        this.msgNum = res.items;
        !!this.msgNum &&
          this.$nextTick(() => {
            this.$refs.notification.toggle(true);
          });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
.popImg {
  width: 152px;
  position: absolute;
  top: -60px;
  left: 240px;
}
.popText {
  text-align: center;
  padding: 120px 0 40px;
}
.tail {
  position: fixed;
  bottom: 0;
  padding: 0 40px;
  width: 92%;
  height: 96px;
  font-size: 24px;
  background: #111a2d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
  div:first-of-type {
    display: flex;
    align-items: center;
    color: #dcdcdc;
    img {
      margin-right: 14px;
      width: 36px;
      height: 36px;
    }
  }
  div:last-of-type {
    color: #fff;
    span {
      margin-right: 10px;
    }
  }
}
// 语言
.menu {
  margin-top: 88px;
  margin-bottom: 200px;
  .menu-every {
    margin: 0 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    font-size: 32px;
    color: #b4b7c2;
    border-bottom: 1px solid #2b374f;
    img {
      margin-left: 50px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
