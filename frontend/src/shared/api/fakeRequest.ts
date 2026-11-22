// Имитация запроса к серверу (до подключения настоящего API в ЛР №5).
// Через 600 мс возвращает данные. Если в адресе страницы есть "?error",
// запрос завершается ошибкой — так можно проверить состояние ошибки.
export function fakeRequest<T>(data: T): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (window.location.search.includes('error')) {
        reject(new Error('Сервер недоступен. Попробуйте позже.'))
      } else {
        resolve(data)
      }
    }, 600)
  })
}
