import { FC, useEffect } from 'react'
import { QuestionParagraphPropsType } from './interface.ts'
import { Checkbox, Form, Input } from 'antd'

export const PropsComponent: FC<QuestionParagraphPropsType> = ({
  text,
  isCenter,
  onChange,
  disabled,
}) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])
  function onValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      form={form}
      onValuesChange={onValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}
