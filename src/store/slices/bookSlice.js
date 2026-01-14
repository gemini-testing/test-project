import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { books } from '../../mock/books';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (params = {}, { rejectWithValue }) => {
  try {
    const { genre, search, sortBy, priceMin, priceMax } = params;
    let filteredBooks = [...books];

    // Filter by genre
    if (genre && genre !== 'All') {
      filteredBooks = filteredBooks.filter(book => book.genre === genre);
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      filteredBooks = filteredBooks.filter(
        book => book.title.toLowerCase().includes(searchLower) || book.author.toLowerCase().includes(searchLower)
      );
    }

    // Filter by price range
    if (priceMin !== undefined && priceMin !== null) {
      filteredBooks = filteredBooks.filter(book => book.price >= priceMin);
    }
    if (priceMax !== undefined && priceMax !== null) {
      filteredBooks = filteredBooks.filter(book => book.price <= priceMax);
    }

    // Sort books
    if (sortBy) {
      switch (sortBy) {
        case 'price-low':
          filteredBooks.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredBooks.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredBooks.sort((a, b) => b.rating - a.rating);
          break;
        case 'title-az':
          filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'title-za':
          filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          break;
      }
    }

    return filteredBooks;
  } catch {
    return rejectWithValue('Failed to fetch books');
  }
});

export const fetchBookById = createAsyncThunk('books/fetchBookById', async (id, { rejectWithValue }) => {
  try {
    const book = books.find(b => b.id === parseInt(id, 10));

    if (!book) {
      throw new Error('Book not found');
    }

    return book;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch book details');
  }
});

const initialState = {
  items: [],
  selectedBook: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: {
    genre: 'All',
    search: '',
    sortBy: '',
    priceMin: null,
    priceMax: null,
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 12,
  },
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // Reset to first page when filters change
      state.pagination.currentPage = 1;
    },
    clearFilters: state => {
      state.filters = {
        genre: 'All',
        search: '',
        sortBy: '',
        priceMin: null,
        priceMax: null,
      };
      state.pagination.currentPage = 1;
    },
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
      state.pagination.currentPage = 1;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch books cases
      .addCase(fetchBooks.pending, state => {
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
      .addCase(fetchBookById.pending, state => {
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

export const { setFilter, clearFilters, setPage, setSortBy } = bookSlice.actions;

export default bookSlice.reducer;
