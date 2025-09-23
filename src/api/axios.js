import axios from 'axios';

// Создаем инстанс axios с базовыми настройками
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', // Базовый URL из переменных окружения
  timeout: 10000, // Таймаут запросов 10 секунд
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем перехватчик запросов для добавления токена авторизации
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Перехватчик ответов для обработки общих ошибок
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Обработка ошибок авторизации (401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Опционально можно добавить редирект на страницу входа
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
