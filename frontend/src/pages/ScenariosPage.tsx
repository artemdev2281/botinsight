import { Card, Table, type TableColumnsType } from 'antd'
import { useParams } from 'react-router-dom'
import { fetchAnalytics, type ScenarioStat } from '../entities/analytics/model'
import DataState from '../shared/ui/DataState'
import PageHeader from '../shared/ui/PageHeader'
import { useRequest } from '../shared/lib/useRequest'

const columns: TableColumnsType<ScenarioStat> = [
  { title: 'Сценарий', dataIndex: 'name' },
  { title: 'Completion', dataIndex: 'completionRate', render: (value: number) => `${value}%` },
  { title: 'Abandoned', dataIndex: 'abandonedRate', render: (value: number) => `${value}%` },
  { title: 'Fallback', dataIndex: 'fallbackRate', render: (value: number) => `${value}%` },
  { title: 'Operator', dataIndex: 'operatorRate', render: (value: number) => `${value}%` },
]

function ScenariosPage() {
  const { projectId = '' } = useParams()
  const { data, loading, error } = useRequest(() => fetchAnalytics(projectId))

  return (
    <section className="page">
      <PageHeader title="Сценарии" description="Показатели прохождения пользовательских сценариев." />
      <DataState loading={loading} error={error} isEmpty={!data || data.scenarios.length === 0}>
        <Card>
          <Table dataSource={data?.scenarios} columns={columns} rowKey="id" pagination={false} scroll={{ x: 700 }} />
        </Card>
      </DataState>
    </section>
  )
}

export default ScenariosPage
