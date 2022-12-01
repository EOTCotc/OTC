import http from './http';

// 获取仲裁消息列表
export const getarbitratemessage=(data)=>{
  return http({
    url:'/api/arbitrate/getarbitratemessage',
    method:'POST',
    data
  })
}

// 获取仲裁消息列表
export const getmessageopen=(data)=>{
  return http({
    url:'/api/arbitrate/getmessageisopen',
    method:'POST',
    data
  })
}

// 获取原被告延期消息
export const getarbitratedelay=(data)=>{
  return http({
    url:'/api/arbitrate/getarbitratedelay',
    method:'POST',
    data
  })
}

// 申请延期投票
export const arbitratedelayvote=(data)=>{
  return http({
    url:'/api/arbitrate/arbitratedelayvote',
    method:'POST',
    data
  })
}

// 追加举证
export const getadducelist=(data)=>{
  return http({
    url:'/api/arbitrate/getadducelist',
    method:'POST',
    data
  })
}

// 获取取消仲裁消息
export const getcancelarbitrate=(data)=>{
  return http({
    url:'/api/arbitrate/getcancelarbitrate',
    method:'POST',
    data
  })
}

// 结案通知
export const getclosure=(data)=>{
  return http({
    url:'/api/arbitrate/getclosure',
    method:'POST',
    data
  })
}

// 设置消息为已读
export const setmessageisopen=(data)=>{
  return http({
    url:'/api/arbitrate/setmessageisopen',
    method:'POST',
    data
  })
}

// 获取未处理消息
export const pendingMsg=()=>{
  return http({
    url:'/api/arbitrate/getwaitmessage',
    method:'POST'
  })
}

