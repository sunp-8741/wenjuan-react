import { QuestionTextarea } from './Component.tsx'
import { PropsComponent } from './PropsComponent.tsx'
import { QuestionTextareaDefaultProps } from '@/components/QuestionComponents/QuestionTextarea/interface.ts'

export * from './interface.ts'

export default {
  title: '多行输入框',
  type: 'questionTextarea',
  Component: QuestionTextarea,
  PropsComponent,
  defaultProps: QuestionTextareaDefaultProps,
}
