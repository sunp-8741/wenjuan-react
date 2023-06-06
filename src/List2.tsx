import { FC, useEffect, useState } from 'react'
import { produce } from 'immer'
import { Button, Card } from 'antd'

export const List2: FC = () => {
  useEffect(() => {
    console.log('加载')
    return () => {
      console.log('销毁')
    }
  }, [])
  const [questionList, setQuestionList] = useState([
    { id: 'q1', title: '问卷1', isPublished: false },
    { id: 'q2', title: '问卷2', isPublished: true },
    { id: 'q3', title: '问卷3', isPublished: false },
    { id: 'q4', title: '问卷4', isPublished: true },
  ])

  useEffect(() => {
    console.log('questionlist')
  }, [questionList])

  function add() {
    const r = Math.random().toString().slice(-3)
    setQuestionList(
      produce(draft => {
        draft.push({
          id: 'q' + r,
          title: '问卷' + r,
          isPublished: false,
        })
      })
    )
  }
  function deleteQuestion(id: string) {
    setQuestionList(
      produce(draft => {
        const index = draft.findIndex(question => question.id === id)
        draft.splice(index, 1)
      })
    )
  }

  function publistQuestion(id: string) {
    setQuestionList(
      produce(draft => {
        const question = draft.find(q => q.id === id)
        if (question) question.isPublished = true
      })
    )
  }
  const listCard = questionList.map(question => {
    return (
      <Card
        title={question.title}
        extra={question.isPublished ? '已发布' : '未发布'}
        key={question.id}
      >
        <Button type="primary" onClick={() => publistQuestion(question.id)}>
          发布问卷
        </Button>
        <Button type="dashed" onClick={() => deleteQuestion(question.id)}>
          删除问卷
        </Button>
      </Card>
    )
  })
  return (
    <div>
      <h1>问卷列表</h1>
      {listCard}
    </div>
  )
}
