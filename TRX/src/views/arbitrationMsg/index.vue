<template>
  <div class="container">
    <white :title="$t('views.arbitration.index.title')" />
    <div class="content">
      <ul v-if="list.length">
        <li
          v-for="(item, index) in list"
          @click="
            toArbitrationMsg(
              item.messageType,
              item.associatedId,
              item.isArbitrate,
              item.arbitrateMessageId
            )
          "
          :key="index"
        >
          <img :src="item.messageType == 0 ? shen_qing : tong_zhi" />
          <div class="details">
            <div>
              <span>{{
                  item.messageType == 0
                    ? $t("views.arbitration.index.messageType[0]")
                    : $t("views.arbitration.index.messageType[1]")
                }}</span>
              <span>{{ item.msgTime }}</span>
            </div>
            <p>
              {{
                item.messageType === 4
                  ? $t("views.arbitration.index.reason")
                  : item.reason
              }}
            </p>
          </div>
        </li>
      </ul>
      <van-empty
        v-else
        :image="require('../../assets/currency-icons/empty.png')"
        :description="$t('views.arbitration.index.description')"
      />
    </div>
  </div>
</template>

<script>
import White from "@/components/Nav/white.vue";
import { getarbitratemessage } from "@/api/arbitrationMsg.js";
import { transformDate } from "@/utils/utils";

export default {
  name: "arbitrationList",
  data() {
    return {
      shen_qing: require("@/assets/imgs/shenqing.png"),
      tong_zhi: require("@/assets/imgs/tongzhi.png"),
      list: [], //消息列表
    };
  },
  components: {
    White,
  },
  mounted() {
    this.getMsgList();
  },
  methods: {
    // 获取仲裁消息列表
    getMsgList() {
      getarbitratemessage({ isArbitrate: 0 }).then((res) => {
        this.list = res.items.map((item) => {
          // transformDate()把中国时间转成格林威治时间
          item.msgTime = this.diffDate(item);
          return item;
        });
      });
    },
    // 计算时间差
    diffDate(data) {
      const { createDate } = data;
      // console.log(createDate)
      // 计算时间差(秒)
      const diffSecond = this.$dayjs()
        .utc()
        .diff(this.$dayjs(1664674348458).utc(), "second");
      const minute = 60, // 秒
        hours = 3600, // 小时
        day = 86400; // 1天

      if (diffSecond < minute) {
        return `${diffSecond}${this.$t(
          "views.arbitration.index.before_second"
        )}`;
      } else if (diffSecond < hours) {
        return `${Math.floor(diffSecond / 60)}${this.$t(
          "views.arbitration.index.before_minute"
        )}`;
      } else if (diffSecond / day < 3) {
        return `${Math.floor(diffSecond / day)}${this.$t(
          "views.arbitration.index.before_day"
        )}`;
      } else {
        return this.$dayjs(createDate).utc().format("YYYY-MM-DD HH:mm:ss");
      }
    },
    // 去消息详情
    toArbitrationMsg(
      messageType,
      associatedId,
      arbitrateId,
      arbitrateMessageId
    ) {
      console.log({ messageType, associatedId, arbitrateId });
      if (messageType === 4) {
        this.$router.push({
          name: "details",
          query: { id: associatedId },
        });
      } else {
        this.$router.push({
          name: "arbitrationMsgDetail",
          query: { messageType, associatedId, arbitrateId, arbitrateMessageId },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  background: #fff;
  min-height: 100vh;
}
.content {
  padding: 0 30px;
  li {
    margin-top: 43px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    img {
      margin-right: 16px;
      width: 90px;
      height: 90px;
      border-radius: 50%;
    }
    .details {
      width: 100%;
      div {
        display: flex;
        justify-content: space-between;
        font-size: 32px;
        color: #333;
        span:last-of-type {
          font-size: 24px;
          color: #999;
        }
      }
      p {
        margin-top: 5px;
        font-size: 28px;
        color: #999;
      }
    }
  }
}
</style>