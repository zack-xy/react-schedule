import type { ResDataType } from './ajax'
import axios from './ajax'

interface SearchOpton {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = '/api/question/create'
  const data = (await axios.post(url)) as ResDataType
  return data
}

// 获取问卷列表
export async function getQuestionListService(opt: Partial<SearchOpton> = {}): Promise<ResDataType> {
  const url = '/api/questions/list'
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}

// 更新单个问卷
export async function updateQuestionService(id: string, opt: Record<string, any>): Promise<ResDataType> {
  const url = `/api/question/${id}`
  const data = (await axios.patch(url, opt)) as ResDataType
  return data
}
