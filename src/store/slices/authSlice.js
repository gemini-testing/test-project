// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { users } from '../../mock/users';

// Вместо localStorage будем использовать переменную для хранения токена в памяти
// (для учебного проекта это приемлемое решение)
let memoryToken = null;

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Login thunk running with credentials:', credentials); // Для отладки
      
      // Имитируем задержку для демонстрации асинхронного поведения
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const { email, password } = credentials;
      
      // Найдем пользователя в нашем моке данных
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      // Проверка учетных данных
      if (!user || user.password !== password) {
        return rejectWithValue('Invalid email or password');
      }
      
      // Создаем объект пользователя без пароля для возврата
      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        orders: user.orders || [],
        token: 'fake-token-' + Math.random().toString(36).substring(2)
      };
      
      // Сохраняем токен
      memoryToken = userResponse.token;
      
      console.log('Login successful, user:', userResponse); // Для отладки
      return userResponse;
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      // Имитируем задержку
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const { email, name, password } = userData;
      
      // Проверяем, существует ли уже пользователь с таким email
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        return rejectWithValue('User with this email already exists');
      }
      
      // Создаем нового пользователя
      const newUser = {
        id: users.length + 1,
        name,
        email,
        orders: [],
        token: 'fake-token-' + Math.random().toString(36).substring(2)
      };
      
      // В реальном приложении здесь был бы API-запрос для сохранения пользователя
      // Для демо просто добавляем его в наш массив users (хотя это не будет сохранено после перезагрузки)
      users.push({...newUser, password});
      
      // Сохраняем токен
      memoryToken = newUser.token;
      
      return newUser;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    // Очищаем токен
    memoryToken = null;
    return null;
  }
);

// Получаем пользователя из памяти вместо localStorage
const getUserFromMemory = () => {
  if (memoryToken) {
    return { token: memoryToken };
  }
  return null;
};

const initialState = {
  user: getUserFromMemory(),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      })
      
      // Register cases
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Registration failed';
      })
      
      // Logout case
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
