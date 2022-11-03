<template>
  <div>
    <div class="both">
      <div>
        <p>{{ $t('components.arbitration.both.plaintiff') }}</p>
        <span v-if='info.status > 0'>{{ info.plaintiffNum }}{{ $t('components.arbitration.both.unit') }}</span>
        <img v-if="info.status === 2" class="diadema lf" src="@/static/image/huangguan.png" alt="" />
      </div>
      <div>
        <span v-if='info.status > 0'>{{ info.defendantNum }}{{ $t('components.arbitration.both.unit') }}</span>
        <p>{{ $t('components.arbitration.both.defendant') }}</p>
        <img v-if="info.status === 3" class="diadema rt" src="@/static/image/huangguan.png" alt="" />
      </div>
    </div>
    <div class="top">
      <div class="top-left">
        <p>{{ info.plaintiff }}</p>
        <!--        <p>(卖家)</p>-->
      </div>
      <div class="top-right">
        <!--        <p>(卖家)</p>-->
        <p>{{ info.defendant }}</p>
      </div>
    </div>
    <van-progress
      v-if="info.status > 0"
      stroke-width="12"
      :percentage="percentage || 0"
      :show-pivot="false"
      color="#4EA0F5"
      track-color="#EC6F66"
    />
  </div>
</template>
<script>
export default {
  //进度条组件
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      winShow: true
    };
  },
  computed: {
    percentage() {
      return this.info.plaintiffNum / this.info.total * 100
    }
  },
};
</script>
<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 28px;
  // align-items: center;
  img {
    width: 60px;
    height: 60px;
  }

  .top-left {
    display: flex;
    align-items: center;
    position: relative;


    img:first-of-type {
      margin-right: 12px;
    }

    p:last-child {
      font-size: 24px;
      color: #999;
      margin-left: 5px;
    }
  }

  .top-right {
    display: flex;
    align-items: center;
    position: relative;

    .diadema {
      display: block;
      width: 30px;
      height: auto;
      position: absolute;
      right: 0;
      top: -18px;
    }

    img {
      margin-left: 12px;
    }

    p:first-child {
      font-size: 24px;
      color: #999;
      margin-right: 5px;
    }
  }
}

.both {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 24px;

  div {
    position: relative;
    display: flex;
    align-items: center;
  }

  .diadema {
    display: block;
    width: 30px;
    height: auto;
    position: absolute;
    top: -23px;
    &.lf {
      left: 32px;
    }
    &.rt {
      right: 32px;
    }
  }

  div:first-child {
    p {
      background: #4ea0f5;
      color: #fff;
      font-weight: bold;
      padding: 8px 24px;
      border-radius: 0 24px 24px 24px;
      margin-right: 12px;
    }

    span {
      color: #4ea0f5;
    }
  }

  div:last-child {
    p {
      background: #ec6f66;
      color: #fff;
      font-weight: bold;
      padding: 8px 24px;
      border-radius: 24px 0 24px 24px;
      margin-left: 12px;
    }

    span {
      color: #ec6f66;
    }
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
</style>

