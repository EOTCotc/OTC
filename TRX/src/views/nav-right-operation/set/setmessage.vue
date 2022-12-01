<template>
  <div>
    <Navwhite :title="asd"></Navwhite>
    <div class="content">
      <van-form ref="info_form">
        <van-field
          ref="setName-input"
          :value="name"
          :label="$t('views.operation.message.label[0]')"
          rows="1"
          readonly
          type="textarea"
          class="set-name"
        />
        <van-field
          v-model="nickname"
          :label="$t('views.operation.message.label[1]')"
          @input="onInput(20, $event, nickname)"
          placeholder="$t('views.operation.message.placeholder[0]')"
          :rules="rules.nickname_Rules"
        />
        <van-field
          v-model="phone"
          type="tel"
          :label="$t('views.operation.message.label[2]')"
          :rules="rules.phone_Rules"
          placeholder="$t('views.operation.message.placeholder[1]')"
        />
        <van-field
          v-model="sell"
          autosize
          :label="$t('views.operation.message.label[3]')"
          type="textarea"
          maxlength="256"
          placeholder="$t('views.operation.message.placeholder[2]')"
          show-word-limit
        />
        <van-field
          v-model="buy"
          autosize
          :label="$t('views.operation.message.label[4]')"
          type="textarea"
          maxlength="256"
          placeholder="$t('views.operation.message.placeholder[2]')"
          show-word-limit
        />
      </van-form>
      <div class="button_flex">
        <div class="button">
          <van-button
            type="primary"
            @click="on_submit"
            round
            block
            color="#1B2945"
          >
            {{ $t("views.operation.message.submit") }}
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navwhite from "@/components/Nav/white.vue";

import { Bususer, SetBususer } from "@/api/payverification";

export default {
  name: "set-message", //商家信息 设置 + 修改  setmessage
  components: {
    Navwhite,
  },
  created() {
    // this.get_initInfo();
  },
  data() {
    return {
      asd: this.$t("views.operation.message.title"),
      name: localStorage.getItem("uname"), //商家实名认证 姓名
      nickname: "", // 商家店名
      phone: "", // 手机号
      sell: "", // 出售提示
      buy: "", //收购提示
      checkField_flg: false, // 商家店名设置
      curTime: 0,
      rules: {
        nickname_Rules: [
          {
            required: true,
            validator: this.checkField_flg,
          },
        ],
        phone_Rules: [
          {
            required: true,
            validator: this.phone_validator,
          },
        ],
      },
    };
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const { data } = await Bususer();
      next((vm) => {
        vm.get_initInfo(null, data);
      });
    } catch (err) {
      next((vm) => {
        vm.get_initInfo(err, null);
      });
    }
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  methods: {
    async get_initInfo(err, data) {
      if (err || data == null) {
        this.$toast.error(this.$t("views.operation.message.toast[0]"));
        return false;
      }
      this.nickname = data?.sname.trim();
      this.phone = data?.dsx;
      this.sell = data?.smes;
      this.buy = data?.mes;
    },
    on_submit() {
      this.$refs["info_form"]
        .validate()
        .then(async () => {
          // 验证通过
          try {
            await SetBususer({
              sname: this.nickname,
              stel: this.phone,
              mes: this.buy,
              smes: this.sell,
            });
            this.$toast.success(this.$t("views.operation.message.toast[1]"));
            this.$router.replace({
              name: "order-Ticket",
              params: {
                setShow: true,
                active: this.$route.params.active,
              },
            });
          } catch (err) {
            console.warn(err);
          }
        })
        .catch(() => {
          //验证失败
          this.$toast.error(this.$t("views.operation.message.toast[2]"));
        });
    },
    onInput(maxLength, e, type) {
      this.checkField(e, maxLength, type);
    },
    //定义一个函数 最大28个字节 的函数
    checkField(value, byteLength, type) {
      let time = Date.now(); // 节流
      // value是input框的值,byteLength是需求限制的字符，attribute是input的id名
      var newvalue = value.replace(/[^\x00-\xff]/g, "**");
      var length = newvalue.length;

      //当填写的字节数小于设置的字节数
      if (length * 1 <= byteLength * 1) {
        this.checkField_flg = true;
        return;
      }
      var limitDate = newvalue.substr(0, byteLength);
      var count = 0;
      var limitvalue = "";
      for (var i = 0; i < limitDate.length; i++) {
        var flat = limitDate.substr(i, 1);
        if (flat == "*") {
          count++;
        }
      }
      var size = 0;
      var istar = newvalue.substr(byteLength * 1 - 1, 1); //校验点是否为“×”
      //if 基点是×; 判断在基点内有×为偶数还是奇数
      if (count % 2 == 0) {
        //当为偶数时
        size = count / 2 + (byteLength * 1 - count);
        limitvalue = value.substr(0, size);
      } else {
        //当为奇数时
        size = (count - 1) / 2 + (byteLength * 1 - count);
        limitvalue = value.substr(0, size);
      }
      const lang = byteLength / 2;
      if (time - this.curTime > 800) {
        this.curTime = time;
        this.$toast.warning(
          <div>
            <p style="font-size:13px;margin:5px">
              {this.$t("views.operation.message.max")}
              {byteLength}
              {this.$t("views.operation.message.byte")}
            </p>
            <p style="font-size:16px;margin:5px">
              {" "}
              {this.$t("views.operation.message.fairly")}
              {lang} {this.$t("views.operation.message.Chinese")}
            </p>
          </div>
        );
        this.checkField_flg = false;
        return false;
      }
      //console.log(333);
      this[type] = limitvalue;

      return;
    },
    phone_validator() {
      // //console.log(this.phone.length)
      //13-- 15--- 188 189--
      this.$toast.clear();

      const phone_flg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          this.phone
        );
      if (phone_flg) {
        return true;
      } else {
        this.$toast.error(this.$t("views.operation.message.toast[2]"));
        return false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.set-name {
  /deep/ .van-field__control {
    min-height: auto !important;
  }
}
.content {
  padding: 20px 0 60px;
  /deep/.van-field__label {
    font-weight: bold;
  }
}
.button_flex {
  display: flex;
  justify-content: center;
  .button {
    width: 90%;
    height: 96px;
    margin-top: 400px;
  }
}
.van-count-down {
  font-size: 0.4rem;
  background-color: #eee;
  width: 60px;
  height: 60px;
  color: #000;
  text-align: center;
  line-height: 60px;
  border-radius: 50%;
}
</style>
>
