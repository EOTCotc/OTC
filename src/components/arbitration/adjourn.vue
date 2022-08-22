<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <div class="reason">
        <p>申请延期需满足以下一种条件</p>
        <van-radio-group v-model="radio">
          <van-radio name="1">举证时间不足</van-radio>
          <van-radio name="2">核实信息还在审核中</van-radio>
        </van-radio-group>
      </div>
      <div class="explain">
        <p>申请延期说明</p>
        <van-field
          v-model="message"
          rows="2"
          :autosize="{ maxHeight: 150, minHeight: 150 }"
          type="textarea"
          maxlength="3000"
          placeholder="请描述申请延期的说明"
          show-word-limit
        />
      </div>
      <div class="time">
        <p class="time-title">申请延期时间</p>
        <div>
          <p
            v-for="(item, index) in days"
            :key="index"
            :class="item.show ? 'action' : ''"
            @click="oneClick(item)"
          >
            {{ item.day }}
          </p>
        </div>
      </div>
      <div class="pay">
        <div>
          <p>需支付</p>
          <p>1100 USDT</p>
        </div>
        <p>说明: 申请延期根据延期时间需支付1100~2200 EOTC</p>
      </div>
      <div class="footer">
        <van-button
          color="#1B2945"
          :disabled="message == '' ? true : false"
          round
          block
          @click="show = true"
          >提交</van-button
        >
      </div>
      <van-popup v-model="show" position="bottom" round @closed="checked=false">
        <div class="pop">
          <p class="popTitle">确认提交并支付</p>
          <p class="hint">
            每人仅可提交一次延期申请，请认真填写，是否确定提交该申请延期并支付？
          </p>
          <van-checkbox v-model="checked" shape="square">我已确认</van-checkbox>
          <div class="buttons">
            <van-button
              color="#1B2945"
              round
              block
              :disabled="checked ? false : true"
              >确定提交并支付</van-button
            >
            <p>我再想想</p>
          </div>
        </div></van-popup
      >
    </div>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
//申请延期
export default {
  components: {
    white,
  },
  data() {
    return {
      title: "申请延期",
      radio: "1",
      message: "",
      days: [
        { day: "1天", show: true },
        { day: "2天", show: false },
        { day: "3天", show: false },
        { day: "4天", show: false },
        { day: "5天", show: false },
        { day: "6天", show: false },
        { day: "7天", show: false },
      ],
      checked: false,
      show: false,
    };
  },
  methods: {
    oneClick(data) {
      if (data.show) {
        return;
      }
      for (let i of this.days) {
        i.show = false;
      }
      data.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  font-size: 28px;
  padding: 32px 32px 60px;
  .reason {
    margin-bottom: 45px;
    p {
      margin-bottom: 30px;
    }
    /deep/.van-radio:first-child {
      margin-bottom: 36px;
    }
  }
  .explain {
    margin-bottom: 40px;
    p {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    /deep/.van-cell {
      border: 1px solid #c8cfde;
      border-radius: 20px;
    }
  }
  .time {
    margin-bottom: 60px;
    .time-title {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 24px;
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
        width: 140px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background: #f3f4f5;
        border: 2px solid #f3f4f5;
        border-radius: 8px;
        margin: 0 24px 20px 0;
      }
    }
  }
  .pay {
    margin-bottom: 278px;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 32px;
      margin-bottom: 40px;
      p:first-child {
        font-weight: bold;
      }
      p:last-child {
        font-weight: bold;
        color: #fc7542;
      }
    }
    p:last-child {
      color: #999;
    }
  }
  .pop {
    padding: 32px 32px 40px;
    .popTitle {
      font-size: 40px;
      font-weight: bold;
      margin-bottom: 30px;
      color: #1b2945;
    }
    .hint {
      color: #f37a4c;
      margin-bottom: 40px;
    }
    .buttons {
      margin-top: 40px;
      button {
        margin-bottom: 40px;
      }
      p {
        text-align: center;
        color: #666;
      }
    }
  }
}
</style>