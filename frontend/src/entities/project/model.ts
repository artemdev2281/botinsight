import { fakeRequest } from '../../shared/api/fakeRequest'

export type Project = {
  id: string
  name: string
  description: string
  dialogsCount: number
}

// Данные, которые пользователь вводит в форме создания проекта.
export type NewProject = {
  name: string
  description: string
}

// Демонстрационные данные (до подключения backend).
const projects: Project[] = [
  {
    id: '1',
    name: 'Support Bot',
    description: 'Помогает клиентам решать вопросы по картам, переводам и тарифам.',
    dialogsCount: 12540,
  },
  {
    id: '2',
    name: 'Sales Bot',
    description: 'Консультирует по продуктам, собирает лиды и помогает оформить заказ.',
    dialogsCount: 8240,
  },
]

export const getProject = (projectId?: string) => projects.find((project) => project.id === projectId)

export const fetchProjects = () => fakeRequest([...projects])

export const createProject = (values: NewProject) => {
  const project: Project = { id: String(Date.now()), dialogsCount: 0, ...values }
  projects.push(project)
  return fakeRequest(project)
}
