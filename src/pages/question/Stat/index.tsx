import { FC, useState } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData.ts'
import { Button, Result, Spin } from 'antd'
import useGetPageInfo from '@/hooks/useGetPageInfo.ts'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { StatHeader } from '@/pages/question/Stat/StatHeader.tsx'
import { ComponentList } from '@/pages/question/Stat/ComponentList.tsx'
import { PageStat } from '@/pages/question/Stat/PageStat.tsx'
import { ChartStat } from '@/pages/question/Stat/ChartStat.tsx'

export const Stat: FC = () => {
  const nav = useNavigate()
  const { loading } = useLoadQuestionData()
  const { isPublished, title } = useGetPageInfo()
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')
  useTitle(title)
  if (loading) {
    return (
      <div className="text-center mt-10">
        <Spin></Spin>
      </div>
    )
  }
  const loadingElem = (
    <div className="text-center mt-10">
      <Spin></Spin>
    </div>
  )
  function genContentElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div className="flex-1">
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => nav(-1)}>
                返回
              </Button>
            }
          />
        </div>
      )
    }
    return (
      <>
        <div className="w-[350px] mr-6">
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className="flex-auto bg-white py-3 px-[18px]">
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className="w-[400px] ml-6 bg-white py-3 px-[18px] overflow-hidden">
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    )
  }
  return (
    <div className="flex flex-col bg-[#f0f2f5] min-h-screen">
      <StatHeader />
      <div className="flex-auto py-3">
        {loading && loadingElem}
        {!loading && <div className="mx-6 flex">{genContentElem()}</div>}
      </div>
    </div>
  )
}
