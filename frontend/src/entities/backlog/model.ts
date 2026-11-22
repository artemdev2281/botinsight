import { fakeRequest } from '../../shared/api/fakeRequest'

export type BacklogPriority = 'Высокий' | 'Средний' | 'Низкий'
export type BacklogStatus = 'Открыта' | 'В работе' | 'Выполнена'
export type BacklogSource = 'Fallback' | 'Scenarios' | 'Requests'

export type BacklogItem = {
  id: string
  title: string
  description: string
  priority: BacklogPriority
  status: BacklogStatus
  source: BacklogSource
}

// Данные, которые пользователь вводит в форме создания задачи.
export type NewBacklogItem = Pick<BacklogItem, 'title' | 'description' | 'priority' | 'source'>

export const priorities: BacklogPriority[] = ['Высокий', 'Средний', 'Низкий']
export const statuses: BacklogStatus[] = ['Открыта', 'В работе', 'Выполнена']
export const sources: BacklogSource[] = ['Fallback', 'Scenarios', 'Requests']

export const priorityColors: Record<BacklogPriority, string> = {
  'Высокий': 'red',
  'Средний': 'orange',
  'Низкий': 'blue',
}

// Демонстрационные данные (до подключения backend).
const backlogByProject: Record<string, BacklogItem[]> = {
  '1': [
    { id: 'b1', title: 'Проблема сценария оплаты', description: 'Добавить обработку отмены платежа.', priority: 'Высокий', status: 'Открыта', source: 'Fallback' },
    { id: 'b2', title: 'Ошибка регистрации', description: 'Упростить ввод телефона и кода.', priority: 'Средний', status: 'В работе', source: 'Scenarios' },
    { id: 'b3', title: 'Уточнить статус карты', description: 'Добавить ответ для карт в доставке.', priority: 'Высокий', status: 'Открыта', source: 'Requests' },
    { id: 'b4', title: 'Подсказки по тарифам', description: 'Обновить тексты в ветке с комиссиями.', priority: 'Низкий', status: 'Выполнена', source: 'Fallback' },
  ],
  '2': [
    { id: 'b1', title: 'Скидка на набор товаров', description: 'Научить бота рассчитывать оптовую скидку.', priority: 'Высокий', status: 'В работе', source: 'Fallback' },
    { id: 'b2', title: 'Интервал доставки', description: 'Добавить выбор точного времени.', priority: 'Средний', status: 'Открыта', source: 'Scenarios' },
    { id: 'b3', title: 'Подбор комплекта', description: 'Уточнять цель покупки перед рекомендациями.', priority: 'Высокий', status: 'Открыта', source: 'Requests' },
  ],
}

export const fetchBacklog = (projectId: string) => fakeRequest([...(backlogByProject[projectId] ?? [])])

export const createBacklogItem = (projectId: string, values: NewBacklogItem) => {
  const item: BacklogItem = { id: String(Date.now()), status: 'Открыта', ...values }
  backlogByProject[projectId] = [item, ...(backlogByProject[projectId] ?? [])]
  return fakeRequest(item)
}
