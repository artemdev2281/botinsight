import { Button, Card, Form, Input, Modal, Select, Table, Tag, type TableColumnsType } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { getProjectAnalytics } from '../mockData'
import type { BacklogItem } from '../types'

const priorityColors = { 'Высокий': 'red', 'Средний': 'orange', 'Низкий': 'blue' }

const columns: TableColumnsType<BacklogItem> = [
  { title: 'Название', dataIndex: 'title' },
  { title: 'Приоритет', dataIndex: 'priority', render: (value: BacklogItem['priority']) => <Tag color={priorityColors[value]}>{value}</Tag> },
  { title: 'Статус', dataIndex: 'status' },
  { title: 'Источник', dataIndex: 'source' },
]

function BacklogPage() {
  const { projectId } = useParams()
  const items = getProjectAnalytics(projectId).backlogItems
  const [open, setOpen] = useState(false)

  return (
    <section className="page">
      <PageHeader
        title="Backlog"
        description="Задачи на улучшение чат-бота."
        action={<Button type="primary" onClick={() => setOpen(true)}>Создать задачу</Button>}
      />
      <Card>
        <Table dataSource={items} columns={columns} rowKey="id" pagination={false} scroll={{ x: 700 }} />
      </Card>

      <Modal
        title="Новая задача"
        open={open}
        onCancel={() => setOpen(false)}
        footer={<Button onClick={() => setOpen(false)}>Закрыть</Button>}
      >
        <Form layout="vertical" disabled className="modal-form">
          <Form.Item label="Название"><Input /></Form.Item>
          <Form.Item label="Описание"><Input.TextArea rows={3} /></Form.Item>
          <Form.Item label="Приоритет">
            <Select options={['Высокий', 'Средний', 'Низкий'].map((value) => ({ value }))} />
          </Form.Item>
          <Form.Item label="Источник">
            <Select options={['Fallback', 'Scenarios', 'Requests'].map((value) => ({ value }))} />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  )
}

export default BacklogPage
