import { FC, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { ComponentInfoType } from '@/store/componentsReducer'

const Item: FC<{ id: string; title: string }> = ({ id, title }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #ccc',
    margin: '10px 0',
    background: '#ccc',
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      Item {title}
    </div>
  )
}

export const Demo: FC = () => {
  const [items, setItems] = useState<Array<Partial<ComponentInfoType>>>([
    {
      fe_id: 'c1',
      title: '组件1',
    },
    {
      fe_id: 'c2',
      title: '组件2',
    },
    {
      fe_id: 'c3',
      title: '组件3',
    },
  ])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.findIndex(c => c.fe_id === active.id)
        const newIndex = items.findIndex(c => c.fe_id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
  const itemsWithId = items.map((c, index) => {
    return {
      ...c,
      id: c.fe_id || index + '',
    }
  })
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={itemsWithId} strategy={verticalListSortingStrategy}>
        {items.map(c => (
          <Item key={c.fe_id} id={c.fe_id || ''} title={c.title || ''} />
        ))}
      </SortableContext>
    </DndContext>
  )
}
