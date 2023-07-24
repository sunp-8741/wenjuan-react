import { FC } from 'react'
import { QuestionCheckboxPropsType } from '@/components/QuestionComponents/QuestionCheckbox/interface.ts'
import { Button, Checkbox, Form, Input, Space } from 'antd'
import { OptionType } from '@/components/QuestionComponents/QuestionCheckbox'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

export const PropsComponent: FC<QuestionCheckboxPropsType> = ({
  title,
  isVertical,
  list,
  onChange,
  disabled,
}) => {
  const [form] = Form.useForm()
  function onValuesChange() {
    if (!onChange) return
    const newValues = form.getFieldsValue() as QuestionCheckboxPropsType
    if (newValues.list) {
      newValues.list = newValues.list.filter(opt => !(opt.text == null))
    }
    const { list = [] } = newValues
    list.forEach(opt => {
      if (!opt.value) {
        opt.value = nanoid(5)
      }
    })
    onChange(newValues)
  }
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历options */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue()
                            let num = 0
                            list.forEach((opt: OptionType) => {
                              if (opt.text === text) num++
                            })
                            return num === 1
                              ? Promise.resolve()
                              : Promise.reject(new Error('选项重复'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项文字" />
                    </Form.Item>
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type="link"
                  onClick={() => add({ text: '', value: '' })}
                  icon={<PlusOutlined />}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" label="竖向显示" valuePropName="checked">
        <Checkbox />
      </Form.Item>
    </Form>
  )
}
