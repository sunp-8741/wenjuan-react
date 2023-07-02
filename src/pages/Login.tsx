import { FC, useEffect } from 'react'
import { Button, Checkbox, Form, Input, message, Space, Typography } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useLocalStorageState, useRequest } from 'ahooks'
import { MANAGE_INDEX_PATH, REGISTER_PATH } from '@/constant'
import { IRegisterUser } from '@/types/question.ts'
import { loginService } from '@/services/user.ts'
import { setToken } from '@/utils/user-token.ts'
const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'
export const Login: FC = () => {
  const nav = useNavigate()
  const [username, setUsername] = useLocalStorageState(USERNAME_KEY)
  const [password, setPassword] = useLocalStorageState(PASSWORD_KEY)
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      username,
      password,
    })
  }, [])
  const { run: onLogin } = useRequest(
    async (values: IRegisterUser) => {
      return await loginService(values)
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result
        // 存储token
        setToken(token)
        message.success('登录成功')
        // 导航到我的问卷
        nav(MANAGE_INDEX_PATH)
      },
    }
  )
  function rememberUser(username: string, password: string) {
    setUsername(username)
    setPassword(password)
  }
  function deleteUserFromStorage() {
    setUsername(undefined)
    setPassword(undefined)
  }
  function onFinish(values: IRegisterUser) {
    console.log(values)
    const { username, password, remember } = values || {}
    onLogin(values)
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }
  return (
    <div className="center-container">
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在5-20之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }} valuePropName="checked" name="remember">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATH}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
