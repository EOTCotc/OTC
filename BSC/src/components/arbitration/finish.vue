<template>
  <div class="content">
    <div class="case">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="caselist" v-for="(item, index) in casedata" :key="index">
          <div class="result">
            <div class="left" :class="endStatic != 1 ? 'gray' : ''">
              <van-icon v-if="endStatic == 1 || endStatic == 2" name="fire-o" />
              <span>胜诉</span>
            </div>
            <div :class="textcolor()">+10 EOTC</div>
          </div>
          <both
            :leftnaem="item.leftnaem"
            :rightname="item.rightname"
            :lefturl="item.lefturl"
            :righturl="item.righturl"
            :wang="item.wang"
            :leftbank="item.leftbank"
            :rightbank="item.rightbank"
          ></both>
          <div class="case_text" @click="details(item)">
            <p class="title">仲裁结果</p>
            <div class="text_flex">
              <p class="van-multi-ellipsis--l2">
                本次参与仲裁判决的仲裁员共计11人，通过双方提交举证，10位仲裁员判定原告方胜。
              </p>
              <div><van-icon name="orders-o" size="0.5rem" />详情</div>
            </div>
          </div>
          <div v-if="endStatic == 2" class="again">
            <van-button color="#1B2945" round block :to="{name:'againArbitration'}"
              >申请再仲裁</van-button
            >
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import both from "@/components/arbitration/module/both.vue";
export default {
  //已结案
  components: {
    both,
  },
  data() {
    return {
      endStatic: 2, //测试状态 1、胜诉 2、败诉 3、超时 4、取消
      casedata: [
        {
          leftnaem: "吴敏",
          rightname: "王晓雷",
          lefturl: require("@/static/image/usdt.svg"),
          righturl: require("@/static/image/usdc.svg"),
          wang: 0,
          leftbank: 11,
          rightbank: 0,
        },
        {
          leftnaem: "王晓雷",
          rightname: "吴敏",
          lefturl: require("@/static/image/usdt.svg"),
          righturl: require("@/static/image/usdc.svg"),
          wang: 0,
          leftbank: 9,
          rightbank: 2,
        },
        {
          leftnaem: "王晓雷",
          rightname: "吴敏",
          lefturl: require("@/static/image/usdt.svg"),
          righturl: require("@/static/image/usdc.svg"),
          wang: 0,
          leftbank: 9,
          rightbank: 2,
        },
      ],
      loading: false,
      finished: false,
      list: [],
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    details(item) {
      this.$router.push({ name: "finishDetails" });
    },
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
.content {
  min-height: calc(100vh - 100px);
  background: #f3f4f5;
}
.case {
  .caselist {
    background: #fff;
    margin: 24px;
    border-radius: 20px;
    padding: 30px;
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
    .case_text {
      margin-top: 32px;
      .title {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 16px;
      }
      .text_flex {
        display: flex;
        justify-content: space-between;
        div {
          width: 40%;
          font-weight: bold;
          display: flex;
          align-items: flex-end;
          padding-left: 24px;
        }
      }
    }
    .again {
      margin-top: 30px;
    }
  }
}
</style>
