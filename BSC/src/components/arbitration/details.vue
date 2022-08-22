<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <div class="top">
        <div :class="proofStatic != 0 ? '' : 'black'">
          <van-icon name="underway-o" />
          <van-count-down
            v-if="proofStatic != 0"
            :time="time"
            format="DD 天 HH 时 mm 分 "
          />
          <p v-else>双方举证中</p>
        </div>
        <van-button
          v-if="proofStatic == 1"
          type="info"
          plain
          size="small"
          round
          :to="{ name: 'anew' }"
          >重新举证</van-button
        >
      </div>
      <div class="time">
        <p>仲裁发起时间</p>
        <p>2022.05.26 12:54</p>
      </div>
      <bothplan
        v-if="proofStatic == 2"
        :leftnaem="bothData.leftnaem"
        :rightname="bothData.rightname"
        :lefturl="bothData.lefturl"
        :righturl="bothData.righturl"
        :leftbank="bothData.leftbank"
        :rightbank="bothData.rightbank"
      ></bothplan>
      <div v-else class="both">
        <div class="bothBox">
          <p class="accuser">原告</p>
          <div>
            <van-icon name="chat-o" color="#247FF7" size="16" />
          </div>
          <div>
            <img src="@/static/image/usdt.svg" alt="" />
            <p>吴敏</p>
            <span>(卖家)</span>
          </div>
        </div>
        <div class="bothBox">
          <p class="accused">被告</p>
          <div>
            <van-icon name="chat-o" color="#247FF7" size="16" />
          </div>
          <div>
            <img src="@/static/image/usdc.svg" alt="" />
            <p>王晓雷</p>
            <span>(买家)</span>
          </div>
        </div>
      </div>
      <div class="cause">卖家发起仲裁，仲裁事件为账户冻结</div>
      <twosides :bothList="bothList"></twosides>
      <orderDetails
        :messagelist="messagelist"
        :orderlist="orderlist"
      ></orderDetails>
      <div v-if="proofStatic == 1" class="footer">
        <van-button color="#4EA0F5" round block @click="judgment(1)"
          >原告胜</van-button
        >
        <van-button color="#EE786F" round block @click="judgment(2)"
          >被告胜</van-button
        >
      </div>
      <div class="judgmentbox" v-else-if="proofStatic == 2">
        <div>
          <p>你的判决</p>
          <div>
            <van-icon name="star-o" />
            <p>{{ judgmentStatic }}胜</p>
          </div>
        </div>
        <p class="message">{{ message }}</p>
      </div>

      <!-- 判决原因弹出层 -->
      <van-popup
        position="bottom"
        v-model="show"
        closeable
        round
        @click-overlay="close()"
        @click-close-icon="close()"
        :style="{ height: '35%' }"
      >
        <div class="judgment-pop">
          <p>判决原因</p>
          <p>维护安全稳定信任的交易环境</p>
          <van-field
            class="asd"
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="1000"
            placeholder="请描述做出该判决的说明"
            show-word-limit
          />
          <div class="button">
            <van-button round @click="close">我再想想</van-button>
            <van-button
              color="#1B2945"
              round
              :disabled="message == '' ? true : false"
              @click="sentence"
              >确定</van-button
            >
          </div>
        </div>
      </van-popup>
      <!-- 判决胜利弹出层 -->
      <van-popup
        position="bottom"
        v-model="winshow"
        closeable
        round
        @click-overlay="close2()"
        @click-close-icon="close2()"
        ><div class="winpop">
          <p>判决该仲裁案{{ judgmentStatic }}胜</p>
          <p>判决说明</p>
          <p>根据提交凭证判定当前仲裁案{{ judgmentStatic }}胜</p>
          <van-checkbox v-model="checked" shape="square"
            >我已确认决议</van-checkbox
          >
          <div class="button">
            <van-button round @click="close2">我再想想</van-button>
            <van-button
              color="#1B2945"
              round
              :disabled="checked ? false : true"
              @click="winevent"
              >确定</van-button
            >
          </div>
        </div></van-popup
      >
    </div>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
import orderDetails from "@/components/arbitration/module/orderDetails.vue";
import twosides from "@/components/arbitration/module/twosides.vue";
import bothplan from "@/components/arbitration/module/both.vue";
import { Toast } from "vant";
export default {
  //仲裁员身份的待处理详情
  //仲裁案详情
  components: {
    white,
    orderDetails,
    twosides,
    bothplan,
  },
  data() {
    return {
      title: "仲裁案详情",
      time: 72 * 60 * 60 * 1000,
      bothList: [
        {
          accuserList: [
            { title: require("@/static/image/456.png"), show: true },
            {
              title:
                "交易过程中账户被冻结，无法正常交易。核实电子回单查询密码: 12254",
              show: false,
            },
            { title: require("@/static/image/789.png"), show: true },
          ],
        },
        {
          defendantList: [
            { title: require("@/static/image/456.png"), show: true },
            {
              title:
                "交易过程中账户被冻结，无法正常交易。核实电子回单查询密码: 12254",
              show: false,
            },
            { title: require("@/static/image/789.png"), show: true },
          ],
        },
      ],
      orderlist: [
        {
          title: "订单号",
          number: "7777781205789",
        },
        {
          title: "交易数量",
          number: "997.00000 USDT",
        },
        {
          title: "交易单价",
          number: "6.35 CNY",
        },
        {
          title: "交易总价",
          number: "6350.00 CNY",
          show: true,
        },
        {
          title: "交易时间",
          number: "2022.05.26 15:00:21",
        },
      ],
      messagelist: [
        { title: "姓名", value: "李牧" },
        { title: "开户银行", value: "工商银行" },
        { title: "银行卡号", value: "4005633224656232" },
      ],
      bothData: {
        leftnaem: "吴敏",
        rightname: "王晓雷",
        lefturl: require("@/static/image/usdt.svg"),
        righturl: require("@/static/image/usdc.svg"),
        leftbank: 1,
        rightbank: 0,
      },
      //双方举证状态
      proofStatic: 1,
      // 判决状态
      judgmentStatic: "",
      // 判决原因弹窗
      show: false,
      //判决确定弹出层
      winshow: false,
      //判决原因
      message: "",
      //复选框状态
      checked: false,
    };
  },
  methods: {
    judgment(index) {
      this.show = true;
      if (index == 1) {
        this.judgmentStatic = "原告";
      } else {
        this.judgmentStatic = "被告";
      }
    },
    sentence() {
      this.show = false;
      this.winshow = true;
    },
    winevent() {
      this.winshow = false;
      this.proofStatic = 2;
      Toast("判决成功");
    },
    close() {
      this.show = false;
      this.message = "";
    },
    close2() {
      this.winshow = false;
      this.message = "";
      this.checked = false;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 32px;
  font-size: 28px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
    .black {
      color: #333;
    }
    div {
      display: flex;
      align-items: center;
      color: #237ff8;
      font-weight: bold;
      font-size: 32px;
      i {
        font-size: 42px;
        padding-right: 12px;
      }
      /deep/.van-count-down {
        color: #237ff8;
      }
    }
  }
  .time {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    p:first-child {
      font-weight: bold;
    }
    p:last-child {
      color: #999;
    }
  }
  .both {
    display: flex;
    justify-content: space-between;
    // margin-bottom: 30px;
    .bothBox {
      width: 40%;
      padding: 24px;
      box-shadow: 0px 3px 12px 1px rgba(27, 41, 69, 0.03);
      position: relative;
      .accuser {
        background: #4ea0f5;
        color: #fff;
        font-weight: bold;
        padding: 8px 24px;
        border-radius: 0 24px 24px 24px;
        position: absolute;
        top: 0;
        left: 0;
      }
      .accused {
        background: #ec6f66;
        color: #fff;
        font-weight: bold;
        padding: 8px 24px;
        border-radius: 0 24px 24px 24px;
        position: absolute;
        top: 0;
        left: 0;
      }
      div:first-of-type {
        display: flex;
        flex-direction: row-reverse;
      }
      div:last-child {
        display: flex;
        align-items: center;
        padding-top: 24px;
        img {
          width: 60px;
        }
        p {
          margin-left: 12px;
        }
        span {
          color: #999;
        }
      }
    }
  }
  .cause {
    padding: 24px;
    background: #f3f4f5;
    border-radius: 0px 20px 20px 20px;
    margin: 30px 0;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
    button {
      width: 45%;
    }
  }

  .judgment-pop {
    padding: 32px 32px 60px;
    font-size: 32px;
    p {
      margin-bottom: 30px;
    }
    p:first-child {
      font-weight: bold;
    }
    p:nth-child(2) {
      color: #f37a4c;
    }
    .asd {
      border: 1px solid #c8cfde;
      border-radius: 20px;
      margin-bottom: 30px;
    }
    .button {
      display: flex;
      justify-content: space-between;
      button {
        width: 45%;
      }
    }
  }
  .winpop {
    padding: 32px 32px 60px;
    p:first-child {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    p:nth-child(2) {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 30px;
    }
    p:nth-child(3) {
      color: #666;
      margin-bottom: 100px;
    }
    .button {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      button {
        width: 45%;
      }
    }
  }
  .judgmentbox {
    div:first-child {
      display: flex;
      // padding: 0 30px;

      justify-content: space-between;
      p:first-child {
        font-size: 32px;
        font-weight: bold;
      }
      div {
        display: flex;
        align-items: center;
        color: #4ea0f5;
      }
    }
    .message {
      margin-top: 30px;
      padding: 24px;
      border-radius: 0px 20px 20px 20px;
      background: #f3f4f5;
    }
  }
}
</style>

