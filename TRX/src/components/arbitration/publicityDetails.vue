<template>
  <div>
    <white :title="title"></white>
    <div class="content">
      <both
        :leftnaem="details.leftnaem"
        :rightname="details.rightname"
        :lefturl="details.lefturl"
        :righturl="details.righturl"
        :wang="details.wang"
        :leftbank="details.leftbank"
        :rightbank="details.rightbank"
      ></both>
      <div class="textbox">
        <div class="cause">卖家发起仲裁，仲裁事件为账户冻结</div>
        <div class="result">
          <p>仲裁结果</p>
          本次参与仲裁判决的仲裁员共计11人，通过双方提交举证，10位仲裁员判定原告方胜。
        </div>
        <div class="time">
          <p>结案时间</p>
          2022.05.27 09:21
        </div>
        <div class="judgment">
          <p class="title">公示判决</p>
          <div class="flex" v-for="(item, index) in 11" :key="index">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
import both from "@/components/arbitration/module/both.vue";
export default {
  //公示仲裁案详情
  components: {
    white,
    both,
  },
  data() {
    return {
      title: "仲裁案详情",
      details: {
        leftnaem: "吴敏",
        rightname: "王晓雷",
        lefturl: require("@/static/image/usdt.svg"),
        righturl: require("@/static/image/usdc.svg"),
        wang: 0,
        leftbank: 10,
        rightbank: 1,
      },
      show: false,
    };
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.content {
  padding: 32px;
  .textbox {
    margin-top: 30px;
    font-size: 28px;
    .cause {
      padding: 24px;
      border-radius: 0 20px 20px 20px;
      background: #f3f4f5;
    }
    .result {
      margin-top: 30px;
      p {
        margin-bottom: 16px;
        font-size: 32px;
        font-weight: bold;
      }
    }
    .time {
      margin-top: 30px;
      p {
        margin-bottom: 16px;
        font-size: 32px;
        font-weight: bold;
      }
    }
    .judgment {
      margin-top: 30px;
      .title {
        margin-bottom: 34px;
        font-size: 32px;
        font-weight: bold;
      }
      .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 45px;
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
    }
  }
}
</style>
