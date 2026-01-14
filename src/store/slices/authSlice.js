import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { users } from '../../mock/users';

let memoryToken = null;

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    console.log('Login thunk running with credentials:', credentials);

    const { email, password } = credentials;

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
      return rejectWithValue('Invalid email or password');
    }

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      orders: user.orders || [],
      token: 'fake-token-' + Math.random().toString(36).substring(2),
    };

    memoryToken = userResponse.token;

    console.log('Login successful, user:', userResponse);
    return userResponse;
  } catch (error) {
    console.error('Login error:', error);
    return rejectWithValue(error.message || 'Login failed');
  }
});

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const { email, name, password } = userData;

    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return rejectWithValue('User with this email already exists');
    }

    const newUser = {
      id: users.length + 1,
      name,
      email,
      orders: [],
      token: 'fake-token-' + Math.random().toString(36).substring(2),
    };

    users.push({ ...newUser, password });

    memoryToken = newUser.token;

    return newUser;
  } catch (error) {
    return rejectWithValue(error.message || 'Registration failed');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  memoryToken = null;
  return null;
});

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
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Login cases
      .addCase(login.pending, state => {
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
      .addCase(register.pending, state => {
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
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.status = 'idle';
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
