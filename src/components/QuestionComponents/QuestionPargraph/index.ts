import { QuestionParagraphDefaultProps } from '@/components/QuestionComponents/QuestionPargraph/interface.ts'
import { Component } from './Component.tsx'
import { PropsComponent } from './PropsComponent.tsx'

export * from './interface.ts'

export default {
  title: '段落',
  type: 'questionParagraph',
  Component,
  PropsComponent,
  defaultProps: QuestionParagraphDefaultProps,
}
