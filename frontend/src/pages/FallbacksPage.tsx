import { Card, Col, Row, Statistic, Table, type TableColumnsType } from 'antd'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { getProjectAnalytics } from '../mockData'
import type { FallbackMessage } from '../types'

const columns: TableColumnsType<FallbackMessage> = [
  { title: 'Сообщение', dataIndex: 'message', width: 320 },
  { title: 'Intent', dataIndex: 'intent' },
  { title: 'Confidence', dataIndex: 'confidence', render: (value: number) => value.toFixed(2) },
  { title: 'Сценарий', dataIndex: 'scenario' },
]

function FallbacksPage() {
  const { projectId } = useParams()
  const data = getProjectAnalytics(projectId)
  const fallbackRate = data.metrics.find((item) => item.key === 'fallback')?.value || 0
  const dialogs = data.metrics.find((item) => item.key === 'dialogs')?.value || 0
  const fallbackCount = Math.round((dialogs * fallbackRate) / 100)

  return (
    <section className="page">
      <PageHeader title="Fallback-запросы" description="Сообщения, которые бот не смог обработать." />
      <Row gutter={[16, 16]} className="summary-row">
        <Col xs={24} sm={12}>
          <Card>
            <Statistic title="Fallback rate" value={fallbackRate} precision={1} suffix="%" />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic title="Fallback-запросов" value={fallbackCount} groupSeparator=" " />
          </Card>
        </Col>
      </Row>
      <Card title="Проблемные сообщения" className="section-card">
        <Table dataSource={data.fallbackMessages} columns={columns} rowKey="id" pagination={false} scroll={{ x: 800 }} />
      </Card>
    </section>
  )
}

export default FallbacksPage
