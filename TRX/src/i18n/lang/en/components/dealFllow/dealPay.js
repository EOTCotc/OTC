export default {
  text: [
    'Limit',
    'Payment method',
    'Select',
    'Transaction',
    'WeChat',
    'Available',
    'Payable',
    'Purchase',
  ],
  payType: {
    label: 'payment method',
    value: {
      yhk: 'Bank card',
      zfb: 'Alipay',
      wx: 'WeChat Payat Pay',
      xj: 'cash',
    },
  },
  tip: [
    'Please use your real-name account to receive payment',
    'Otherwise, the order will fail and the account will be frozen',
  ],
  loading: {
    text: ['Order being placed...', 'Order is being placed, please wait...'],
  },
  toast: {
    error: [
      'You did not fill in the current payment method',
      'Please select again!',
      'Please select a payment method',
      'Please re-sign',
      'EOTC requests your signature confirmation, signature does not consume GAS.',
      'Cannot buy your own order',
      'The amount of USDT in this order is insufficient',
      'Please select another order',
      'The merchant has modified the order price, please place the order again',
      'You have canceled the order many times, please place another order tomorrow',
      'You still have unprocessed order',
      'please complete the order before placing an order',
    ],
  },
};
