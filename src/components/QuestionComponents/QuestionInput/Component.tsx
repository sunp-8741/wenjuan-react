import { FC } from 'react'
import {
  QuestionInputDefaultProps,
  QuestionInputPropsType,
} from '@/components/QuestionComponents/QuestionInput/interface.ts'
import { Input, Typography } from 'antd'
const { Paragraph } = Typography
export const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }
  return (
    <div>
      <Paragraph>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}
