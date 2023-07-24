import { FC } from 'react'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import { ComponentLib } from '@/pages/question/Edit/ComponentLib.tsx'
import { Layers } from '@/pages/question/Edit/Layers.tsx'

export const LeftPanel: FC = () => {
  const tabs = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <Layers />,
    },
  ]
  return <Tabs defaultActiveKey="componentLib" items={tabs} />
}
