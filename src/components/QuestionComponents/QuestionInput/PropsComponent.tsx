import { FC, useEffect } from 'react'
import { QuestionInputPropsType } from './interface.ts'
import { Form, Input } from 'antd'

export const PropsComponent: FC<QuestionInputPropsType> = ({
  title,
  placeholder,
  onChange,
  disabled,
}) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])
  function onValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={onValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}
