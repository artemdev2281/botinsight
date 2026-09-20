import type { Project, ProjectAnalytics } from './types'

export const projects: Project[] = [
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

export const analyticsByProject: Record<string, ProjectAnalytics> = {
  '1': {
    metrics: [
      { key: 'dialogs', label: 'Диалоги', value: 12540 },
      { key: 'fallback', label: 'Fallback rate', value: 8.3, suffix: '%' },
      { key: 'completion', label: 'Completion rate', value: 71, suffix: '%' },
      { key: 'operator', label: 'Operator rate', value: 6.2, suffix: '%' },
    ],
    requests: [
      { id: 'r1', intent: 'check_balance', requests: 1820, confidence: 0.94, fallbackRate: 2.1 },
      { id: 'r2', intent: 'money_transfer', requests: 1440, confidence: 0.89, fallbackRate: 4.8 },
      { id: 'r3', intent: 'card_status', requests: 1260, confidence: 0.81, fallbackRate: 7.2 },
      { id: 'r4', intent: 'tariffs', requests: 970, confidence: 0.76, fallbackRate: 9.3 },
      { id: 'r5', intent: 'cash_withdrawal', requests: 740, confidence: 0.85, fallbackRate: 5.6 },
      { id: 'r6', intent: 'close_account', requests: 380, confidence: 0.68, fallbackRate: 14.1 },
    ],
    fallbackMessages: [
      { id: 'f1', message: '«Как отменить перевод?»', intent: 'money_transfer', confidence: 0.34, scenario: 'Перевод денег' },
      { id: 'f2', message: '«Где моя карта?»', intent: 'card_status', confidence: 0.41, scenario: 'Доставка карты' },
      { id: 'f3', message: '«Почему списали комиссию?»', intent: 'fees', confidence: 0.29, scenario: 'Тарифы' },
      { id: 'f4', message: '«Можно ли снять доллары?»', intent: 'cash_withdrawal', confidence: 0.38, scenario: 'Снятие наличных' },
      { id: 'f5', message: '«Хочу закрыть всё»', intent: 'close_account', confidence: 0.22, scenario: 'Закрытие счёта' },
    ],
    scenarios: [
      { id: 's1', name: 'Оплата услуг', completionRate: 82, abandonedRate: 9, fallbackRate: 5, operatorRate: 4 },
      { id: 's2', name: 'Регистрация', completionRate: 67, abandonedRate: 13, fallbackRate: 12, operatorRate: 8 },
      { id: 's3', name: 'Перевод денег', completionRate: 74, abandonedRate: 11, fallbackRate: 9, operatorRate: 6 },
      { id: 's4', name: 'Блокировка карты', completionRate: 91, abandonedRate: 3, fallbackRate: 2, operatorRate: 4 },
    ],
    backlogItems: [
      { id: 'b1', title: 'Проблема сценария оплаты', description: 'Добавить обработку отмены платежа.', priority: 'Высокий', status: 'Открыта', source: 'Fallback' },
      { id: 'b2', title: 'Ошибка регистрации', description: 'Упростить ввод телефона и кода.', priority: 'Средний', status: 'В работе', source: 'Scenarios' },
      { id: 'b3', title: 'Уточнить статус карты', description: 'Добавить ответ для карт в доставке.', priority: 'Высокий', status: 'Открыта', source: 'Requests' },
      { id: 'b4', title: 'Подсказки по тарифам', description: 'Обновить тексты в ветке с комиссиями.', priority: 'Низкий', status: 'Выполнена', source: 'Fallback' },
    ],
  },
  '2': {
    metrics: [
      { key: 'dialogs', label: 'Диалоги', value: 8240 },
      { key: 'fallback', label: 'Fallback rate', value: 12.6, suffix: '%' },
      { key: 'completion', label: 'Completion rate', value: 64, suffix: '%' },
      { key: 'operator', label: 'Operator rate', value: 9.4, suffix: '%' },
    ],
    requests: [
      { id: 'r1', intent: 'product_catalog', requests: 2130, confidence: 0.91, fallbackRate: 3.5 },
      { id: 'r2', intent: 'delivery_terms', requests: 1670, confidence: 0.83, fallbackRate: 7.9 },
      { id: 'r3', intent: 'discounts', requests: 1180, confidence: 0.72, fallbackRate: 13.6 },
      { id: 'r4', intent: 'order_status', requests: 940, confidence: 0.88, fallbackRate: 5.1 },
      { id: 'r5', intent: 'custom_offer', requests: 520, confidence: 0.62, fallbackRate: 19.8 },
    ],
    fallbackMessages: [
      { id: 'f1', message: '«А если я возьму три штуки?»', intent: 'discounts', confidence: 0.31, scenario: 'Скидки' },
      { id: 'f2', message: '«Привезёте к девяти утра?»', intent: 'delivery_terms', confidence: 0.37, scenario: 'Доставка' },
      { id: 'f3', message: '«Посоветуй набор для офиса»', intent: 'custom_offer', confidence: 0.25, scenario: 'Подбор товара' },
      { id: 'f4', message: '«Можно поменять цвет в заказе?»', intent: 'order_change', confidence: 0.33, scenario: 'Заказ' },
    ],
    scenarios: [
      { id: 's1', name: 'Подбор товара', completionRate: 69, abandonedRate: 15, fallbackRate: 10, operatorRate: 6 },
      { id: 's2', name: 'Оформление заказа', completionRate: 78, abandonedRate: 10, fallbackRate: 5, operatorRate: 7 },
      { id: 's3', name: 'Расчёт доставки', completionRate: 61, abandonedRate: 17, fallbackRate: 14, operatorRate: 8 },
      { id: 's4', name: 'Проверка статуса', completionRate: 86, abandonedRate: 6, fallbackRate: 3, operatorRate: 5 },
    ],
    backlogItems: [
      { id: 'b1', title: 'Скидка на набор товаров', description: 'Научить бота рассчитывать оптовую скидку.', priority: 'Высокий', status: 'В работе', source: 'Fallback' },
      { id: 'b2', title: 'Интервал доставки', description: 'Добавить выбор точного времени.', priority: 'Средний', status: 'Открыта', source: 'Scenarios' },
      { id: 'b3', title: 'Подбор комплекта', description: 'Уточнять цель покупки перед рекомендациями.', priority: 'Высокий', status: 'Открыта', source: 'Requests' },
    ],
  },
}

export const getProject = (projectId?: string) => projects.find((project) => project.id === projectId)

export const getProjectAnalytics = (projectId?: string) =>
  (projectId && analyticsByProject[projectId]) || analyticsByProject['1']
