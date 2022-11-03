<template>
  <van-pull-refresh v-model="loading" @refresh="getList">
    <div class="content">
      <template v-if="!!list.data.length">
        <div class="listbox" v-for="item in list.data" :key="item.arbitrateInfoId">
          <div class="top">
            <div class="top-left">
              <van-icon name="underway-o" />
              <p v-if="item.status === 0">
                <van-count-down :time="item.time" format="DD 天 HH 时 mm 分 " />
              </p>
              <p v-else>{{ $t('components.arbitration.pending.title') }}</p>
            </div>
            <p>{{ transformDate(item.adduceDate) }}</p>
          </div>
          <div class="van--bottom"></div>
          <both :info="item" />
          <div class="text">{{ $t('components.arbitration.pending.event.text') }}{{ getArbitrateType(item.arbitrateInType) }}</div>
          <van-row class="buttons" :gutter='15'>
            <van-col
              v-if="!item.hasDelay && item.status === 0"
              :span='12'
            >
              <van-button
                block
                plain
                round
                type="info"
                :to="{ name: 'adjourn', query: { id: item.arbitrateInfoId }  }"
              >
                {{ $t('components.arbitration.pending.delay') }}
              </van-button>
            </van-col>
            <van-col :span='(!item.hasDelay && item.status === 0) ? 12 : 24'>
              <van-button
                block
                round
                type="info"
                :to="{ name: 'details', query: { id: item.arbitrateInfoId } }">
                <van-icon name="description" />
                {{ $t('components.arbitration.pending.detail') }}
              </van-button>
            </van-col>
          </van-row>
        </div>
      </template>
      <van-empty
        v-else
        :image="require('../../assets/currency-icons/empty.png')"
        :description="$t('components.arbitration.pending.empty')"
      />
    </div>
  </van-pull-refresh>
</template>

<script>
import both from "@/components/arbitration/module/both.vue";
import {list} from '@/api/arbitration'
import {
  getArbitrateType,
  transformDate,
  $toast,
  $loading
} from '@/utils/utils'
export default {
  //待处理仲裁案
  components: {
    both,
  },
  data() {
    return {
      loading: false,
      list: {
        data: [],
      },
    };
  },
  created() {
    this.getList()
  },
  methods: {
    transformDate,
    getArbitrateType,
    getList() {
      const loading = $loading(this.$t('components.arbitration.pending.loading.text'))
      this.loading = true
      list(0).then(res => {
        const now = this.$dayjs()
        this.list.data = res.items.map(item => {
          const start = this.$dayjs(item.status === 0 ? item.adduceDate : item.voteDate).add(-8, 'hour')
          item.time = start.diff(now, 'millisecond')
          item.total = item.plaintiffNum + item.defendantNum
          return item
        })
      }).catch(err => {
        $toast('fail', this.$t('components.arbitration.pending.loading.fail'))
      }).finally(() => {
        this.loading = false
        loading.clear()
      })
    }
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 24px;
  .listbox {
    padding: 32px 32px 40px;
    background: #fff;
    border-radius: 20px;
    margin-bottom: 20px;
    font-size: 28px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      .top-left {
        color: #237ff8;
        /deep/.van-count-down {
          color: #237ff8;
        }
      }
      div {
        display: flex;
        align-items: center;
        font-size: 32px;
        font-weight: bold;
        i {
          font-size: 48px;
        }
        p {
          margin-left: 12px;
        }
      }
    }
    .van--bottom {
      border-bottom: 1px #f3f4f5 solid;
      margin-bottom: 30px;
    }
    .text {
      padding: 24px;
      background: #f3f4f5;
      border-radius: 20px;
      margin-top: 20px;
    }
    .details {
      /deep/.van-cell {
        padding-left: 0;
        margin-top: 20px;
      }
      /deep/.van-cell__left-icon {
        color: #237ff8;
      }
      /deep/.van-cell__title {
        color: #237ff8;
      }
    }
    .buttons {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      button {
        flex: 1;
      }
    }
  }
  .judgmentbox {
    margin-top: 30px;
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
  }
}
</style>
