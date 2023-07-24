import { FC } from 'react'
import { Spin, Typography } from 'antd'
import { QuestionCard } from '@/components/QuestionCard.tsx'
import { ListSearch } from '@/components/ListSearch.tsx'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData.ts'
import { IQuestion } from '@/types/question.ts'
import { ListPage } from '@/components/ListPage.tsx'

const { Title } = Typography
export const Star: FC = () => {
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data

  return (
    <>
      <header className="flex justify-between">
        <div className="flex-1">
          <Title level={3}>我的问卷</Title>
        </div>
        <div className="text-right">
          <ListSearch />
        </div>
      </header>
      <div className="mb-5">
        {loading && (
          <div className="text-center">
            <Spin />
          </div>
        )}
        {!loading &&
          list.length &&
          list.map((q: IQuestion) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className="text-center">
        <ListPage total={total} />
      </div>
    </>
  )
}
