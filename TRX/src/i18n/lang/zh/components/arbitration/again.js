export default {
  navbar: ['申请再仲裁', '发起仲裁'],
  unit: '人',
  form: {
    title: '特别提示:\n伪造变造打款凭证是严重违法行为，如提交相关查询密码请注意保证个人资产安全',
    event: {
      title: '仲裁事件',
      label: '文字信息举证',
      placeholder: '描述具体情况及提供仲裁员可核实情况所需信息',
      type: ['仲裁异议', '其他']
    },
    upload: {
      title: ['图片信息举证', '具有法律效力的相关举证'],
    },
    arbitrator: {
      title: '增加仲裁员',
      default: '默认',
    },
    pay: {
      title: '需支付',
      explain: {
        start: [
          '说明: 发起仲裁后平台将委派',
          '位仲裁员进行判决',
          '需要支付',
          '如取消仲裁或最终仲裁胜诉',
          '将返还至您的账户'
        ],
        again: [
          '说明: 申请再仲裁需支付',
          '仲裁员默认',
          '追加仲裁员一名需支付'
        ]
      }
    },
    submit: '提交'
  },
  popup: {
    title: '确认提交并支付',
    text: '每人仅可提交一次延期申请，请认真填写，是否确定提交该申请延期并支付？',
    checkbox: '我已确认',
    submit: '确定提交并支付',
    cancel: '我再想想'
  }
}