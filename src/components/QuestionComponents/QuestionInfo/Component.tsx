import { FC } from 'react'
import { Typography } from 'antd'
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface.ts'
export const QuestionInfo: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title = '', desc = '' } = { ...QuestionInfoDefaultProps, ...props }
  const textList = desc.split('\n')
  return (
    <div className="text-center">
      <Typography.Title>{title}</Typography.Title>
      <Typography.Paragraph>
        {textList.map((t, index) => (
          <span className="block" key={index}>
            {t}
          </span>
        ))}
      </Typography.Paragraph>
    </div>
  )
}
