export const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://dummyimage.com/300x450/4287f5/ffffff&text=The+Great+Gatsby",
    price: 12.99,
    rating: 4.5,
    description: "Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    publisher: "Scribner",
    year: 1925,
    isbn: "9780743273565",
    pages: 180,
    genre: "Fiction", // Изменяем на Fiction
    formats: [
      {type: "Paperback", price: 12.99},
      {type: "Hardcover", price: 18.99},
      {type: "E-book", price: 7.99}
    ],
    reviews: [
      {user: "John D.", rating: 5, comment: "A timeless classic that never gets old."},
      {user: "Sarah M.", rating: 4, comment: "Beautifully written, captures the essence of the era."}
    ]
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "https://dummyimage.com/300x450/6C47FF/ffffff&text=To+Kill+a+Mockingbird",
    price: 14.99,
    rating: 4.8,
    description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. It became both an instant bestseller and a critical success when it was first published and has since been translated into more than 40 languages.",
    publisher: "HarperCollins",
    year: 1960,
    isbn: "9780061120084",
    pages: 336,
    genre: "Fiction", // Изменяем на Fiction
    formats: [
      {type: "Paperback", price: 14.99},
      {type: "Hardcover", price: 22.99},
      {type: "E-book", price: 9.99},
      {type: "Audiobook", price: 24.99}
    ],
    reviews: [
      {user: "Michael R.", rating: 5, comment: "One of the greatest novels of all time."},
      {user: "Emily W.", rating: 5, comment: "Required reading for everyone."},
      {user: "Robert J.", rating: 4, comment: "Deep and thoughtful story."}
    ]
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    cover: "https://dummyimage.com/300x450/C24CEA/ffffff&text=1984",
    price: 11.99,
    rating: 4.7,
    description: "A dystopian novel by English novelist George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
    publisher: "Secker & Warburg",
    year: 1949,
    isbn: "9780451524935",
    pages: 328,
    genre: "Science Fiction",
    formats: [
      {type: "Paperback", price: 11.99},
      {type: "Hardcover", price: 17.99},
      {type: "E-book", price: 6.99},
      {type: "Audiobook", price: 19.99}
    ],
    reviews: [
      {user: "David K.", rating: 5, comment: "Prophetic and frightening."},
      {user: "Anna L.", rating: 5, comment: "A warning for all times."}
    ]
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "https://dummyimage.com/300x450/F9D6C1/000000&text=Pride+and+Prejudice",
    price: 9.99,
    rating: 4.6,
    description: "The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of the British Regency.",
    publisher: "T. Egerton, Whitehall",
    year: 1813,
    isbn: "9780141439518",
    pages: 432,
    genre: "Romance",
    formats: [
      {type: "Paperback", price: 9.99},
      {type: "Hardcover", price: 15.99},
      {type: "E-book", price: 5.99},
      {type: "Audiobook", price: 18.99}
    ],
    reviews: [
      {user: "Catherine P.", rating: 5, comment: "A perfect novel with unforgettable characters."},
      {user: "Thomas G.", rating: 4, comment: "Witty and engaging throughout."}
    ]
  },
  {
    id: 5,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover: "https://dummyimage.com/300x450/F9D6C1/000000&text=The+Hobbit",
    price: 13.99,
    rating: 4.9,
    description: "Written for J.R.R. Tolkien's own children, The Hobbit meets the quest for adventure. A reluctant hero, Bilbo Baggins, goes on an unexpected journey and finds himself in the midst of dragons, goblins, and magical rings.",
    publisher: "Allen & Unwin",
    year: 1937,
    isbn: "9780547928227",
    pages: 366,
    genre: "Fantasy",
    formats: [
      {type: "Paperback", price: 13.99},
      {type: "Hardcover", price: 21.99},
      {type: "E-book", price: 8.99},
      {type: "Audiobook", price: 24.99}
    ],
    reviews: [
      {user: "Peter J.", rating: 5, comment: "The perfect introduction to Middle Earth."},
      {user: "Susan B.", rating: 5, comment: "A magical adventure from start to finish."}
    ]
  },
  // Добавим новые книги разных жанров
  {
    id: 6,
    title: "History of Humankind",
    author: "Yuval Noah Harari",
    cover: "https://dummyimage.com/300x450/C24CEA/ffffff&text=History+of+Humankind",
    price: 15.99,
    rating: 4.7,
    description: "A groundbreaking narrative of humanity's creation and evolution that explores how biology and history have defined us and enhanced our understanding of what it means to be 'human.'",
    publisher: "Harper",
    year: 2015,
    isbn: "9780062316097",
    pages: 464,
    genre: "Non-Fiction",
    formats: [
      {type: "Paperback", price: 15.99},
      {type: "Hardcover", price: 24.99},
      {type: "E-book", price: 12.99},
      {type: "Audiobook", price: 29.99}
    ],
    reviews: [
      {user: "James H.", rating: 5, comment: "Mind-blowing perspective on human history."},
      {user: "Lisa T.", rating: 4, comment: "Thought-provoking and accessible."}
    ]
  },
  {
    id: 7,
    title: "Educated",
    author: "Tara Westover",
    cover: "https://dummyimage.com/300x450/6C47FF/ffffff&text=Educated",
    price: 14.49,
    rating: 4.8,
    description: "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    publisher: "Random House",
    year: 2018,
    isbn: "9780399590504",
    pages: 352,
    genre: "Non-Fiction",
    formats: [
      {type: "Paperback", price: 14.49},
      {type: "Hardcover", price: 22.99},
      {type: "E-book", price: 9.99},
      {type: "Audiobook", price: 24.99}
    ],
    reviews: [
      {user: "Mark P.", rating: 5, comment: "Powerful and inspiring journey."},
      {user: "Jennifer K.", rating: 4, comment: "Beautifully written and moving."}
    ]
  },
  {
    id: 8,
    title: "Gone Girl",
    author: "Gillian Flynn",
    cover: "https://dummyimage.com/300x450/4287f5/ffffff&text=Gone+Girl",
    price: 12.99,
    rating: 4.6,
    description: "On a warm summer morning in North Carthage, Missouri, it is Nick and Amy Dunne's fifth wedding anniversary. Presents are being wrapped and reservations are being made when Nick's clever and beautiful wife disappears.",
    publisher: "Crown Publishing Group",
    year: 2012,
    isbn: "9780307588371",
    pages: 432,
    genre: "Thriller",
    formats: [
      {type: "Paperback", price: 12.99},
      {type: "Hardcover", price: 19.99},
      {type: "E-book", price: 8.99},
      {type: "Audiobook", price: 22.99}
    ],
    reviews: [
      {user: "Sarah J.", rating: 5, comment: "Twisted and unpredictable."},
      {user: "Robert L.", rating: 4, comment: "A psychological thriller that keeps you guessing."}
    ]
  }
];

export const getBookById = (id) => {
  return books.find(book => book.id === parseInt(id, 10));
};

export const getBooksByGenre = (genre) => {
  if (!genre || genre === 'All') return books;
  return books.filter(book => book.genre === genre);
};

export const searchBooks = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(lowercaseQuery) || 
    book.author.toLowerCase().includes(lowercaseQuery)
  );
};

// Функция для получения книг по автору
export const getBooksByAuthor = (author) => {
  return books.filter(book => book.author.toLowerCase() === author.toLowerCase());
};

// Функция для получения списка всех авторов
export const getAllAuthors = () => {
  const authorSet = new Set(books.map(book => book.author));
  return Array.from(authorSet).sort();
};

// Функция для преобразования slug автора в имя автора
export const getAuthorNameFromSlug = (slug) => {
  const normalizedSlug = slug.toLowerCase();
  const author = books.find(
    book => book.author.toLowerCase().replace(/\s+/g, '-') === normalizedSlug
  )?.author;
  
  return author;
};