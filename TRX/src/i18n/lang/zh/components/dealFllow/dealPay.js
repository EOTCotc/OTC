export default {
  text: [
    '限额',
    '支付方式',
    '选择',
    '交易',
    '微信',
    '可得',
    '应付',
    '购买'
  ],
  payType: {
    label: '支付方式',
    value: {
      yhk: '银行卡',
      zfb: '支付宝',
      wx: '微信支付',
      xj: '现金',
    }
  },
  tip: [
    '请使用本人实名账户进行收款',
    '否则会导致订单失败且账号存在被冻结风险'
  ],
  loading: {
    text: ['订单生成中…', '正在下单，请稍等…']
  },
  toast: {
    error: [
      '您没有填写当前支付方式',
      '请重新选择!',
      '请选择支付方式',
      '请重新签名',
      'EOTC请求您签名确认,签名不消耗GAS.',
      '不能购买自己的订单',
      '该订单USDT数量已不足',
      '请选择其它订单',
      '商家已修改订单价格，请重新下单',
      '您多次撤销订单，请明天再下单',
      '您还有未处理的订单',
      '请完成该订单后再下单'
    ]
  }
}