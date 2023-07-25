import { FC } from 'react'
import classNames from 'classnames'
import useGetComponentInfo from '@/hooks/useGetComponentInfo.ts'
import { getComponentConfByType } from '@/components/QuestionComponents'
import '../Edit/canvas.scss'
type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}
export const ComponentList: FC<PropsType> = ({
  selectedComponentId,
  setSelectedComponentType,
  setSelectedComponentId,
}) => {
  const { componentList } = useGetComponentInfo()
  function onSelectComponent(fe_id: string, type: string) {
    setSelectedComponentId(fe_id)
    setSelectedComponentType(type)
  }
  return (
    <div className="min-h-full bg-white overflow-hidden">
      {componentList
        .filter(c => !c.isHidden)
        .map(c => {
          const { fe_id, isLocked, type, props } = c
          const componentConf = getComponentConfByType(type)
          if (!componentConf) return null
          const { Component } = componentConf
          const wrapperClassnames = classNames({
            'component-wrapper': true,
            selected: fe_id === selectedComponentId,
            locked: isLocked,
          })
          return (
            <div
              key={fe_id}
              className={wrapperClassnames}
              onClick={() => onSelectComponent(fe_id, type)}
            >
              <div className="pointer-events-none opacity-80">
                <Component {...props} />
              </div>
            </div>
          )
        })}
    </div>
  )
}
