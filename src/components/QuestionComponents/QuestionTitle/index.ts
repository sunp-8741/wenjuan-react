import { QuestionTitle } from '@/components/QuestionComponents/QuestionTitle/Component.tsx'
import { QuestionTypeDefaultProps } from '@/components/QuestionComponents/QuestionTitle/interface.ts'
import { PropsComponent } from './PropsComponent.tsx'

export * from './interface.ts'

export default {
  title: '标题',
  type: 'questionTitle',
  Component: QuestionTitle,
  PropsComponent,
  defaultProps: QuestionTypeDefaultProps,
}
