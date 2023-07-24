import { FC, useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { getComponentStatService } from '@/services/stat.ts'
import { useParams } from 'react-router-dom'
import { getComponentConfByType } from '@/components/QuestionComponents'

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}
export const ChartStat: FC<PropsType> = ({ selectedComponentType, selectedComponentId }) => {
  const { id = '' } = useParams()
  const [stat, setStat] = useState([])
  const { run } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      },
    }
  )
  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId)
  }, [id, selectedComponentId])
  function genStatElem() {
    const componentConf = getComponentConfByType(selectedComponentType)
    if (!componentConf) return <div>未选中组件</div>
    const { StatComponent } = componentConf
    if (!StatComponent) return <div>该组件无统计图表</div>
    return <StatComponent stat={stat} />
  }
  return (
    <>
      <Typography.Title level={3}>图表统计</Typography.Title>
      {!selectedComponentId ? <div>未选中组件</div> : genStatElem()}
    </>
  )
}
