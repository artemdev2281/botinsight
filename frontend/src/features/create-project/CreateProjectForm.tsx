import { Button, Form, Input, message } from 'antd'
import { useState } from 'react'
import { createProject, type NewProject, type Project } from '../../entities/project/model'

type CreateProjectFormProps = {
  onCreated: (project: Project) => void
}

// Форма создания проекта. Используется на странице /projects/new и в модальном окне на странице проектов.
function CreateProjectForm({ onCreated }: CreateProjectFormProps) {
  const [form] = Form.useForm<NewProject>()
  const [saving, setSaving] = useState(false)

  // Вызывается, только если все поля прошли валидацию.
  const handleFinish = async (values: NewProject) => {
    setSaving(true)
    try {
      const project = await createProject(values)
      message.success('Проект создан')
      form.resetFields()
      onCreated(project)
    } catch (error) {
      message.error((error as Error).message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Название"
        name="name"
        rules={[
          { required: true, whitespace: true, message: 'Введите название проекта' },
          { min: 3, message: 'Название должно быть не короче 3 символов' },
        ]}
      >
        <Input placeholder="Например, Support Bot" />
      </Form.Item>
      <Form.Item
        label="Описание"
        name="description"
        rules={[
          { required: true, whitespace: true, message: 'Введите описание проекта' },
          { max: 200, message: 'Описание должно быть не длиннее 200 символов' },
        ]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={saving}>Создать</Button>
    </Form>
  )
}

export default CreateProjectForm
