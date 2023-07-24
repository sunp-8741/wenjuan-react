import { FC } from 'react'
import {
  QuestionRadioDefaultProps,
  QuestionRadioPropsType,
} from '@/components/QuestionComponents/QuestionRadio/interface.ts'
import { Radio, Space, Typography } from 'antd'

export const QuestionRadio: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, options = [], value, isVertical } = { ...QuestionRadioDefaultProps, ...props }
  return (
    <div>
      <Typography.Paragraph strong>{title}</Typography.Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map(opt => {
            const { value, text } = opt
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}
