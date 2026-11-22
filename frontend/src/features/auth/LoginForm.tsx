import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'

type LoginValues = {
  email: string
  password: string
}

function LoginForm() {
  const navigate = useNavigate()

  const handleFinish = (values: LoginValues) => {
    message.success(`Добро пожаловать, ${values.email}`)
    navigate('/projects')
  }

  return (
    <Form layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Введите email' },
          { type: 'email', message: 'Некорректный email' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>Войти</Button>
    </Form>
  )
}

export default LoginForm
