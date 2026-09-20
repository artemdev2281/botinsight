import { Col, Row } from 'antd'
import { useParams } from 'react-router-dom'
import MetricCard from '../components/MetricCard'
import PageHeader from '../components/PageHeader'
import { getProject, getProjectAnalytics } from '../mockData'

function DashboardPage() {
  const { projectId } = useParams()
  const project = getProject(projectId)
  const data = getProjectAnalytics(projectId)

  return (
    <section className="page">
      <PageHeader
        title="Dashboard"
        description={`Ключевые показатели ${project?.name || 'проекта'} за последние 30 дней.`}
      />

      <Row gutter={[16, 16]}>
        {data.metrics.map(({ key, ...metric }) => (
          <Col xs={24} sm={12} xl={6} key={key}>
            <MetricCard {...metric} />
          </Col>
        ))}
      </Row>
    </section>
  )
}

export default DashboardPage
