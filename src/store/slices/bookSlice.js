// src/store/slices/bookSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Импортируем данные напрямую
import { books } from '../../mock/books';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (params = {}, { rejectWithValue }) => {
    try {
      // Имитируем задержку для демонстрации загрузки
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const { genre, search } = params;
      let filteredBooks = [...books];
      
      // Фильтрация по жанру
      if (genre && genre !== 'All') {
        filteredBooks = filteredBooks.filter(book => book.genre === genre);
      }
      
      // Фильтрация по поиску
      if (search) {
        const searchLower = search.toLowerCase();
        filteredBooks = filteredBooks.filter(book => 
          book.title.toLowerCase().includes(searchLower) || 
          book.author.toLowerCase().includes(searchLower)
        );
      }
      
      return filteredBooks;
    } catch (error) {
      return rejectWithValue('Failed to fetch books');
    }
  }
);

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (id, { rejectWithValue }) => {
    try {
      // Имитируем задержку
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const book = books.find(b => b.id === parseInt(id, 10));
      
      if (!book) {
        throw new Error('Book not found');
      }
      
      return book;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch book details');
    }
  }
);

const initialState = {
  items: [],
  selectedBook: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: {
    genre: 'All',
    search: '',
  },
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { genre: 'All', search: '' };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch books cases
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch books';
      })

      // Fetch book by ID cases
      .addCase(fetchBookById.pending, (state) => {
        state.status = 'loading';
        state.selectedBook = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch book details';
      });
  },
});

export const { setFilter, clearFilters } = bookSlice.actions;

export default bookSlice.reducer;
