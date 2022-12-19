export default {
  form: {
    title: '身份认证',
    name: {
      label: '姓名',
      placeholder: '请输入真实姓名',
      message: '长度至少为三个字母'
    },
    phone: {
      label: '手机号',
      placeholder: '请输入手机号码',
      message: '请输入正确的手机号'
    },
    id: {
      label: '证件号',
      placeholder: '请输入证件号码',
      message: '请输入正确的证件号码'
    },
  },
  portrait: {
    title: '示例图片',
    text: '上传身份证人像面',
    button: '点击上传人像面',
    tip: [
      '*请按照示例图来上传身份证人像面照片',
      '您上传的身份证照片进行局部模糊后，将由不同的节点审核。'
    ]
  },
  national: {
    title: '示例图片',
    text: '上传身份证国徽面',
    button: '点击上传国徽面',
    tip: [
      '*请按照示例图来上传身份证国徽面照片'
    ]
  },
  handHeld: {
    title: '示例图片',
    text: '上传手持证件照',
    button: '点击上传手持证件照',
    tip: [
      '*请按照示例图来上传手持身份证照片'
    ]
  },
  next: '下一步',
  submit: {
    button: '提交',
    error: '请重新提交'
  },
  validate: {
    error: '证件号码已被认证'
  },
}