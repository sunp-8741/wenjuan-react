import { useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY,
} from '@/constant'
import { getQuestionListService } from '@/services/question.ts'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

export default function (option: Partial<OptionType> = {}) {
  const { isDeleted = false, isStar = false } = option
  const [searchParams] = useSearchParams()
  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE

      return await getQuestionListService({ keyword, isDeleted, isStar, page, pageSize })
    },
    {
      refreshDeps: [searchParams],
    }
  )
  return { data, loading, error, refresh }
}
