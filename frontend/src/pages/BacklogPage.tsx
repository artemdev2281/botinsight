import { Button, Card, Segmented, Table, Tag, type TableColumnsType } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  fetchBacklog,
  priorityColors,
  statuses,
  type BacklogItem,
  type BacklogPriority,
  type BacklogStatus,
} from '../entities/backlog/model'
import CreateBacklogItemModal from '../features/create-backlog-item/CreateBacklogItemModal'
import DataState from '../shared/ui/DataState'
import PageHeader from '../shared/ui/PageHeader'
import { useRequest } from '../shared/lib/useRequest'

type StatusFilter = 'Все' | BacklogStatus

const columns: TableColumnsType<BacklogItem> = [
  { title: 'Название', dataIndex: 'title' },
  { title: 'Приоритет', dataIndex: 'priority', render: (value: BacklogPriority) => <Tag color={priorityColors[value]}>{value}</Tag> },
  { title: 'Статус', dataIndex: 'status' },
  { title: 'Источник', dataIndex: 'source' },
]

function BacklogPage() {
  const { projectId = '' } = useParams()
  const { data: items, setData: setItems, loading, error } = useRequest(() => fetchBacklog(projectId))
  const [open, setOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Все')
  const [newItemId, setNewItemId] = useState<string | null>(null)

  // Показываем все задачи или только задачи с выбранным статусом.
  const visibleItems = (items ?? []).filter((item) => statusFilter === 'Все' || item.status === statusFilter)

  // Новую задачу ставим в начало списка и запоминаем её id, чтобы подсветить строку.
  const handleCreated = (item: BacklogItem) => {
    setItems([item, ...(items ?? [])])
    setNewItemId(item.id)
    setOpen(false)
  }

  return (
    <section className="page">
      <PageHeader
        title="Backlog"
        description="Задачи на улучшение чат-бота."
        action={<Button type="primary" onClick={() => setOpen(true)}>Создать задачу</Button>}
      />
      <Segmented<StatusFilter>
        className="summary-row"
        options={['Все', ...statuses]}
        value={statusFilter}
        onChange={setStatusFilter}
      />
      <DataState loading={loading} error={error} isEmpty={visibleItems.length === 0}>
        <Card>
          <Table
            dataSource={visibleItems}
            columns={columns}
            rowKey="id"
            pagination={false}
            scroll={{ x: 700 }}
            rowClassName={(item) => (item.id === newItemId ? 'new-row' : '')}
          />
        </Card>
      </DataState>

      <CreateBacklogItemModal
        projectId={projectId}
        open={open}
        onClose={() => setOpen(false)}
        onCreated={handleCreated}
      />
    </section>
  )
}

export default BacklogPage
