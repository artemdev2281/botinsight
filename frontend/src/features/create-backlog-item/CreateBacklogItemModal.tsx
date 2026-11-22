import { Button, Form, Input, Modal, Select, message } from 'antd'
import { useState } from 'react'
import {
  createBacklogItem,
  priorities,
  sources,
  type BacklogItem,
  type NewBacklogItem,
} from '../../entities/backlog/model'

type CreateBacklogItemModalProps = {
  projectId: string
  open: boolean
  onClose: () => void
  onCreated: (item: BacklogItem) => void
}

// Модальное окно с формой создания задачи в backlog.
function CreateBacklogItemModal({ projectId, open, onClose, onCreated }: CreateBacklogItemModalProps) {
  const [form] = Form.useForm<NewBacklogItem>()
  const [saving, setSaving] = useState(false)

  const handleFinish = async (values: NewBacklogItem) => {
    setSaving(true)
    try {
      const item = await createBacklogItem(projectId, values)
      message.success('Задача добавлена в backlog')
      form.resetFields()
      onCreated(item)
    } catch (error) {
      message.error((error as Error).message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal title="Новая задача" open={open} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" className="modal-form" onFinish={handleFinish}>
        <Form.Item
          label="Название"
          name="title"
          rules={[
            { required: true, whitespace: true, message: 'Введите название задачи' },
            { min: 5, message: 'Название должно быть не короче 5 символов' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Описание"
          name="description"
          rules={[{ max: 300, message: 'Описание должно быть не длиннее 300 символов' }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Приоритет" name="priority" rules={[{ required: true, message: 'Выберите приоритет' }]}>
          <Select options={priorities.map((value) => ({ value }))} />
        </Form.Item>
        <Form.Item label="Источник" name="source" rules={[{ required: true, message: 'Выберите источник' }]}>
          <Select options={sources.map((value) => ({ value }))} />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={saving}>Создать</Button>
      </Form>
    </Modal>
  )
}

export default CreateBacklogItemModal
