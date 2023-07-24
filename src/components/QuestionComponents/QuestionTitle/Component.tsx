import { FC } from 'react'
import {
  QuestionTitlePropsType,
  QuestionTypeDefaultProps,
} from '@/components/QuestionComponents/QuestionTitle/interface.ts'
import { Typography } from 'antd'
const { Title } = Typography
export const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTypeDefaultProps, ...props }

  const sizes = {
    1: '24px',
    2: '20px',
    3: '16px',
  }
  return (
    <Title
      level={level}
      className={`${isCenter ? 'text-center' : 'text-start'} mb-0}`}
      style={{ fontSize: sizes[level] }}
    >
      {text}
    </Title>
  )
}
