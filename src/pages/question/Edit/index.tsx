import { FC } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData.ts'

export const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData()
  return (
    <div>
      <p>edit page</p>
      {loading ? <p>loading</p> : <div>{JSON.stringify(data)}</div>}
    </div>
  )
}
