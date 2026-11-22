import { Button, Card, Col, Layout, Modal, Row, Space, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchProjects, type Project } from '../entities/project/model'
import CreateProjectForm from '../features/create-project/CreateProjectForm'
import DataState from '../shared/ui/DataState'
import { useRequest } from '../shared/lib/useRequest'

const { Header, Content } = Layout
const { Title, Paragraph, Text } = Typography

function ProjectsPage() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { data: projects, setData: setProjects, loading, error } = useRequest(fetchProjects)

  // Новый проект добавляем в конец списка и закрываем окно.
  const handleCreated = (project: Project) => {
    setProjects([...(projects ?? []), project])
    setOpen(false)
  }

  return (
    <Layout className="public-layout">
      <Header className="public-header">
        <Text strong>BotInsight</Text>
        <Button onClick={() => navigate('/login')}>Войти</Button>
      </Header>
      <Content className="public-content">
        <div className="page-header">
          <div>
            <Title level={2}>Проекты</Title>
            <Paragraph type="secondary">Выберите проект для просмотра аналитики.</Paragraph>
          </div>
          <Button type="primary" onClick={() => setOpen(true)}>Создать проект</Button>
        </div>

        <DataState loading={loading} error={error} isEmpty={!projects || projects.length === 0}>
          <Row gutter={[16, 16]}>
            {projects?.map((project) => (
              <Col xs={24} md={12} key={project.id} className="fade-in">
                <Card title={project.name}>
                  <Space orientation="vertical" size="middle">
                    <Paragraph>{project.description}</Paragraph>
                    <Text type="secondary">Диалогов: {project.dialogsCount.toLocaleString('ru-RU')}</Text>
                    <Button type="primary" onClick={() => navigate(`/projects/${project.id}/dashboard`)}>Открыть</Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </DataState>

        <Modal title="Новый проект" open={open} onCancel={() => setOpen(false)} footer={null}>
          <div className="modal-form">
            <CreateProjectForm onCreated={handleCreated} />
          </div>
        </Modal>
      </Content>
    </Layout>
  )
}

export default ProjectsPage
