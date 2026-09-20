import { Button, Card, Upload } from 'antd'
import PageHeader from '../components/PageHeader'

function ImportPage() {
  return (
    <section className="page">
      <PageHeader title="Импорт данных" description="Выберите CSV или JSON-файл с логами чат-бота." />
      <Card title="Загрузка файла" className="narrow-card">
        <Upload disabled showUploadList={false}>
          <Button>Выбрать файл</Button>
        </Upload>
      </Card>
    </section>
  )
}

export default ImportPage
