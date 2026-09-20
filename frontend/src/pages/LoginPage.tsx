import { Button, Card, Form, Input, Layout, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const { Content } = Layout
const { Title, Paragraph } = Typography

function LoginPage() {
  const navigate = useNavigate()

  return (
    <Layout className="public-layout">
      <Content className="form-content">
        <Card className="form-card">
          <Title level={2}>Вход</Title>
          <Paragraph type="secondary">Введите email и пароль.</Paragraph>
          <Form layout="vertical">
            <Form.Item label="Email">
              <Input />
            </Form.Item>
            <Form.Item label="Пароль">
              <Input.Password />
            </Form.Item>
            <Button type="primary" block onClick={() => navigate('/projects')}>Войти</Button>
          </Form>
          <Paragraph className="form-link">Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></Paragraph>
        </Card>
      </Content>
    </Layout>
  )
}

export default LoginPage
