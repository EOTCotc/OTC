<template>
  <div class="content">
    <div class="top">
      <div class="top_number">
        <p>{{ $t("components.team.tags1") }}</p>
        <p>{{ allMan }}</p>
      </div>
      <div class="top_flex">
        <div>
          <p>{{ $t("components.team.tags2") }}</p>
          <p>{{ number }}</p>
        </div>
        <div>
          <p>{{ $t("components.team.tags3") }}</p>
          <p>{{ stakeMan }}</p>
        </div>
      </div>
      <img src="@/static/image/teambg.png" alt="" />
      <div class="zong">
        <div>
          <p>{{ $t("components.team.tags4") }}</p>
          <p>{{ performance }}</p>
        </div>
        <div>
          <p>{{ $t("components.team.tags5") }}</p>
          <p>{{ usdt_teams }}</p>
        </div>
      </div>
    </div>
    <div class="center" v-if="list.length != 0">
      <div class="node" v-for="(item, index) in list" :key="index">
        <div class="node_title">
          <div>
            <img
              v-if="item.level == '1'"
              src="@/static/image/first.png"
              alt=""
            />
            <img v-else src="@/static/image/second.png" alt="" />
            <span>{{ item.uid }}</span>
          </div>
          <i @click="showClick(item)" class="iconfont icon-renyuanxinxi"></i>
        </div>
        <div class="node_content">
          <div>
            <p v-if="item.userName != ''">
              {{ $t("components.team.tags6") }}: {{ item.userName }}
            </p>
            <p v-else class="blue">{{ $t("components.team.tags7") }}</p>
            <p>{{ $t("components.team.tags8") }}: {{ item.ztrs }}</p>
          </div>
          <div>
            <p>{{ $t("components.team.tags9") }}: {{ item.item }}</p>
            <p>{{ $t("components.team.tags10") }}: {{ item.vip }}</p>
          </div>
          <p class="time">
            {{ $t("components.team.tags11") }}: {{ item.regDate }}
          </p>
        </div>
      </div>

      <div class="footer">
        <van-button class="button" color="#1B2945" block @click="more()">{{
          $t("components.team.tags12")
        }}</van-button>
      </div>
    </div>
    <div v-else>
      <van-empty image="error" :description="$t('components.team.tags13')" />
    </div>
    <van-popup v-model="show" closeable class="pop">
      <div class="pop-content">
        <p class="title">UID:{{ uid }}</p>
        <div class="text">
          <p v-if="phone != ''">
            {{ $t("components.team.tags14") }}:
            <a :href="'tel:' + phone">{{ phone }}</a>
          </p>
          <p>
            {{ $t("components.team.tags15") }}:
            <a :href="'mailto:' + email">{{ email }}</a>
          </p>
          <p>{{ $t("components.team.tags16") }}: {{ EOTC }}</p>
          <!-- <p>USDT余额: {{ USDT }}</p> -->
        </div>
        <van-button
          class="button"
          round
          color="#1B2945"
          block
          @click="skip()"
          >{{ $t("components.team.tags17") }}</van-button
        >
      </div>
    </van-popup>
    <van-popup v-model="dialogShow" closeable class="more">
      <div class="moreBox">
        <p>{{ $t("components.team.tags18") }}</p>
        <a href="mailto:coin@eotc.me">
          <van-button type="info" round block>{{
            $t("global.confirm2")
          }}</van-button>
        </a>
      </div>
    </van-popup>
  </div>
</template> 

<script>
import { GetMyTeams } from "@/api/trxRequest";
import { UserInfo } from "@/utils/web3";
export default {
  //团队节点

  data() {
    return {
      show: false,
      emptyShow: true,
      //列表数据
      list: [],
      // 电话
      phone: 17773857970,
      // 邮箱
      email: "asd954860457@163.com",
      uid: "",
      EOTC: "",
      USDT: "",
      //直推人数
      number: 0,
      //直推业绩
      performance: 0,
      //团队人数
      allMan: 0,
      //有效节点
      stakeMan: 0,
      //总业绩
      usdt_teams: 0,

      dialogShow: false,
    };
  },
  created() {
    this.init();
    let asd = UserInfo();
    this.allMan = asd.allMan;
    this.stakeMan = asd.stakeMan;
    this.usdt_teams = asd.usdt_teams;
  },
  mounted() {},
  methods: {
    showClick(item) {
      this.phone = item.tel;
      this.email = item.mail;
      this.uid = item.uid;
      this.EOTC = item.staking;
      this.USDT = item.balance;
      this.show = true;
    },
    more() {
      this.dialogShow = true;
    },
    skip() {
      this.$router.push({ name: "transfer", params: { uid: this.uid } });
    },
    init() {
      GetMyTeams({}).then((res) => {
        let data = res.data;
        for (let i of data) {
          if (i.item == this.$t("components.team.data1")) {
            i.item = "A0";
          }
          if (i.level == "1") {
            this.number++;
            this.performance += Number(i.usdt);
          }
        }

        this.list = data;
      });
    },
    asd() {
      let a = [
        { b: 1, c: "az" },
        { b: 1, c: "sfsd" },
        { b: 2, c: "shgfhfg" },
        { b: 3, c: "yrt" },
        { b: 1, c: "xvcxv" },
        { b: 2, c: "456" },
        { b: 2, c: "shgfhfg" },
        { b: 3, c: "yrt" },
        { b: 1, c: "xvcxv" },
        { b: 2, c: "456" },
      ];
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  .top {
    padding: 42px 0 92px;
    background: #1b2945;
    color: #fff;
    text-align: center;
    position: relative;
    .top_number {
      margin-bottom: 20px;
      p:first-child {
        font-size: 24px;
        margin-bottom: 8px;
        color: #8d94a2;
      }
      p:last-child {
        font-size: 48px;
      }
    }
    .top_flex {
      display: flex;
      justify-content: space-around;
      div {
        p:first-child {
          font-size: 24px;
          margin-bottom: 8px;
          color: #8d94a2;
        }
        p:last-child {
          font-size: 40px;
        }
      }
    }
    img {
      position: absolute;
      bottom: 48px;
      right: 272px;
    }
    .zong {
      width: 94vw;
      height: 160px;
      border-radius: 20px;
      background: #fff;
      color: #333;

      display: flex;
      justify-content: space-around;
      box-shadow: 0 3px 5px #999;
      position: absolute;
      bottom: -72px;
      left: 24px;
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        p:first-child {
          color: #999;
          font-size: 24px;
          margin-bottom: 8px;
        }
        p:last-child {
          font-size: 40px;
        }
      }
    }
  }
  .center {
    padding: 108px 24px 96px;
    background: #f3f4f5;
    // position: relative;

    .node {
      padding: 24px;
      background: #fff;
      border-radius: 16px;
      margin-bottom: 20px;
      .node_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 22px;
        div {
          display: flex;
          align-items: center;
          span {
            font-size: 32px;
            font-weight: bold;
          }
          img {
            width: 40px;
            height: 40px;
            margin-right: 14px;
            border-radius: 50%;
          }
        }
        i {
          font-size: 48px;
          color: #999;
        }
      }
      .node_content {
        font-size: 28px;
        div {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          p:first-child {
            width: 50%;
          }
          p:last-child {
            width: 45%;
          }
          .blue {
            color: #247ff6;
          }
        }
        .time {
          color: #999;
        }
      }
    }
    .footer {
      width: 100vw;
      height: 96px;
      position: fixed;
      bottom: 0;
      right: 0;
      .button {
        height: 100%;
      }
    }
  }
  .pop {
    width: 686px;
    border-radius: 20px;
    .pop-content {
      padding: 30px 30px 40px;
      font-size: 28px;
      .title {
        font-size: 32px;
        font-weight: bold;
        color: #247ff6;
        margin-bottom: 30px;
      }
      .text {
        margin-bottom: 30px;
        p {
          margin-bottom: 20px;
        }
        p:last-child {
          margin: 0;
        }
      }
    }
  }
  .more {
    width: 80%;
    border-radius: 20px;
    .moreBox {
      padding: 32px;
      font-size: 32px;
      p {
        margin: 40px 0 60px;
        text-align: center;
      }
    }
  }
}
</style>
