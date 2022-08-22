<template>
  <div>
    <white :title="title"></white>
    <div class="content" :class="endStatic == 2 ? 'down' : ''">
      <div class="result">
        <div class="left" :class="endStatic != 1 ? 'gray' : ''">
          <van-icon v-if="endStatic == 1 || endStatic == 2" name="fire-o" />
          <span>胜诉</span>
        </div>
        <div :class="textcolor()">+10 EOTC</div>
      </div>
      <both
        :leftnaem="casedata.leftnaem"
        :rightname="casedata.rightname"
        :lefturl="casedata.lefturl"
        :righturl="casedata.righturl"
        :wang="casedata.wang"
        :leftbank="casedata.leftbank"
        :rightbank="casedata.rightbank"
      ></both>
      <p class="cause">卖家发起仲裁，仲裁事件为账户冻结</p>
      <div class="over">
        <p>仲裁结果</p>
        <p>
          本次参与仲裁判决的仲裁员共计11人，通过双方提交举证，10位仲裁员判定原告方胜。
        </p>
      </div>
      <div class="time">
        <p>结案时间</p>
        <p>2022.05.27 09:21</p>
      </div>
      <twosides :bothList="bothList"></twosides>
      <orderDetails
        :messagelist="messagelist"
        :orderlist="orderlist"
      ></orderDetails>
      <van-collapse
        v-model="activeNames"
        :border="false"
        v-if="endStatic == 1 || endStatic == 2"
      >
        <van-collapse-item title="公示判决" name="1">
          <div v-for="(item, index) in 11" :key="index" class="flexBox">
            <div class="flex">
              <div class="right">
                <p>王**</p>
                <p>459873564223</p>
              </div>
              <div class="left" :class="show ? 'colour1' : 'colour2'">
                <van-icon name="good-job-o" />
                <p v-if="show">原告</p>
                <p v-else>被告</p>
              </div>
            </div>
            <p class="reason cause">根据提交凭证判定当前仲裁案原告胜</p>
          </div>
        </van-collapse-item>
      </van-collapse>
      <div class="footer" v-if="endStatic == 2">
        <div>
          <van-button color="#1B2945" round block :to="{name:'againArbitration'}">申请再仲裁</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
import both from "@/components/arbitration/module/both.vue";
import orderDetails from "@/components/arbitration/module/orderDetails.vue";
import twosides from "@/components/arbitration/module/twosides.vue";
export default {
  //已结案详情
  components: {
    white,
    both,
    orderDetails,
    twosides,
  },
  data() {
    return {
      title: "仲裁案详情",
      endStatic: 2,
      casedata: {
        leftnaem: "吴敏",
        rightname: "王晓雷",
        lefturl: require("@/static/image/usdt.svg"),
        righturl: require("@/static/image/usdc.svg"),
        wang: 0,
        leftbank: 11,
        rightbank: 0,
      },
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
      activeNames: [""],
      show: false,
    };
  },
  methods: {
    textcolor() {
      if (this.endStatic == 1) {
        return "green";
      } else if (this.endStatic == 2 || this.endStatic == 3) {
        return "orange";
      } else {
        return "gray";
      }
    },
  },
};
</script>


<style lang="less" scoped>
/deep/.van-cell--clickable {
  font-weight: bold;
  font-size: 32px;
  padding-left: 0;
  padding-right: 0;
}
/deep/.van-cell::after {
  border: none;
}
.down {
  margin-bottom: 156px;
}
.content {
  padding: 32px;
  font-size: 28px;
  .result {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 58px;
    font-weight: bold;
    .left {
      display: flex;
      font-size: 36px;
      align-items: center;
      span {
        display: block;
        margin-left: 17px;
      }
    }
    .green {
      color: #00b87a;
    }
    .orange {
      color: #fc7542;
    }
    .gray {
      color: #999;
    }
  }
  .cause {
    padding: 24px;
    background: #f3f4f5;
    border-radius: 0px 20px 20px 20px;
    margin-top: 30px;
  }
  .over {
    margin-top: 30px;
    p:first-child {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 16px;
    }
  }
  .time {
    margin: 30px 0;
    p:first-child {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 16px;
    }
  }
  .flexBox {
    margin-bottom: 30px;
    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      div {
        display: flex;
        align-items: center;
      }
      .right {
        p:first-child {
          margin-right: 52px;
        }
      }
      .left {
        p:last-child {
          margin-left: 10px;
        }
      }
      .colour1 {
        color: #4ea0f5;
      }
      .colour2 {
        color: #ed7269;
      }
    }
    .reason {
      margin: 0;
    }
  }
  .footer {
    width: 100%;
    height: 156px;
    background: #fff;
    position: fixed;
    bottom: 0;
    right: 0;
    div {
      padding: 0 32px;
    }
  }
}
</style>
