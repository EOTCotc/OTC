<template>
  <div class="main">
    <white :title="title"></white>
    <div class="content">
      <div class="gross">
        <p class="title">交易总量</p>
        <div class="grossBox">
          <div>
            <p>总交易量(USDT)</p>
            <p>50.45万</p>
          </div>
          <div></div>
          <div>
            <p>总交易人数(人)</p>
            <p>5.28万</p>
          </div>
        </div>
      </div>
      <div class="chart">
        <p class="chartTitle">交易数据图表</p>
        <div class="chartBox">
          <div class="boxTop">
            <p>USDT购买出售情况</p>
            <div class="zysh">
              <p
                class="buysell"
                :class="{ 'active-btn': !isPledges }"
                size="large"
                @click="isPledge()"
              >交易量</p>
              <p
                :class="{ 'active-btn': isPledges }"
                class="btn2 buysell"
                plain
                size="large"
                @click="isPledge()"
              >人数</p>
            </div>
          </div>
          <div class="boxCenter">
            <span
              :class="{'active':item.show}"
              v-for="(item,index) in date"
              :key="index"
              @click="dateClick(index)"
            >{{item.name}}</span>
          </div>
          <div class="cavan">
            <div id="main"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Dialog } from 'vant'
import white from '@/components/Nav/white.vue'
export default {
  components: {
    white,
  },
  data() {
    return {
      title: '交易数据',
      isPledges: true,
      date: [
        { name: '日', show: true },
        { name: '月', show: false },
        { name: '年', show: false },
      ],
    }
  },
  mounted() {
    this.drawChart()
  },
  methods: {
    dateClick(index) {
      for (let i of this.date) {
        i.show = false
      }
      this.date[index].show = true
    },
    isPledge() {
      this.isPledges = !this.isPledges
      if (this.isPledges) {
        this.drawChart(1)
      } else {
        this.drawChart()
      }
    },
    drawChart(index) {
      let data1 = [10, 5, 30, 12, 3, 5, 8, 12, 16, 30, 20, 40]
      let data2 = [20, 10, 5, 20, 30, 36, 40, 50, 32, 24, 10, 8]
      if (index) {
        data1 = [50, 57, 60, 10, 30, 50, 80, 20, 60, 30, 15, 9]
        data2 = [60, 70, 3, 22, 33, 23, 44, 50, 36, 74, 10, 34]
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'))
      // 绘制图表
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        toolbox: {
          // feature: {
          //   dataView: { show: true, readOnly: false },
          //   magicType: { show: true, type: ['line', 'bar'] },
          //   restore: { show: true },
          //   saveAsImage: { show: true }
          // }
        },
        legend: {
          data: ['购买(USDT)', '出售(USDT)'],
        },
        xAxis: [
          {
            type: 'category',
            data: ['9/30', '10/1', '10/2', '10/3', '10/4', '10/5', '10/6'],
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        grid: {
          top: 48,
          left: 50, // 调整这个属性
          right: 10,
          bottom: 50,
        },
        yAxis: [
          {
            type: 'value',
            // name: 'Precipitation',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value}万',
            },
          },
          // {
          //   type: 'value',
          //   name: 'Temperature',
          //   min: 0,
          //   max: 25,
          //   interval: 5,
          //   axisLabel: {
          //     formatter: '{value} °C'
          //   }
          // }
        ],
        series: [
          {
            name: '购买(USDT)',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml'
              },
            },
            data: data1,
            itemStyle: {
              color: '#00B87A',
            },
          },
          {
            name: '出售(USDT)',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml'
              },
            },
            data: data2,
            itemStyle: {
              color: '#FC7542',
            },
          },
        ],
      }
      myChart.setOption(option)
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  background: #f3f4f5;
  .content {
    padding: 30px;
    font-size: 32px;
    .gross {
      margin-bottom: 40px;
      .title {
        margin-bottom: 30px;
      }
      .grossBox {
        padding: 17px 0 35px 0;
        background: #fff;
        border-radius: 16px;
        display: flex;
        justify-content: space-around;
        div {
          p:first-child {
            margin-bottom: 5px;
            font-size: 24px;
            color: #666;
          }
          p:last-child {
            font-size: 36px;
            font-weight: bolder;
          }
        }
        div:nth-child(2) {
          border-right: 1px solid #ccc;
        }
      }
    }
    .chart {
      .chartTitle {
        margin-bottom: 40px;
      }
      .chartBox {
        padding: 40px 30px;
        border-radius: 16px;
        background: #fff;
        .boxTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          .zysh {
            width: 200px;
            display: flex;
            justify-content: space-around;
            font-size: 28px;
            padding: 4px;
            background-color: #f1f1f1;
            border-radius: 8px;
            .buysell {
              width: 50%;
              text-align: center;
              padding: 10px 6px;
              border-radius: 8px;
              background-color: #fff;
              color: #000;
            }
            .active-btn {
              background-color: #f1f1f1;
              color: #999;
            }
          }
        }
        .boxCenter {
          margin-bottom: 30px;
          span {
            padding: 4px 36px;
          }
          .active {
            background: #f1f1f1;
            border-radius: 8px;
          }
        }
        
          #main {
            width: 100%;
            height: 600px;
          }
      }
    }
  }
}
</style>
