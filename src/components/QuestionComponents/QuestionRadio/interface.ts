export type OptionType = {
  value: string
  text: string
}

export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: Array<OptionType>
  value?: string
  disabled?: boolean
  onChange?: (newProps: QuestionRadioPropsType) => void
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    {
      value: 'item1',
      text: '选项1',
    },
    {
      value: 'item2',
      text: '选项2',
    },
    {
      value: 'item3',
      text: '选项3',
    },
  ],
  value: '',
}
// 统计组件属性类型
export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
