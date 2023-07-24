import { QuestionInput } from '@/components/QuestionComponents/QuestionInput/Component.tsx'
import { QuestionInputDefaultProps } from '@/components/QuestionComponents/QuestionInput/interface.ts'
import { PropsComponent } from './PropsComponent.tsx'

export * from './interface.ts'

export default {
  title: '输入框',
  type: 'questionInput',
  Component: QuestionInput,
  PropsComponent,
  defaultProps: QuestionInputDefaultProps,
}
