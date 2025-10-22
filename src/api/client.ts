import axios, {AxiosError, type AxiosInstance} from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const apiClient: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 30000,
})

apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (error.response) {
			const status = error.response.status
			const data = error.response.data as {detail?: string}

			switch (status) {
				case 404:
					console.error('Ресурс не найден:', data.detail)
					break
				case 422:
					console.error('Некорректные параметры:', data.detail)
					break
				case 500:
					console.error('Внутренняя ошибка сервера:', data.detail)
					break
				default:
					console.error('Ошибка API:', data.detail || error.message)
			}
		} else if (error.request) {
			console.error('Сервер не отвечает')
		} else {
			console.error('Ошибка запроса:', error.message)
		}

		return Promise.reject(error)
	},
)
