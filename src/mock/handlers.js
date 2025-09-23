// src/mock/handlers.js
import { rest } from 'msw';
import { books } from './books';
import { users } from './users';

export const handlers = [
  // Get all books
  rest.get('/api/books', (req, res, ctx) => {
    const genre = req.url.searchParams.get('genre');
    const search = req.url.searchParams.get('search');
    
    let result = [...books];
    
    if (genre && genre !== 'All') {
      result = result.filter(book => book.genre === genre);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchLower) || 
        book.author.toLowerCase().includes(searchLower)
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json(result)
    );
  }),
  
  // Get book by ID
  rest.get('/api/books/:id', (req, res, ctx) => {
    const { id } = req.params;
    const book = books.find(b => b.id === parseInt(id, 10));
    
    if (!book) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Book not found' })
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json(book)
    );
  }),
  
  // Login
  rest.post('/api/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      return res(
        ctx.status(401),
        ctx.json({ message: 'Invalid email or password' })
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: 'mock-jwt-token'
      })
    );
  }),
  
  // Остальные обработчики
  // ...
];
