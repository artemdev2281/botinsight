import { Card, Table, type TableColumnsType } from 'antd'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { getProjectAnalytics } from '../mockData'
import type { ScenarioStat } from '../types'

const columns: TableColumnsType<ScenarioStat> = [
  { title: 'Сценарий', dataIndex: 'name' },
  { title: 'Completion', dataIndex: 'completionRate', render: (value: number) => `${value}%` },
  { title: 'Abandoned', dataIndex: 'abandonedRate', render: (value: number) => `${value}%` },
  { title: 'Fallback', dataIndex: 'fallbackRate', render: (value: number) => `${value}%` },
  { title: 'Operator', dataIndex: 'operatorRate', render: (value: number) => `${value}%` },
]

function ScenariosPage() {
  const { projectId } = useParams()
  const { scenarios } = getProjectAnalytics(projectId)

  return (
    <section className="page">
      <PageHeader title="Сценарии" description="Показатели прохождения пользовательских сценариев." />
      <Card>
        <Table dataSource={scenarios} columns={columns} rowKey="id" pagination={false} scroll={{ x: 700 }} />
      </Card>
    </section>
  )
}

export default ScenariosPage
