import useGetUserInfo from '@/hooks/useGetUserInfo.ts'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isNoNeedUserInfo, LOGIN_PATH, MANAGE_INDEX_PATH, REGISTER_PATH } from '@/constant'

export default function (waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    if (waitingUserData) return
    if (username) {
      if ([LOGIN_PATH, REGISTER_PATH].includes(pathname)) {
        nav(MANAGE_INDEX_PATH)
      }
      return
    }
    // 未登录不需要用户信息
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATH)
    }
  }, [username, pathname, waitingUserData])
}
