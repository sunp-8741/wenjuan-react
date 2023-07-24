import { FC } from 'react'
import {
  QuestionParagraphDefaultProps,
  QuestionParagraphPropsType,
} from '@/components/QuestionComponents/QuestionPargraph/interface.ts'
import { Typography } from 'antd'

export const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter } = { ...QuestionParagraphDefaultProps, ...props }
  const textList = text.split('\n')
  return (
    <Typography.Paragraph className={`${isCenter ? 'text-center' : 'text-start'} mb-0`}>
      {textList.map((t, index) => (
        <span className="block" key={index}>
          {t}
        </span>
      ))}
    </Typography.Paragraph>
  )
}
