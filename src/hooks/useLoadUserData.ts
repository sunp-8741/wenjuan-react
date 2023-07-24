import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import useGetUserInfo from '@/hooks/useGetUserInfo.ts'
import { getUserInfoService } from '@/services/user.ts'
import { useDispatch } from 'react-redux'
import { loginReducer } from '@/store/userReducer.ts'

export default function () {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)
  const { username } = useGetUserInfo()
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })
  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }
    run()
  }, [username])
  return { waitingUserData }
}
