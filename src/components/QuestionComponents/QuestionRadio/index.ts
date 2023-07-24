/**
 * 问卷 radio组件
 */

import { QuestionRadio } from '@/components/QuestionComponents/QuestionRadio/Component.tsx'
import { QuestionRadioDefaultProps } from '@/components/QuestionComponents/QuestionRadio/interface.ts'
import { PropsComponent } from '@/components/QuestionComponents/QuestionRadio/PropsComponent.tsx'
import { StatComponent } from './StatComponent.tsx'

export * from './interface.ts'

export default {
  title: '单选',
  type: 'questionRadio',
  Component: QuestionRadio,
  defaultProps: QuestionRadioDefaultProps,
  PropsComponent,
  StatComponent,
}
