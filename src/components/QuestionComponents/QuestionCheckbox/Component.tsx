import { FC } from 'react'
import {
  QuestionCheckboxDefaultProps,
  QuestionCheckboxPropsType,
} from '@/components/QuestionComponents/QuestionCheckbox/interface.ts'
import { Checkbox, Space, Typography } from 'antd'

export const QuestionCheckbox: FC<QuestionCheckboxPropsType> = (
  props: QuestionCheckboxPropsType
) => {
  const { title, isVertical, list = [] } = { ...QuestionCheckboxDefaultProps, ...props }
  return (
    <div>
      <Typography.Paragraph strong>{title}</Typography.Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map(opt => {
          const { value, checked, text } = opt
          return (
            <Checkbox value={value} checked={checked} key={value}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}
