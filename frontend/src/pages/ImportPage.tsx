import { Card } from 'antd'
import ImportLogsForm from '../features/import-logs/ImportLogsForm'
import PageHeader from '../shared/ui/PageHeader'

function ImportPage() {
  return (
    <section className="page">
      <PageHeader title="Импорт данных" description="Выберите CSV или JSON-файл с логами чат-бота." />
      <Card title="Загрузка файла" className="narrow-card">
        <ImportLogsForm />
      </Card>
    </section>
  )
}

export default ImportPage
