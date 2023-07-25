import { FC, MouseEvent } from 'react'
import './canvas.scss'
import { Spin } from 'antd'
import useGetComponentInfo from '@/hooks/useGetComponentInfo.ts'
import { changeSelectedId, ComponentInfoType, moveComponent } from '@/store/componentsReducer'
import { getComponentConfByType } from '@/components/QuestionComponents'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress.ts'
import { SortableContainer } from '@/components/DragSortable/SortableContainer.tsx'
import { SortableItem } from '@/components/DragSortable/SortableItem.tsx'
type PropsType = {
  loading: boolean
}
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (!componentConf) return null
  const { Component } = componentConf
  return <Component {...props} />
}
export const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList, selectedId } = useGetComponentInfo()
  useBindCanvasKeyPress()
  const dispatch = useDispatch()
  function onClickComponent(e: MouseEvent, id: string) {
    e.stopPropagation()
    dispatch(changeSelectedId(id))
  }
  if (loading) {
    return (
      <div className="text-center mt-6">
        <Spin />
      </div>
    )
  }
  const componentListWithId = componentList.map(c => {
    return {
      ...c,
      id: c.fe_id,
    }
  })
  function onDragEnd(oldIndex: number, newIndex: number) {
    console.log('dragend', oldIndex, newIndex)
    dispatch(
      moveComponent({
        oldIndex,
        newIndex,
      })
    )
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={onDragEnd}>
      <div className="min-h-full bg-white overflow-hidden">
        {componentList
          .filter(c => !c.isHidden)
          .map(c => {
            const { fe_id, isLocked } = c
            const wrapperClassnames = classNames({
              'component-wrapper': true,
              selected: fe_id === selectedId,
              locked: isLocked,
            })
            return (
              <SortableItem id={fe_id}>
                <div className={wrapperClassnames} onClick={e => onClickComponent(e, fe_id)}>
                  <div className="pointer-events-none">{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}
