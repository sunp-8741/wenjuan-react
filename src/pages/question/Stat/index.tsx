import { FC } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData.ts'

export const Stat: FC = () => {
  const { loading, data } = useLoadQuestionData()

  return (
    <div>
      <p>stat page</p>
      {loading ? <p>loading</p> : <div>{JSON.stringify(data)}</div>}
    </div>
  )
}
