import type { ResDataType } from './ajax'
import axios from './ajax'

// 获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/user/info'
  const data = (await axios.get(url)) as ResDataType
  return data
}

// 注册用户
export async function registerService(username: string, password: string, nickname?: string): Promise<ResDataType> {
  const url = '/api/user/register'
  const opt = { username, password, nickname: nickname || username }
  const data = (await axios.post(url, opt)) as ResDataType
  return data
}

// 登陆
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const url = '/api/user/login'
  const opt = { username, password }
  const data = (await axios.post(url, opt)) as ResDataType
  return data
}
