export type Project = {
  id: string
  name: string
  description: string
  dialogsCount: number
}

export type Metric = {
  key: string
  label: string
  value: number
  suffix?: string
}

export type RequestStat = {
  id: string
  intent: string
  requests: number
  confidence: number
  fallbackRate: number
}

export type FallbackMessage = {
  id: string
  message: string
  intent: string
  confidence: number
  scenario: string
}

export type ScenarioStat = {
  id: string
  name: string
  completionRate: number
  abandonedRate: number
  fallbackRate: number
  operatorRate: number
}

export type BacklogPriority = 'Высокий' | 'Средний' | 'Низкий'
export type BacklogStatus = 'Открыта' | 'В работе' | 'Выполнена'

export type BacklogItem = {
  id: string
  title: string
  description: string
  priority: BacklogPriority
  status: BacklogStatus
  source: string
}

export type ProjectAnalytics = {
  metrics: Metric[]
  requests: RequestStat[]
  fallbackMessages: FallbackMessage[]
  scenarios: ScenarioStat[]
  backlogItems: BacklogItem[]
}
