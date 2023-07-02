import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { Logo } from '@/components/Logo.tsx'
import { UserInfo } from '@/components/UserInfo.tsx'
const { Header, Content, Footer } = Layout

export const MainLayout: FC = () => {
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
          <Outlet />
        </Content>
      </Layout>
      <Footer className="text-center [border-top:1px_solid_#e8e8e8]">layout footer</Footer>
    </Layout>
  )
}
