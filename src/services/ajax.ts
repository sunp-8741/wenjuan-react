import axios from 'axios'
import { message } from 'antd'
import { getToken } from '@/utils/user-token.ts'

const instance = axios.create({
  timeout: 10 * 1000,
})

// request
instance.interceptors.request.use(
  config => {
    // JWT验证
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData
  if (errno) {
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }
  return data as any
})
export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
