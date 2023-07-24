import { FC } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData.ts'
import { EditCanvas } from '@/pages/question/Edit/EditCanvas.tsx'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '@/store/componentsReducer'
import { LeftPanel } from '@/pages/question/Edit/ LeftPanel.tsx'
import { RightPanel } from '@/pages/question/Edit/RightPanel.tsx'
import { EditHeader } from '@/pages/question/Edit/EditHeader.tsx'
import useGetPageInfo from '@/hooks/useGetPageInfo.ts'
import { useTitle } from 'ahooks'

export const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()
  const { title } = useGetPageInfo()
  useTitle(title)
  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }
  return (
    <div className="flex flex-col h-screen bg-[#f0f2f5]">
      <EditHeader />
      <div className="flex-auto px-0 py-3">
        <div className="my-0 mx-6 h-full flex">
          <div className="w-[295px] bg-white px-3">
            <LeftPanel />
          </div>
          <div
            className="flex-1 flex items-center justify-center overflow-hidden"
            onClick={clearSelectedId}
          >
            <div className="w-[400px] h-[712px] bg-white overflow-auto shadow-[0_2px_10px_#0000001f]">
              <div className="">
                <EditCanvas loading={loading} />
              </div>
            </div>
          </div>
          <div className="w-[300px] bg-white px-3">
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
