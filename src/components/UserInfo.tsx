import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '@/utils/user-token.ts'
import { LOGIN_PATH } from '@/constant'
import useGetUserInfo from '@/hooks/useGetUserInfo.ts'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '@/store/userReducer.ts'

export const UserInfo: FC = () => {
  const { username, nickname } = useGetUserInfo()
  const nav = useNavigate()
  const dispatch = useDispatch()
  function logout() {
    removeToken()
    dispatch(logoutReducer())
    message.success('退出成功')
    nav(LOGIN_PATH)
  }

  const UserInfoEle = (
    <>
      <span className="text-[#e8e8e8]">
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )
  const LoginEle = <Link to="/login">登录</Link>
  return (
    <>
      <div>{username ? UserInfoEle : LoginEle}</div>
    </>
  )
}
