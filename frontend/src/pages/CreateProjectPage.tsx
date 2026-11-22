import { Button, Card, Layout, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import CreateProjectForm from '../features/create-project/CreateProjectForm'

const { Content } = Layout
const { Title, Paragraph } = Typography

function CreateProjectPage() {
  const navigate = useNavigate()

  return (
    <Layout className="public-layout">
      <Content className="form-content">
        <Card className="form-card fade-in">
          <Title level={2}>Создание проекта</Title>
          <Paragraph type="secondary">Заполните два поля.</Paragraph>
          {/* После создания сразу открываем Dashboard нового проекта */}
          <CreateProjectForm onCreated={(project) => navigate(`/projects/${project.id}/dashboard`)} />
          <Button className="form-link" onClick={() => navigate('/projects')}>Назад</Button>
        </Card>
      </Content>
    </Layout>
  )
}

export default CreateProjectPage
