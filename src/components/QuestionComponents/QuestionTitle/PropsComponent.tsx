import { FC, useEffect } from 'react'
import { QuestionTitlePropsType } from './interface.ts'
import { Checkbox, Form, Input, Select } from 'antd'

export const PropsComponent: FC<QuestionTitlePropsType> = ({
  text,
  isCenter,
  level,
  onChange,
  disabled,
}) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ text, isCenter, level })
  }, [text, isCenter, level])
  function onValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter, level }}
      form={form}
      onValuesChange={onValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}
