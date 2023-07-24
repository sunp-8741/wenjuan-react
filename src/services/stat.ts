import { SearchOption } from '@/services/question.ts'
import axios, { ResDataType } from './ajax.ts'

export async function getQuestionStatListService(
  questionId: string,
  params: Partial<SearchOption>
) {
  return (await axios.get(`/api/stat/${questionId}`, { params })) as ResDataType
}

// 获取组件统计数据汇总
export async function getComponentStatService(questionId: string, componentId: string) {
  return (await axios.get(`/api/stat/${questionId}/${componentId}`)) as ResDataType
}
