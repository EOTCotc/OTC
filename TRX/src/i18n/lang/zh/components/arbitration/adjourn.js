export default {
  navbar: "申请延期",
  form: {
    title: "申请延期需满足以下一种条件",
    status: [
      "举证时间不足",
      "核实信息还在审核中",
      "举证不足,无法进行判决",
      "部分举证不全"
    ],
    explain: {
      title: "申请延期说明",
      placeholder: "请描述申请延期的说明",
    },
    time: {
      title: "申请延期时间",
      day: "天"
    },
    pay: {
      label: "需支付",
      text: "说明: 申请延期根据延期时间需支付"
    },
    submit: {
      button: "提交",
      loading: "提交中…",
      success: "提交成功",
      fail: "提交失败！"
    }
  },
  popup: {
    title: "确认提交并支付",
    text: "每人仅可提交一次延期申请，请认真填写，是否确定提交该申请延期并支付？",
    checkbox: "我已确认",
    submit: "确定提交并支付",
    cancel: "我再想想"
  },
}