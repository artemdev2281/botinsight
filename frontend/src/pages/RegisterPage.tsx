import { Button, Card, Form, Input, Layout, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const { Content } = Layout
const { Title, Paragraph } = Typography

function RegisterPage() {
  const navigate = useNavigate()

  return (
    <Layout className="public-layout">
      <Content className="form-content">
        <Card className="form-card">
          <Title level={2}>Регистрация</Title>
          <Form layout="vertical">
            <Form.Item label="Имя">
              <Input />
            </Form.Item>
            <Form.Item label="Email">
              <Input />
            </Form.Item>
            <Form.Item label="Пароль">
              <Input.Password />
            </Form.Item>
            <Form.Item label="Подтверждение пароля">
              <Input.Password />
            </Form.Item>
            <Button type="primary" block onClick={() => navigate('/projects')}>Зарегистрироваться</Button>
          </Form>
          <Paragraph className="form-link">Уже есть аккаунт? <Link to="/login">Войти</Link></Paragraph>
        </Card>
      </Content>
    </Layout>
  )
}

export default RegisterPage
