import { useEffect, useState } from 'react'

// Общий хук для загрузки данных: хранит сами данные, флаг загрузки и текст ошибки.
// Используется на всех экранах с данными, чтобы не повторять один и тот же код.
export function useRequest<T>(request: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    request()
      .then((result) => setData(result))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
    // Запрос выполняется один раз — при открытии страницы.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, setData, loading, error }
}
