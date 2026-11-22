import { Card, Input, Table, type TableColumnsType } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAnalytics, type RequestStat } from '../entities/analytics/model'
import DataState from '../shared/ui/DataState'
import PageHeader from '../shared/ui/PageHeader'
import { useRequest } from '../shared/lib/useRequest'

const columns: TableColumnsType<RequestStat> = [
  { title: 'Intent', dataIndex: 'intent' },
  { title: 'Обращений', dataIndex: 'requests', sorter: (a, b) => a.requests - b.requests, render: (value: number) => value.toLocaleString('ru-RU') },
  { title: 'Confidence', dataIndex: 'confidence', render: (value: number) => value.toFixed(2) },
  { title: 'Fallback rate', dataIndex: 'fallbackRate', sorter: (a, b) => a.fallbackRate - b.fallbackRate, render: (value: number) => `${value.toFixed(1)}%` },
]

function RequestsPage() {
  const { projectId = '' } = useParams()
  const { data, loading, error } = useRequest(() => fetchAnalytics(projectId))
  const [search, setSearch] = useState('')

  // Оставляем только intents, в названии которых есть введённый текст.
  const requests = (data?.requests ?? []).filter((item) => item.intent.includes(search.trim().toLowerCase()))

  return (
    <section className="page">
      <PageHeader
        title="Обращения"
        description="Статистика по intents выбранного проекта."
        action={<Input.Search placeholder="Поиск по intent" allowClear onChange={(event) => setSearch(event.target.value)} />}
      />
      <DataState loading={loading} error={error} isEmpty={requests.length === 0}>
        <Card>
          <Table dataSource={requests} columns={columns} rowKey="id" pagination={false} scroll={{ x: 650 }} />
        </Card>
      </DataState>
    </section>
  )
}

export default RequestsPage
