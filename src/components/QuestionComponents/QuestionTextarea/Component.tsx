import { FC } from 'react'
import { Input, Typography } from 'antd'
import {
  QuestionTextareaDefaultProps,
  QuestionTextareaPropsType,
} from '@/components/QuestionComponents/QuestionTextarea/interface.ts'
const { Paragraph } = Typography
export const QuestionTextarea: FC<QuestionTextareaPropsType> = (
  props: QuestionTextareaPropsType
) => {
  const { title, placeholder } = { ...QuestionTextareaDefaultProps, ...props }
  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <div>
        <Input.TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}
