import { useParams } from 'react-router-dom'
import { getQuestionService } from '@/services/question.ts'
import { useRequest } from 'ahooks'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  async function load() {
    return await getQuestionService(id)
  }
  const { loading, data, error } = useRequest(load)
  return { loading, data, error }
}

export default useLoadQuestionData
