import { FC, useEffect, useState } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import useGetUserInfo from '@/hooks/useGetUserInfo.ts'
import { HOME_PATH, MANAGE_INDEX_PATH } from '@/constant'

const { Title } = Typography
export const Logo: FC = () => {
  const { username } = useGetUserInfo()
  const [_, setPathname] = useState(HOME_PATH)
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATH)
    }
  }, [username])
  return (
    <div className="w-[200px] my-3  leading-none text-center heir-h1:!text-[#f7f7f7]">
      <Link to="/">
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title className="text-[32px]">小慕问卷</Title>
        </Space>
      </Link>
    </div>
  )
}
