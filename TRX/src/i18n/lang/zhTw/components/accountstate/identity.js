export default {
  form: {
    title: '身份認證',
    name: {
      label: '姓名',
      placeholder: '請輸入真實姓名',
      message: '長度至少為三個字母',
    },
    phone: {
      label: '手機號',
      placeholder: '請輸入手機號碼',
      message: '請輸入正確的手機號',
    },
    id: {
      label: '證件號',
      placeholder: '請輸入證件號碼',
      message: '請輸入正確的證件號碼',
    },
  },
  portrait: {
    title: '示例圖片',
    text: '上傳身份證人像面',
    button: '點擊上傳人像面',
    tip: [
      '*請按照示例圖來上傳身份證人像面照片',
      '您上傳的身份證照片進行局部模糊後，將由不同的節點審核。',
    ],
  },
  national: {
    title: '示例圖片',
    text: '上传身份证国徽面',
    button: '点击上传国徽面',
    tip: ['*请按照示例图来上传身份证国徽面照片'],
  },
  handHeld: {
    title: '示例图片',
    text: '上傳手持證件照',
    button: '點擊上傳手持證件照',
    tip: ['*請按照示例圖來上傳手持身份證照片'],
  },
  next: '下一步',
  submit: {
    button: '提交',
    error: '請重新提交',
  },
  validate: {
    error: '證件號碼已被認證',
  },
};
