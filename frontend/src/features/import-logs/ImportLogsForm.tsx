import { Alert, Button, Space, Typography, Upload, message } from 'antd'
import { useState } from 'react'
import { fakeRequest } from '../../shared/api/fakeRequest'

const { Text } = Typography

// Выбор и загрузка файла с логами. Проверяет, что файл имеет формат CSV или JSON.
function ImportLogsForm() {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  // Вызывается при выборе файла. Возвращаем false, чтобы antd не отправлял файл сам.
  const handleSelect = (selected: File) => {
    const name = selected.name.toLowerCase()
    if (name.endsWith('.csv') || name.endsWith('.json')) {
      setFile(selected)
      setError(null)
    } else {
      setFile(null)
      setError('Можно загрузить только файл в формате CSV или JSON')
    }
    return false
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    try {
      await fakeRequest(file)
      message.success(`Файл ${file.name} загружен`)
      setFile(null)
    } catch (err) {
      message.error((err as Error).message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Space orientation="vertical" size="middle">
      <Upload beforeUpload={handleSelect} showUploadList={false}>
        <Button>Выбрать файл</Button>
      </Upload>
      {file && <Text className="fade-in">Выбран файл: {file.name}</Text>}
      {error && <Alert className="fade-in" type="error" title={error} showIcon />}
      <Button type="primary" disabled={!file} loading={uploading} onClick={handleUpload}>
        Загрузить
      </Button>
    </Space>
  )
}

export default ImportLogsForm
