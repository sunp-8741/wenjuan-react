import { FC, JSX } from 'react'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type PropsType = {
  children: JSX.Element | JSX.Element[]
  items: Array<{ id: string; [key: string]: any }>
  onDragEnd: (oldIndex: number, newIndex: number) => void
}
export const SortableContainer: FC<PropsType> = ({ children, items, onDragEnd }) => {
  const sensors = useSensors(useSensor(MouseSensor, { activationConstraint: { distance: 8 } }))
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(c => c.fe_id === active.id)
      const newIndex = items.findIndex(c => c.fe_id === over.id)
      onDragEnd(oldIndex, newIndex)
    }
  }
  const itemsWithId = items.map((c, index) => {
    return {
      ...c,
      id: c.fe_id || index + '',
    }
  })
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={itemsWithId} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
