import { FC, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Input, InputRef, message, Popover, Space, Tooltip, Typography } from 'antd'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '@/hooks/useGetPageInfo.ts'
import QRCode from 'qrcode.react'

export const StatHeader: FC = () => {
  const nav = useNavigate()
  const { title, isPublished } = useGetPageInfo()
  const { id = '' } = useParams()
  const urlInputRef = useRef<InputRef>(null)
  function onCopyUrl() {
    const elem = urlInputRef.current
    if (!elem) return
    elem.select() //选中input
    // 向剪切板添加内容
    const Clipboard = navigator.clipboard
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { value } = elem.input!
    Clipboard.writeText(value).then(() => {
      message.success('复制成功 ')
    })
    // 也可以使用这个方法执行复制
    // document.execCommand('copy')
  }
  function genLinkAndQRCodeElem() {
    if (!isPublished) return null
    const url = `http://localhost:3001/question/${id}`
    const QRCodeElem = (
      <div className="text-center">
        <QRCode value={url} size={150} />
      </div>
    )
    return (
      <Space>
        <Input ref={urlInputRef} value={url} className="w-[300px]" />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={onCopyUrl} />
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    )
  }
  return (
    <div className="bg-white border-b border-solid border-[#e8e8e8] py-3">
      <div className="flex mx-6">
        <div className="flex-1">
          <Space align="baseline">
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Typography.Title className="!text-[18px] !mb-0 !leading-none">
              {title}
            </Typography.Title>
          </Space>
        </div>
        <div className="flex-1 text-center">{genLinkAndQRCodeElem()}</div>
        <div className="flex-1 text-right">
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}
