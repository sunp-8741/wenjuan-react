import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const QuestionLayout: FC = () => {
  return (
    <div className="flex py-6 w-[1200px] mx-auto my-0">
      <div className="w-[120px]">Question layout left</div>
      <div className="flex-1 ml-[60px]">
        <Outlet />
      </div>
    </div>
  )
}
