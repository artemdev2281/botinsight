import { Button, Card, Form, Input, Layout, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Content } = Layout
const { Title, Paragraph } = Typography

function CreateProjectPage() {
  const navigate = useNavigate()

  return (
    <Layout className="public-layout">
      <Content className="form-content">
        <Card className="form-card">
          <Title level={2}>Создание проекта</Title>
          <Paragraph type="secondary">Заполните два поля.</Paragraph>
          <Form layout="vertical" disabled>
            <Form.Item label="Название">
              <Input />
            </Form.Item>
            <Form.Item label="Описание">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Form>
          <Space>
            <Button type="primary" disabled>Создать</Button>
            <Button onClick={() => navigate('/projects')}>Назад</Button>
          </Space>
        </Card>
      </Content>
    </Layout>
  )
}

export default CreateProjectPage
