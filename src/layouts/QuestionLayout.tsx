import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '@/hooks/useLoadUserData.ts'
import useNavPage from '@/hooks/useNavPage.ts'

export const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <div className="h-screen">
      <div className="flex-1">{!waitingUserData && <Outlet />}</div>
    </div>
  )
}
