import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'

type RegisterValues = {
  name: string
  email: string
  password: string
  confirm: string
}

function RegisterForm() {
  const navigate = useNavigate()

  const handleFinish = (values: RegisterValues) => {
    message.success(`Аккаунт ${values.email} создан`)
    navigate('/projects')
  }

  return (
    <Form layout="vertical" onFinish={handleFinish}>
      <Form.Item label="Имя" name="name" rules={[{ required: true, whitespace: true, message: 'Введите имя' }]}>
        <Input />
      </Form.Item>
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
      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          { required: true, message: 'Введите пароль' },
          { min: 6, message: 'Пароль должен быть не короче 6 символов' },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Подтверждение пароля"
        name="confirm"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Повторите пароль' },
          // Своё правило: значение должно совпадать с полем «Пароль».
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Пароли не совпадают'))
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>Зарегистрироваться</Button>
    </Form>
  )
}

export default RegisterForm
