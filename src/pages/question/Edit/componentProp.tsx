import { FC } from 'react'
import useGetComponentInfo from '@/hooks/useGetComponentInfo.ts'
import { ComponentPropsType, getComponentConfByType } from '@/components/QuestionComponents'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '@/store/componentsReducer'

const NoProp: FC = () => {
  return <div className="text-center">未选中组件</div>
}
export const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo()
  const dispatch = useDispatch()
  if (!selectedComponent) return <NoProp />
  const { type, props, isLocked, isHidden } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (!componentConf) return <NoProp />
  const { PropsComponent } = componentConf
  function onChangeProps(newProps: ComponentPropsType) {
    if (!selectedComponent) return
    const { fe_id } = selectedComponent
    dispatch(
      changeComponentProps({
        fe_id,
        newProps,
      })
    )
  }
  return <PropsComponent {...props} onChange={onChangeProps} disabled={isLocked || isHidden} />
}
