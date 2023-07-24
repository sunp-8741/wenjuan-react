import { ComponentInfoType, ComponentsStateType } from '@/store/componentsReducer/index.ts'

/**
 * 获取下一个selected
 * @param fe_id 当前id
 * @param componentList 组件列表
 * @return newSelected 新的选中组件id
 */
export function getNextSelected(fe_id: string, componentList: ComponentInfoType[]) {
  const index = componentList.findIndex(c => c.fe_id === fe_id)
  if (index < 0) return ''
  let newSelected = ''
  const length = componentList.length
  if (length <= 1) {
    // 组件就一个 没有选中
    newSelected = ''
  } else {
    if (index + 1 === length) {
      //  要删除最后一个 则选中上一个
      newSelected = componentList[index - 1].fe_id
    } else {
      //   不是删除最后一个，删除以后选中下一个
      newSelected = componentList[index + 1].fe_id
    }
  }
  return newSelected
}

export function getSelectedComponent(draft: ComponentsStateType) {
  const { selectedId, componentList } = draft
  return componentList.find(c => c.fe_id === selectedId)
}
export function getComponent(fe_id: string, componentList: ComponentInfoType[]) {
  return componentList.find(c => c.fe_id === fe_id)
}
export function getSelectedCompIndex(draft: ComponentsStateType) {
  const { selectedId, componentList } = draft
  return componentList.findIndex(c => c.fe_id === selectedId)
}

/**
 * 插入新组件
 * @param draft
 * @param newComponent
 */
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex(c => c.fe_id === selectedId)
  if (index < 0) {
    // 未选中组件
    draft.componentList.push(newComponent)
  } else {
    draft.componentList.splice(index + 1, 0, newComponent)
  }
  draft.selectedId = newComponent.fe_id
}
