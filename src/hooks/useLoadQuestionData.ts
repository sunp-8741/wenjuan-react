import { useParams } from 'react-router-dom'
import { getQuestionService } from '@/services/question.ts'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '@/store/componentsReducer'
import { resetPageInfo } from '@/store/PageInfoReducer.ts'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  const { run, data, loading, error } = useRequest(async (id: string) => {
    if (!id) throw new Error('没有问卷id')
    return await getQuestionService(id)
  })

  useEffect(() => {
    if (!data) return
    const { componentList = [], title = '', desc = '', js = '', css = '', isPublished } = data
    let selectedId = ''
    if (componentList.length) {
      selectedId = componentList[0].fe_id
    }
    dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }))
  }, [data])
  useEffect(() => {
    run(id)
  }, [id])
  return { loading, error }
}

export default useLoadQuestionData
