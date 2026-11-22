import { Card, Layout, Typography } from 'antd'
import { Link } from 'react-router-dom'
import LoginForm from '../features/auth/LoginForm'

const { Content } = Layout
const { Title, Paragraph } = Typography

function LoginPage() {
  return (
    <Layout className="public-layout">
      <Content className="form-content">
        <Card className="form-card fade-in">
          <Title level={2}>Вход</Title>
          <Paragraph type="secondary">Введите email и пароль.</Paragraph>
          <LoginForm />
          <Paragraph className="form-link">Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></Paragraph>
        </Card>
      </Content>
    </Layout>
  )
}

export default LoginPage
