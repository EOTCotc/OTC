<template>
  <div>
    <white :title="title"></white>
    <!-- <div class="reminder">
      特别提示:
      伪造变造打款凭证是严重违法行为，如提交相关查询密码请注意保证个人资产安全
    </div> -->
    <!-- 申请再仲裁 -->
    <div class="content">
      <div class="event">
        <p class="event_title">{{$route.query.id ? $t("views.appeal.start.content[0]") : $t("views.appeal.start.content[1]") }} {{ $t("views.appeal.start.content[2]") }}</p>
        <div>
          <template v-if="!$route.query.id">
            <p
              :class="{ action: form.data.arbitrateInType === 0 }"
              @click="handleTabClick(0)"
            >
              {{ $t("views.appeal.start.frozen") }}
            </p>
            <p
              :class="{ action: form.data.arbitrateInType === 1 }"
              @click="handleTabClick(1)"
            >
              {{ $t("views.appeal.start.not") }}
            </p>
          </template>
          <p
            v-else
            :class="{ action: form.data.arbitrateInType === 3 }"
            @click="handleTabClick(3)"
          >
            {{ $t("views.appeal.start.dissent") }}
          </p>
          <p
            :class="{ action: form.data.arbitrateInType === 2 }"
            @click="handleTabClick(2)"
          >
            {{ $t("views.appeal.start.other") }}
          </p>
        </div>
      </div>
      <div class="text">
        <p>{{ $t("views.appeal.start.evidence") }}</p>
        <van-field
          v-model="form.data.memo"
          rows="2"
          :autosize="{ maxHeight: 150, minHeight: 150 }"
          type="textarea"
          maxlength="300"
          :placeholder="$t('views.appeal.start.placeholder')"
          show-word-limit
        />
      </div>
      <div class="upimg">
        <p>{{ $t("views.appeal.start.upimg[0]") }}<span>{{ $t("views.appeal.start.upimg[1]") }}</span></p>
        <van-uploader
          v-model="fileList"
          multiple
          :max-count="9"
          :after-read="afterRead"
        />
      </div>
      <div class="add">
        <div class="addFlex">
          <p>{{ $t("views.appeal.start.addFlex[0]") }}<span>{{ $t("views.appeal.start.addFlex[1]")}}11{{$t("views.appeal.start.addFlex[2]")}}</span></p>
          <van-switch v-model="checked" />
        </div>
        <div v-show="checked" class="people" @click="showPicker = true">
          <p>{{ form.data.num }}</p>
          <p>人</p>
        </div>
        <van-popup
          v-model="showPicker"
          round
          position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </div>
      <div class="pay">
        <div>
          <p>{{ $t("views.appeal.start.pay") }}</p>
          <p>{{ money }} EOTC</p>
        </div>
        <p class="explain">{{ explain }}</p>
      </div>
      <div class="footer">
        <van-button
          round
          block
          color="#1B2945"
          :disabled="!form.data.memo || !fileList.length"
          @click="show = true"
        >{{ $t("views.appeal.submit") }}</van-button
        >
      </div>
      <van-popup
        v-model="show"
        position="bottom"
        round
        @closed="readChecked = false"
      >
        <div class="pop">
          <p class="popTitle">{{ $t("views.appeal.start.pop[0]") }}</p>
          <p class="hint">
            {{ $t("views.appeal.start.pop[1]") }}
          </p>
          <van-checkbox v-model="readChecked" shape="square">{{$t("views.appeal.start.pop[2]") }}</van-checkbox>
          <div class="buttons">
            <van-button
              color="#1B2945"
              round
              block
              :disabled="!readChecked"
              @click="handleSubmit"
            >
              {{ $t("views.appeal.start.handle[0]") }}
            </van-button>
            <p @click="hide">{{ $t("views.appeal.start.handle[1]") }}</p>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import white from "@/components/Nav/white.vue";
import {submit, upload, cost, deductCoins} from "@/api/appeal"
import {
  $toast,
  $loading,
  $notify
} from '@/utils/utils'
import {getTrxBalance, SendUSDT} from "@/utils/web3"

export default {
  name: 'appeal',
  //申请再仲裁
  components: { white },
  data() {
    return {
      title: this.$t("appeal.title"),
      //图片上传
      fileList: [],
      //增加开关
      checked: false,
      //增加人数弹出层
      showPicker: false,
      // 是否确认开关
      readChecked: false,
      columns: [],
      show: false,
      explain: "",
      form: {
        data: {
          defendant: "",
          plaintiff: "",
          orderId: "",
          num: 11,
          memo: "",
          images: [],
          arbitrateInType: ""
        }
      }
    };
  },
  created() {
    this.init()
  },

  methods: {
    hide() {
      this.readChecked = false
      this.show = false
    },
    init() {
      const { id, defendant, plaintiff, orderId } = this.$route.query
      this.form.data.plaintiff = plaintiff
      this.form.data.defendant = defendant
      this.form.data.orderId = orderId
      // this.form.data.plaintiff = '3'
      // this.form.data.defendant = '5'
      // this.form.data.orderId = 'string'
      this.columns = []
      for (let i = 11; i < 103; i++) {
        if (i % 2 === 1) {
          this.columns.push(i)
        }
      }
      if (id) {
        this.title = this.$t("views.appeal.start.apply");
        this.form.data.arbitrateInfoId = id
        this.form.data.arbitrateInType = 3
      }
    },
    getColumns () {
      this.columns = []
      for (let i = this.form.data.num; i < 103; i++) {
        if (i % 2 === 1) {
          this.columns.push(i)
        }
      }
    },
    handleTabClick (data) {
      this.form.data.arbitrateInType = data
      this.form.data.num = data > 1 ? 3 : 11
      this.getColumns()
      this.getMoney()
    },
    afterRead(file) {
      file.length ? file.forEach((item, index) => this.uploadImg(item, index)) : this.uploadImg(file, this.form.data.images.length)
    },
    // 上传图片
    uploadImg(file, index) {
      const formData = new FormData();
      formData.append("file", file.file);
      file.status = "uploading";
      file.message = this.$t("views.appeal.start.message[0]");
      upload(formData).then((res) => {
        file.status = "success";
        file.message = this.$t("views.appeal.start.message[1]");
        this.$set(this.form.data.images, index, res.message);
      }).catch(() => {
        file.status = "fail";
        file.message = this.$t("views.appeal.start.message[2]");
        $notify("fail", `${this.$t("views.appeal.start.notify[0]")}${index}${this.$t("views.appeal.start.notify[1]")}`
        );
        this.fileList.splice(index, 1);
      });
    },
    onConfirm(value) {
      this.form.data.num = value;
      this.showPicker = false;
      this.getMoney()
    },
    // 获取仲裁费用
    getMoney () {
      cost({ num: this.form.data.num, type: 1 }).then(res => {
        this.money = res.items
      })
    },
    // 提交申诉信息
    handleSubmit() {
      const loading = $loading(this.$t("appeal.message"));
      // 获取签名
      userSign().then(async res => {
        const payLoading = $loading(this.$t("appeal.success[0]"));
        deductCoins({
          ads: localStorage.getItem('myaddress'),
          sign: localStorage.getItem('mysign'),
          amount: this.money,
          type: this.type
        }).then(res => {
          const submitLoading = $loading(this.$t("appeal.success[2]"));
          submit({
            ...this.form.data,
            images: this.form.data.images.join(',')
          }).then(res => {
            $toast('success', this.$t("appeal.success[3]"), () => this.$router.replace({ name: 'arbitration' }))
          }).catch(err => {
            $toast('fail', this.$t("appeal.success[4]"))
          }).finally(() => {
            submitLoading.clear()
          })
        }).catch(err => {
          $toast('fail', this.$t("appeal.success[1]"))
        }).finally(() => {
          payLoading.clear()
        })
      }).catch(err => {
        $toast('fail', err)
      }).finally(() => {
        loading.clear()
      })
    }
  },
};
</script>

<style lang="less" scoped>
.reminder {
  padding: 24px;
  color: #fc7542;
  background: #fffbe8;
  font-size: 28px;
}
.content {
  padding: 32px 32px 60px;
  font-size: 28px;
  .event {
    margin-bottom: 40px;
    .event_title {
      font-size: 32px;
      margin-bottom: 30px;
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
        // width: 140px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background: #f3f4f5;
        padding: 0 20px;
        border: 2px solid #f3f4f5;
        border-radius: 8px;
        margin: 0 24px 20px 0;
      }
    }
  }
  .text {
    margin-bottom: 40px;
    p {
      font-size: 32px;
      //   font-weight: bold;
      margin-bottom: 20px;
    }
    /deep/.van-cell {
      border: 1px solid #c8cfde;
      border-radius: 20px;
    }
  }
  .upimg {
    margin-bottom: 40px;
    p:first-child {
      font-size: 32px;
      margin-bottom: 20px;
      span {
        font-size: 28px;
        color: #999;
      }
    }
  }
  .add {
    margin-bottom: 80px;
    .addFlex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 32px;
        span {
          font-size: 28px;
          color: #999;
        }
      }
    }
    .people {
      display: flex;
      justify-content: space-between;
      padding: 28px 32px;
      margin-top: 40px;
      border-radius: 8px;
      border: 0.5px solid #c8cfde;
    }
  }
  .pay {
    div {
      display: flex;
      justify-content: space-between;
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 45px;
      p:last-child {
        color: #fc7542;
      }
    }
    .explain {
      color: #999;
    }
  }
  .footer {
    margin-top: 80px;
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
