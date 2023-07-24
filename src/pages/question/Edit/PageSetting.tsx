import { FC, useEffect } from 'react'
import useGetPageInfo from '@/hooks/useGetPageInfo.ts'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '@/store/PageInfoReducer.ts'

export const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])
  function onValuesChange() {
    const newValues = form.getFieldsValue()
    dispatch(resetPageInfo(newValues))
  }
  return (
    <Form form={form} layout="vertical" initialValues={pageInfo} onValuesChange={onValuesChange}>
      <Form.Item name="title" label="页面标题" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="desc" label="页面描述">
        <Input.TextArea placeholder="问卷描述" />
      </Form.Item>
      <Form.Item name="css" label="css">
        <Input.TextArea placeholder="请输入css代码" />
      </Form.Item>
      <Form.Item name="js" label="js">
        <Input.TextArea placeholder="请输入js脚本代码" />
      </Form.Item>
    </Form>
  )
}
