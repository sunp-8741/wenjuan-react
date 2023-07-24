import { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfoPropsType } from '@/components/QuestionComponents/QuestionInfo/interface.ts'

export const PropsComponent: FC<QuestionInfoPropsType> = ({ title, desc, onChange, disabled }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])
  function onValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      form={form}
      onValuesChange={onValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题内容' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <Input.TextArea />
      </Form.Item>
    </Form>
  )
}
