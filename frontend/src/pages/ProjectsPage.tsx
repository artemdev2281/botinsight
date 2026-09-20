import { Button, Card, Col, Form, Input, Layout, Modal, Row, Space, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '../mockData'

const { Header, Content } = Layout
const { Title, Paragraph, Text } = Typography

function ProjectsPage() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

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
        <Row gutter={[16, 16]}>
          {projects.map((project) => (
            <Col xs={24} md={12} key={project.id}>
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

        <Modal
          title="Новый проект"
          open={open}
          onCancel={() => setOpen(false)}
          footer={<Button onClick={() => setOpen(false)}>Закрыть</Button>}
        >
          <Form layout="vertical" disabled className="modal-form">
            <Form.Item label="Название"><Input /></Form.Item>
            <Form.Item label="Описание"><Input.TextArea rows={3} /></Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  )
}

export default ProjectsPage
