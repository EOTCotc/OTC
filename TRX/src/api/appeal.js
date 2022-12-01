import http from '@/api/http'
import request from "@/utils/request";

export const submit = (data) => http.post('/api/arbitrate/addarbitrateinfo', data)
// 上传图片
export const upload = (data) => http.post(`/api/destruction/uploadimage?type=arbitration`, data, {headers: {'Content-Type': 'multipart/form-data'}})
// 获取仲裁费用
export const cost = params => http.get("api/reward/getarbdayeotc", { params });

// 仲裁扣费
// type: 0 发起仲裁 1：举证延期 2：仲裁异议
export const deductCoins = params => request.post("/api/DID/DeductCoins", {}, { params });