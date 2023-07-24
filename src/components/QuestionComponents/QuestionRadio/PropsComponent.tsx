import { FC, useEffect } from 'react'
import {
  OptionType,
  QuestionRadioPropsType,
} from '@/components/QuestionComponents/QuestionRadio/interface.ts'
import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'

export const PropsComponent: FC<QuestionRadioPropsType> = ({
  title,
  isVertical,
  options = [],
  value,
  disabled,
  onChange,
}) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      options,
      value,
    })
  }, [isVertical, options, title, value])
  function onValuesChange() {
    if (!onChange) return
    const newValues = form.getFieldsValue() as QuestionRadioPropsType
    if (newValues.options) {
      newValues.options = newValues.options.filter(opt => !(opt.text == null))
    }
    const { options = [] } = newValues
    options.forEach(opt => {
      if (!opt.value) {
        opt.value = nanoid(5)
      }
    })
    onChange(newValues)
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, options, value }}
      disabled={disabled}
      form={form}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历options */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue()
                            let num = 0
                            options.forEach((opt: OptionType) => {
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
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
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
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options.map(({ text, value }) => ({ value, label: text || '' }))}
        />
      </Form.Item>
      <Form.Item name="isVertical" label="竖向显示" valuePropName="checked">
        <Checkbox />
      </Form.Item>
    </Form>
  )
}
