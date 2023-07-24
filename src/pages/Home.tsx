import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { Typography } from 'antd'
import { MANAGE_INDEX_PATH } from '@/constant'
import '@/_mock/index.ts'
import { getQuestionService } from '@/services/question.ts'
const { Title, Paragraph } = Typography
export const Home: FC = () => {
  const nav = useNavigate()
  useEffect(() => {
    async function fn() {
      const question = await getQuestionService('1')
      console.log(question)
    }
    fn()
  }, [])
  return (
    <div className="flex justify-center items-center flex-col [min-height:calc(100vh_-_64px_-_65px)] bg-[linear-gradient(to_right,#4facfe_0%,#00f2fe_100%)]">
      <div className="text-center">
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累积创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
        <div>
          <Button
            className="h-[60px] text-[24px] rounded-[3px]"
            type="primary"
            onClick={() => nav(MANAGE_INDEX_PATH)}
          >
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}
