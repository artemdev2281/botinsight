import { Card, Layout, Typography } from 'antd'
import { Link } from 'react-router-dom'
import RegisterForm from '../features/auth/RegisterForm'

const { Content } = Layout
const { Title, Paragraph } = Typography

function RegisterPage() {
  return (
    <Layout className="public-layout">
      <Content className="form-content">
        <Card className="form-card fade-in">
          <Title level={2}>Регистрация</Title>
          <RegisterForm />
          <Paragraph className="form-link">Уже есть аккаунт? <Link to="/login">Войти</Link></Paragraph>
        </Card>
      </Content>
    </Layout>
  )
}

export default RegisterPage
