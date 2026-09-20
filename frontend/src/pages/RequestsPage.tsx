import { Card, Table, type TableColumnsType } from 'antd'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { getProjectAnalytics } from '../mockData'
import type { RequestStat } from '../types'

const columns: TableColumnsType<RequestStat> = [
  { title: 'Intent', dataIndex: 'intent' },
  { title: 'Обращений', dataIndex: 'requests', sorter: (a, b) => a.requests - b.requests, render: (value: number) => value.toLocaleString('ru-RU') },
  { title: 'Confidence', dataIndex: 'confidence', render: (value: number) => value.toFixed(2) },
  { title: 'Fallback rate', dataIndex: 'fallbackRate', sorter: (a, b) => a.fallbackRate - b.fallbackRate, render: (value: number) => `${value.toFixed(1)}%` },
]

function RequestsPage() {
  const { projectId } = useParams()
  const { requests } = getProjectAnalytics(projectId)
  return (
    <section className="page">
      <PageHeader title="Обращения" description="Статистика по intents выбранного проекта." />
      <Card>
        <Table dataSource={requests} columns={columns} rowKey="id" pagination={false} scroll={{ x: 650 }} />
      </Card>
    </section>
  )
}

export default RequestsPage
