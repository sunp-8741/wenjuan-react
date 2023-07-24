import { QuestionCheckbox } from '@/components/QuestionComponents/QuestionCheckbox/Component.tsx'
import { QuestionCheckboxDefaultProps } from '@/components/QuestionComponents/QuestionCheckbox/interface.ts'
import { PropsComponent } from './PropsComponent.tsx'
import { StatComponent } from './StatComponent.tsx'
export * from './interface.ts'
export default {
  title: '单选',
  type: 'questionCheckbox',
  Component: QuestionCheckbox,
  defaultProps: QuestionCheckboxDefaultProps,
  PropsComponent,
  StatComponent,
}
