import { Col, Row } from 'antd'
import { useParams } from 'react-router-dom'
import MetricCard from '../entities/analytics/MetricCard'
import { fetchAnalytics } from '../entities/analytics/model'
import { getProject } from '../entities/project/model'
import DataState from '../shared/ui/DataState'
import PageHeader from '../shared/ui/PageHeader'
import { useRequest } from '../shared/lib/useRequest'

function DashboardPage() {
  const { projectId = '' } = useParams()
  const project = getProject(projectId)
  const { data, loading, error } = useRequest(() => fetchAnalytics(projectId))

  return (
    <section className="page">
      <PageHeader
        title="Dashboard"
        description={`Ключевые показатели ${project?.name || 'проекта'} за последние 30 дней.`}
      />
      <DataState loading={loading} error={error} isEmpty={!data || data.metrics.length === 0}>
        <Row gutter={[16, 16]}>
          {data?.metrics.map(({ key, ...metric }) => (
            <Col xs={24} sm={12} xl={6} key={key}>
              <MetricCard {...metric} />
            </Col>
          ))}
        </Row>
      </DataState>
    </section>
  )
}

export default DashboardPage
