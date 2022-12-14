export default {
  navbar: ['申請再仲裁', '發起仲裁'],
  unit: '人',
  form: {
    title:
      '特別提示:\n偽造變造打款憑證是嚴重違法行為，如提交相關查詢密碼請注意保證個人資產安全',
    event: {
      title: '仲裁事件',
      label: '文字信息舉證',
      placeholder: '描述具體情況及提供仲裁員可核實情況所需信息',
      type: ['仲裁異議', '其他'],
    },
    upload: {
      title: ['圖片信息舉證', '具有法律效力的相關舉證'],
    },
    arbitrator: {
      title: '增加仲裁員',
      default: '默認',
    },
    pay: {
      title: '需支付',
      explain: {
        start: [
          '說明: 發起仲裁後平台將委派',
          '位仲裁員進行判決',
          '需要支付',
          '如取消仲裁或最終仲裁勝訴',
          '將返還至您的賬戶',
        ],
        again: ['說明: 申請再仲裁需支付', '仲裁員默認', '追加仲裁員一名需支付'],
      },
    },
    submit: '提交',
  },
  popup: {
    title: '確認提交並支付',
    text: '每人僅可提交一次延期申請，請認真填寫，是否確定提交該申請延期並支付？',
    checkbox: '我已確認',
    submit: '確定提交並支付',
    cancel: '我再想想',
  },
};
