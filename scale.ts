//first define your types and initial state

type Book = {
  //book object is defined as follows
  id: number;
  title: string;
  author: string;
  year: number;
  genres: string[];
};

type AppState = {
  //appName: string;
  books: Book[]; // an array of booktype objects as defined above
};

const initialState: AppState = {
  //appName: "app",
  books: [
    {
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      year: 1960,
      genres: ["Fiction", "Drama"],
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      year: 1949,
      genres: ["Fiction", "Dystopian"],
    },
    {
      id: 3,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      year: 1813,
      genres: ["Fiction", "Romance"],
    },
    {
      id: 4,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      year: 1937,
      genres: ["Fiction", "Fantasy"],
    },
    {
      id: 5,
      title: "To the Lighthouse",
      author: "Virginia Woolf",
      year: 1927,
      genres: ["Fiction", "Modernist"],
    },
  ],
};

//basic array options

//first return the first book in the books array
function getFirstBook(state: AppState): Book | undefined {
  return state.books[0];
}

//test the function
function demonstrateBasicOperations(state: AppState): void {
  const firstBook = getFirstBook(state);
  console.log("First Book:", firstBook);
}

//build some more functions

function getLastBook(state: AppState): Book | undefined {
  return state.books[state.books.length - 1];
}

function addBook(state: AppState, newBook: Book): AppState {
  return {
    ...state, //this is a bit redundant but it increases the reliabliity of the function by futureproofing it a bit should our object change to include more keys
    books: [...state.books, newBook],
  };
}

function removeFirstBook(state: AppState): AppState {
  const booksWithoutFirst = state.books.slice(1); // remember slice returns a Copy, so its not mutating the original array
  return {
    ...state,
    books: booksWithoutFirst,
  };
}

function findBooksByTtitle(state: AppState, title: string): Book | undefined {
  return state.books.find((book) => book.title === title);
}

// filter is a powerful array method that takes a function which returns a boolean
// the function is applied to each element in the array, and the elements which return true are returned
function filterBooksbyGenre(state: AppState, genre: string): Book[] {
  return state.books.filter((book) => book.genres.includes(genre));
}

//does the library have a book by a given author?
function libraryHasAuthor(state: AppState, author: string): boolean {
  return state.books.some((book) => book.author === author);
}

//okay, now test all functions

function demonstrateBasicOperations2(state: AppState): void {
  console.log("first book:", getFirstBook(state));
  console.log("last book:", getLastBook(state));

  const newBook: Book = {
    id: 6,
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    genres: ["Science Fiction"],
  };
  const updatedState = addBook(state, newBook);
  console.log("Books after adding:", updatedState.books);

  const stateWithoutFirst = removeFirstBook(state);
  console.log("Books without first:", stateWithoutFirst.books);

  console.log("found book:", findBooksByTtitle(state, "1984"));

  const fictionBooks = filterBooksbyGenre(state, "Fiction");
  console.log("Fictionbooks:", fictionBooks);

  const hasJaneBook = libraryHasAuthor(state, "Jane Austen"); //chaining together function by taking broader functions and narrowing specificity/functionality
  console.log("has Jane Austen book?:", hasJaneBook);
}

//Array transformation

function getAllTitles(state: AppState): string[] {
  return state.books.map((book) => book.title);
}

function getModernBooks(state: AppState): Book[] {
  return state.books.filter((book) => book.year > 1950);
}

function getErliestPublicationYear(state: AppState): number {
  return state.books.reduce(
    (earliest, book) => Math.min(earliest, book.year),
    Infinity
  );
}

function sortBooksByYear(state: AppState): AppState {
  const sortedBooks = [...state.books].sort((a, b) => a.year - b.year);
  return {
    ...state,
    books: sortedBooks,
  };
}

//example of using toSorted()

function sortBooksByYear2(state: AppState): AppState {
  return {
    ...state,
    books: [...state.books].sort((a, b) => a.year - b.year),
  };
}

function reverseBooks(state: AppState): AppState {
  const reversedBooks = [...state.books].reverse();
  return {
    ...state,
    books: reversedBooks,
  };
}

function reverseBooks2(state: AppState): AppState {
  return {
    ...state,
    books: state.books.reverse(),
  };
}

//Usage

function demonstrateArrayTransformation(state: AppState): void {
  console.log("All titles:", getAllTitles(state));
  console.log("Modern Books:", getModernBooks(state));
  console.log("Earliest publication year:", getErliestPublicationYear(state));

  console.log("Books sorted by year:", sortBooksByYear(state));
  console.log("Books sorted by year 2", sortBooksByYear2);

  console.log("Reversed Books;", reverseBooks(state));
  console.log("Reversed books 2", reverseBooks2(state));
}

//demonstrateBasicOperations(initialState)

//Step 4: Advanced Array Options:

function getAllGenres(state: AppState): string[] {
  const allGenres = state.books.flatMap((book) => book.genres);
  const removeDuplicates = new Set(allGenres);
  return [...removeDuplicates];
}
//get a list of all the authors and the titles o all the books

function getAllAuthorsandTitles(state: AppState): string[][] {
  return state.books.map((book) => [book.author, book.title]);
}

function areAllBooksFiction(state: AppState): boolean {
  return state.books.every((book) => book.genres.includes("Fiction"));
}

function doAllBooksHaveTitles(state: AppState): boolean {
  return state.books.every((book) => book.title && book.title.length > 0);
}

function getGenreCounts(state: AppState): Record<string, number> {
  return state.books.reduce((counts, book) => {
    book.genres.forEach((genre) => {
      counts[genre] = (counts[genre] || 0) + 1;
    });
    return counts;
  }, {} as Record<string, number>);
}

function demonstrateAdvancedOperations(state: AppState): void {
  console.log("All genres (flattened):", getAllGenres(state));
  console.log("Authors and their books", getAllAuthorsandTitles(state));
  console.log("All books are finction:", areAllBooksFiction(state));
  console.log("All books have titles:", doAllBooksHaveTitles(state));
  console.log("Genre counts:", getGenreCounts);
}

// Step 5: Object Operations:

function getBookProperties(book: Book): string[] {
  return Object.keys(book);
}

function getBookValues(book: Book): any[] {
  return Object.values(book);
}

function getBookEntries(book: Book): [string, any][] {
  return Object.entries(book);
}

function shallowCloneBook(book: Book): Book {
  return { ...book };
}

function cloneBook(book: Book): Book {
  return structuredClone(book);
}

function changeYearOfBook(book: Book, year: number): Book {
  return { ...book, year: year };
}

// useage

function demonstrateObjectoperations(state: AppState): void {
  const book = state.books[0];
  console.log("Book", book);
  console.log("Book properties:", getBookProperties(book));
  console.log("Bookvalues:", getBookValues(book));
  console.log("Book Entries:", getBookEntries(book));
  console.log("Cloned book:", cloneBook(book));
  const newBook = changeYearOfBook(book, 1984);
  console.log("Book with changed year:", newBook);
}

//Step 6: Destructuring

function logBookInfo(book: Book): void {
  const { title, author, year } = book;
  console.log(`${title} was written by ${author} in ${year}`);
}

function logBookInfoWithRest(book: Book): void {
  const { title, author, year, ...rest } = book;
  console.log(`${title} was written by ${author} in ${year}`);
  console.log("Other properties:", rest);
}
function getFirstTwoBooks(state: AppState): [Book, Book, Book[]] {
  const [firstBook, secondBook, ...restBooks] = state.books; // how this destructuring assignment works
  return [firstBook, secondBook, restBooks];
}

function getPrimaryGenre(book: Book): string | undefined {
  const [primaryGenre] = book.genres;
  return primaryGenre;
}

//useage
function demonstrateDestructuring(state: AppState): void {
  logBookInfo(state.books[0]);
  logBookInfoWithRest(state.books[0]);
  const [first, second, rest] = getFirstTwoBooks(state);
  console.log("First book:", first);
  console.log("Second book:", second);
  console.log("Rest of the books:", rest);
  console.log(
    "Primary genre of the first book:",
    getPrimaryGenre(state.books[0])
  );
}

// Putting it all together

function runDemo(initialState: AppState): void {
  console.log("---Basic Operations ---");
  demonstrateBasicOperations(initialState);

  console.log("\n--- Array Transformations ---");
  demonstrateArrayTransformation(initialState);

  console.log("\n---Advanced Operations ---");
  demonstrateObjectoperations(initialState);

  console.log("\n---- Destructuring ---");
  demonstrateDestructuring(initialState);
}

runDemo(initialState);
