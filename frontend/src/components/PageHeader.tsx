import { Typography } from 'antd'
import type { ReactNode } from 'react'

const { Title, Paragraph } = Typography

type PageHeaderProps = {
  title: string
  description: string
  action?: ReactNode
}

function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div>
        <Title level={2}>{title}</Title>
        <Paragraph type="secondary">{description}</Paragraph>
      </div>
      {action}
    </div>
  )
}

export default PageHeader
