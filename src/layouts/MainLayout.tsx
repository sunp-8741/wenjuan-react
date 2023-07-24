import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import { Logo } from '@/components/Logo.tsx'
import { UserInfo } from '@/components/UserInfo.tsx'
import useLoadUserData from '@/hooks/useLoadUserData.ts'
import useNavPage from '@/hooks/useNavPage.ts'
const { Header, Content, Footer } = Layout

export const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
  return (
    <Layout>
      <Header className="px-6">
        <div className="float-left">
          <Logo />
        </div>
        <div className="float-right">
          <UserInfo />
        </div>
      </Header>
      <Layout className="[min-height:calc(100vh_-_64px_-_65px)]">
        <Content>
          {waitingUserData ? (
            <div className="text-center">
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
      <Footer className="text-center [border-top:1px_solid_#e8e8e8]">layout footer</Footer>
    </Layout>
  )
}
