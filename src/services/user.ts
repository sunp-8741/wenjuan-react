import axios, { ResDataType } from './ajax.ts'
import { IRegisterUser } from '@/types/question.ts'

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  return (await axios.get('/api/user/info')) as ResDataType
}

// 注册用户
export async function registerService(data: IRegisterUser) {
  return (await axios.post('/api/user/register', data)) as ResDataType
}

// 登录
export async function loginService(data: IRegisterUser) {
  return (await axios.post('/api/user/login', data)) as ResDataType
}
