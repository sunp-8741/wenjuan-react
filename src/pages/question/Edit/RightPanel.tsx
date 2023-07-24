import { FC, useEffect, useState } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import { ComponentProp } from '@/pages/question/Edit/componentProp.tsx'
import { PageSetting } from '@/pages/question/Edit/PageSetting.tsx'
import useGetComponentInfo from '@/hooks/useGetComponentInfo.ts'
enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}
export const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)
  const { selectedId } = useGetComponentInfo()
  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY)
    else setActiveKey(TAB_KEYS.SETTING_KEY)
  }, [selectedId])
  const tabs = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          设置
        </span>
      ),
      children: <PageSetting />,
    },
  ]
  return <Tabs activeKey={activeKey} items={tabs} />
}
