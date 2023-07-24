import { PropsComponent } from './PropsComponent.tsx'
import { QuestionInfo } from './Component.tsx'
import { QuestionInfoDefaultProps } from './interface.ts'

export * from './interface.ts'

export default {
  title: '问卷信息',
  type: 'questionInfo',
  Component: QuestionInfo,
  PropsComponent,
  defaultProps: QuestionInfoDefaultProps,
}
