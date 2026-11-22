import { Card, Empty, Result, Spin } from 'antd'
import type { ReactNode } from 'react'

type DataStateProps = {
  loading: boolean
  error: string | null
  isEmpty: boolean
  children: ReactNode
}

// Показывает одно из состояний экрана: загрузка, ошибка, нет данных или сами данные.
function DataState({ loading, error, isEmpty, children }: DataStateProps) {
  if (loading) {
    return (
      <Card className="state-card">
        <Spin size="large" />
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="state-card">
        <Result status="error" title="Не удалось загрузить данные" subTitle={error} />
      </Card>
    )
  }

  if (isEmpty) {
    return (
      <Card className="state-card">
        <Empty description="Данных пока нет" />
      </Card>
    )
  }

  return <div className="fade-in">{children}</div>
}

export default DataState
