<!-- 
 * @Name: 申请成为仲裁员 
 * @Author: webQDI svb1474155018@163.com
 * @Date: 2022-05-25 15:00
 * @update 2022-05
 * @FilePath: \etoc514\src\views\rightItem\arbitrator.vue
 -->
<template>
  <div class="arbitratorContent" ref="arbitratorContent">
    <div class="contentTop" :style="!arbitratorFlg ? 'height: 140px' : 'height: 110px;padding: 15px 0 0 6px;'">
      <div class="topTitle" v-show="!arbitratorFlg">{{ $t("components.arbitrator.apply.title") }}</div>
      <div class="topMsg" :style="!arbitratorFlg ? 'text-align: center' : 'text-align: left;font-size: 18px;font-weight: 700'">
        {{ $t("components.arbitrator.apply.text") }}
      </div>
    </div>
    <div class="contentCenter">
      <div class="condition" v-if="!arbitratorFlg">
        <div class="centerTitle">{{ $t("components.arbitrator.apply.content.title") }}</div>
        <div class="centerMsgs">
          <div class="msgList">
            <van-cell :title="item.title" icon="shop-o" class="msgItem" :label="item.label" center
                      v-for="(item,i) of msgList" @click="redirect(item)" :key="i" :border="false">
              <!-- <template #icon>
              <i class="iconfont icon-shenfen"></i>
            </template> -->
              <template #right-icon v-if="item.value">
                <i class="iconfont icon-xuanze"></i>
              </template>
              <template #right-icon v-else>
                <span>{{ item.failMsg }}</span>
                <van-icon name="arrow" />
              </template>
            </van-cell>
          </div>
        </div>
        <van-dialog v-model="arbitratorDialogShow" theme="round-button" className="dialog" :confirmButtonText="$t('components.arbitrator.apply.dialog.success.confirm')"
                    confirmButtonColor="#237FF8" @confirm="arbitratorDialogBtn">
          <div><img class="gradeIcon" :src="require('@/static/image/arbitratorOk.png')" alt=""></div>
          <div class="grade">{{ $t("components.arbitrator.apply.dialog.success.title") }}</div>
          <div class="msg">{{ $t("components.arbitrator.apply.dialog.success.text") }}</div>
        </van-dialog>
        <van-dialog v-model="show" :show-confirm-button="false" :closeOnClickOverlay="true">
          <div class="testDialog">
            <div class="diaTitle">
              <div>{{ $t("components.arbitrator.apply.dialog.explain.title") }}</div>
            </div>
            <div class="diaMsg">
              <div>90{{ $t("components.arbitrator.apply.dialog.explain.text") }}</div>
            </div>
            <div class="examMsg">
              <div>
                <div class="examMsgTitle">{{ $t("components.arbitrator.apply.dialog.explain.total") }}</div>
                <div style="border-right: 1px solid #F3F4F5">
                  <span class="fs60">20</span>{{ $t("components.arbitrator.apply.dialog.explain.unit") }}
                </div>
              </div>
              <div>
                <div class="examMsgTitle">{{ $t("components.arbitrator.apply.dialog.explain.time.title") }}</div>
                <div><span class="fs60">30</span>{{ $t("components.arbitrator.apply.dialog.explain.time.unit") }}</div>
              </div>
            </div>
            <van-button class="testBtn" color="#7232dd" block round @click="answerBtn()">
              {{ $t("components.arbitrator.apply.dialog.explain.start") }}
            </van-button>
          </div>
        </van-dialog>
      </div>
      <div class="arbitratorPage" v-if="arbitratorFlg">
        <div class="arbitratorCard">
          <van-cell :title="$t('components.arbitrator.apply.dialog.info.title')" title-style="color: #C26E42" icon="shop-o" :value="userName" value-class="arbitratorPageValue" :border="false" center>
            <template #icon>
              <img src="@/static/image/arbitratorIcon.png" alt="">
            </template>
          </van-cell>
          <van-cell :title="$t('components.arbitrator.apply.dialog.info.label[0]')" :value="idCard.id" value-class="arbitratorPageValue" :border="false" center />
          <van-cell :title="$t('components.arbitrator.apply.dialog.info.label[1]')" :value="idCard.date" value-class="arbitratorPageValue" :border="false" center />
          <van-cell :title="$t('components.arbitrator.apply.dialog.info.label[2]')" :value="idCard.count" value-class="arbitratorPageValue" :border="false" center />
        </div>
        <div class="earnings">
          <div class="earningsArbitration">
            <div class="earningsTitle">{{ $t("components.arbitrator.apply.dialog.info.case.title") }}<span class="fs12">({{ $t("components.arbitrator.apply.dialog.info.case.unit") }})</span>
            </div>
            <div class="earningsContent">{{ arbitrationfinish }} <span class="fs12">/{{ arbitrationTotal }}</span></div>
          </div>
          <div class="earningsEOTC">
            <div class="earningsTitle">{{
                $t("components.arbitrator.apply.dialog.info.profit.title")
              }}<span class="fs12">(EOTC)</span></div>
            <div class="earningsContent">{{ eotcBanner }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="contentBottom">
      <van-button
        v-if="!arbitratorFlg"
        color="#1B2945"
        round
        block
        :disabled="arbitratorBtnFlg ? false : true"
        @click="btnClick()"
      >
        {{ $t("components.arbitrator.apply.dialog.button.confirm") }}
      </van-button>
      <van-button
        v-if="arbitratorFlg"
        class="destroyBtn"
        round
        block
      >
        {{ $t("components.arbitrator.apply.dialog.button.cancel") }}
      </van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "arbitrator",
  data() {
    return {
      totalHeight: "0",
      msgList: [{
        urlName: "identity",
        label: "",
        title: this.$t('components.arbitrator.apply.dialog.msgList[0].title'),
        failMsg: this.$t('components.arbitrator.apply.dialog.msgList[0].failMsg'),
        value: true
      }, {
        urlName: "",
        label: `${this.$t('components.arbitrator.apply.dialog.msgList[1].label[0]')}90${this.$t('components.arbitrator.apply.dialog.msgList[1].label[1]')}`,
        title: `${this.$t('components.arbitrator.apply.dialog.msgList[1].title[0]')}5000 EOTC${this.$t('components.arbitrator.apply.dialog.msgList[1].title[1]')}`,
        failMsg: this.$t('components.arbitrator.apply.dialog.msgList[1].failMsg'),
        value: true
      }, {
        urlName: "arbitratorStudy",
        label: "",
        title: this.$t('components.arbitrator.apply.dialog.msgList[2].title'),
        failMsg: this.$t('components.arbitrator.apply.dialog.msgList[2].failMsg'),
        value: true
      }, {
        urlName: "arbitratorExam",
        label: `${this.$t('components.arbitrator.apply.dialog.msgList[3].label[0]')}90${this.$t('components.arbitrator.apply.dialog.msgList[3].label[1]')}`,
        title: this.$t('components.arbitrator.apply.dialog.msgList[3].title'),
        failMsg: this.$t('components.arbitrator.apply.dialog.msgList[3].failMsg'),
        value: true
      }],
      idCard: {
        id: "012022052601",
        date: "2022.05.26",
        count: "2"
      },
      show: false,
      arbitratorBtnFlg: false, //成为仲裁员条件都是否完成
      arbitratorDialogShow: false, //申请为仲裁员弹窗的控制
      arbitratorFlg: true, //是否为仲裁员
      userName: "李木子",
      eotcBanner: "3000",
      arbitrationTotal: "45",
      arbitrationfinish: "40"
    };
  },
  mounted() {
    this.totalHeight = document.documentElement.clientHeight - document.querySelector(".van-nav-bar__content").getBoundingClientRect().height
    this.$refs.arbitratorContent.style.height = this.totalHeight + "px"
    this.$refs.arbitratorContent.style.overflow = this.totalHeight + "px"
    if (this.arbitratorFlg) {
      this.$refs.arbitratorContent.style.backgroundColor = "#F3F4F5"
    } else {
      this.$refs.arbitratorContent.style.backgroundColor = "#FFFFFF"
    }

    if (this.msgList[0].value == this.msgList[1].value == this.msgList[2].value == this.msgList[3].value == true) {
      this.arbitratorBtnFlg = true
    }
  },
  watch: {
    arbitratorFlg: {
      handler(newFlg, oldFlg) {
        if (newFlg) {
          document.body.style.backgroundColor = "#F3F4F5";
        } else {
          document.body.style.backgroundColor = "#FFFFFF";
        }
      }
    }
  },
  methods: {
    btnClick() {
      this.arbitratorDialogShow = true
    },
    redirect(obj) {
      if (obj.value) {
        return
      }
      if (obj.urlName == "arbitratorExam") {
        this.show = true
        return
      } else {
        this.$router.push({name: obj.urlName});
      }
    },
    answerBtn() {
      this.$router.push({name: "exam"});
    },
    arbitratorDialogBtn() {
      // this.arbitratorFlg = true
    }
  }
};
</script>
<style lang="less" scoped>
.arbitratorContent {
  .contentTop {
    background-image: url('@/static/image/arbitratorTop.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #FFFFFF;
    text-align: center;
    height: 280px;
    padding: 50px;
    box-sizing: border-box;
  }

  .topTitle {
    font-size: 60px;
  }

  .topMsg {
    font-size: 28px;
    padding: 20px
  }

  .contentCenter {
    padding: 0 32px;
    overflow: inherit;
  }

  .msgList {
    background: #F3F4F5;
    border-radius: 10pt;
    padding: 20px 0 80px;
  }

  /deep/ .van-cell__title {
    margin-left: 10px;
    flex: 3;
  }

  .msgItem {
    height: 96px;
    background-color: transparent;
  }

  .contentBottom {
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    padding: 0 32px 60px;
  }

  .centerTitle {
    font-size: 36px;
    padding: 40px 0 20px;
    font-weight: 700;
  }

  /deep/ .van-cell__label {
    margin: 0;
  }

  .examMsg {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .examMsg > div {
    flex: 1;
  }

  .testBtn {
    width: 50%;
    margin: 40px auto;
    color: #fff !important;
    border: none;
    background-color: #237FF8 !important;
  }

  .van-dialog {
    margin: 10px 0;
    overflow: initial;
  }

  .testDialog {
    text-align: center;
  }

  .diaTitle {
  }

  .diaTitle > div {
    padding: 20px 98px;
    margin: 0px auto;
    background: linear-gradient(to left, #006BF8, #3EBDFF);
    width: 170px;
    border-radius: 10px 10px 40px 40px;
    position: relative;
    top: -11px;
    font-size: 36px;
  }

  .diaMsg > div {
    padding: 10px 36px;
    margin: 30px auto;
    width: 220px;
    border-radius: 30px;
    font-size: 28px;
    background-color: #F3F4F5;
  }

  .fs60 {
    font-size: 60px;
  }

  .examMsgTitle {
    margin-bottom: 20px;
  }

  .dialog {
    text-align: center;
    overflow: inherit;

    /deep/ .van-dialog__content {
      position: relative;
      top: -60px;
    }

    .gradeIcon {
    }

    .grade {
      font-size: 48px;
      color: #237FF8;
      margin-top: 20px;
    }

    .msg {
      font-size: 36px;
      color: #333333;
      margin-top: 16px;
    }
  }

  .destroyBtn {
    color: #999999;
    font-size: 32px;
    font-weight: Bold;
  }

  .arbitratorPage {
    position: relative;
    top: -72px;
    .van-cell:first-of-type {
      font-weight: 700;
      padding: 16px 32px;
    }

    .van-cell {
      background-color: transparent;
      padding: 8px 32px;
    }

    .arbitratorPageValue {
      color: #333333;
    }

    .arbitratorCard {
      background: linear-gradient(to bottom, #FFF1E9, #F3C9B0);
      border-radius: 20px;
      padding: 10px 0 30px;
    }

    .earnings {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      padding: 20px;
      border-radius: 20px;
      background-color: #FFFFFF;
      font-weight: 700;
    }

    .earningsArbitration {
      flex: 1;
      text-align: center;
    }

    .earningsEOTC {
      border-left: 1px solid #999;
      flex: 1;
      text-align: center;
    }

    .earningsTitle {
      font-size: 28px;
      padding-bottom: 10px;
    }

    .fs12 {
      font-size: 12px;
    }

    .earningsContent {
      font-size: 40px;
    }

    /deep/ .van-cell__title,
    .van-cell__value {
      flex: auto;
    }
  }
}
</style>