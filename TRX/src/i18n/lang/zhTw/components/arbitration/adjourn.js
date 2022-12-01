export default {
  navbar: '申請延期',
  form: {
    title: '申請延期需滿足以下一種條件',
    status: [
      '舉證時間不足',
      '核實信息還在審核中',
      '舉證不足,無法進行判決',
      '部分舉證不全',
    ],
    explain: {
      title: '申請延期說明',
      placeholder: '請描述申請延期的說明',
    },
    time: {
      title: '申請延期時間',
      day: '天',
    },
    pay: {
      label: '需支付',
      text: '說明: 申請延期根據延期時間需支付',
    },
    submit: {
      button: '提交',
      loading: '提交中…',
      success: '提交成功',
      fail: '提交失敗！',
    },
  },
  popup: {
    title: '確認提交並支付',
    text: '每人僅可提交一次延期申請，請認真填寫，是否確定提交該申請延期並支付？',
    checkbox: '我已確認',
    submit: '確定提交並支付',
    cancel: '我再想想',
  },
};
