import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '@/services/user.ts'
import { UserOutlined } from '@ant-design/icons'
import { IUser } from '@/types/user.ts'
import { Button, message } from 'antd'
import { removeToken } from '@/utils/user-token.ts'
import { LOGIN_PATH } from '@/constant'

export const UserInfo: FC = () => {
  const { data: userInfo = {} } = useRequest<Partial<IUser>, never>(getUserInfoService)
  const nav = useNavigate()
  function logout() {
    removeToken()
    message.success('退出成功')
    nav(LOGIN_PATH)
  }

  const UserInfoEle = (
    <>
      <span className="text-[#e8e8e8]">
        <UserOutlined />
        {userInfo.nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )
  const LoginEle = <Link to="/login">登录</Link>
  return (
    <>
      <div>{userInfo.username ? UserInfoEle : LoginEle}</div>
    </>
  )
}
