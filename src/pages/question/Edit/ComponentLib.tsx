import { FC } from 'react'
import { componentConfGroup, ComponentConfType } from '@/components/QuestionComponents'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { addComponent } from '@/store/componentsReducer'
import { nanoid } from '@reduxjs/toolkit'

export const ComponentLib: FC = () => {
  const { Title } = Typography
  const dispatch = useDispatch()
  function genComponent(c: ComponentConfType) {
    const { title, type, Component, defaultProps } = c
    function onClickComponent() {
      dispatch(
        addComponent({
          fe_id: nanoid(5),
          type,
          title,
          isHidden: false,
          isLocked: false,
          props: defaultProps,
        })
      )
    }
    return (
      <div
        className="mb-3 cursor-pointer bg-white border border-white border-solid p-3 rounded-[3px] hover:border-[#d9d9d9]"
        onClick={onClickComponent}
        key={type}
      >
        <div className="pointer-events-none">
          <Component />
        </div>
      </div>
    )
  }
  return (
    <>
      {componentConfGroup.map((group, index) => {
        return (
          <div key={index}>
            <Title level={5} className={index > 0 ? 'mt-5' : 'mt-0'}>
              {group.groupName}
            </Title>
            <div>{group.components.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}
