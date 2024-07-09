import { getBooksData } from './modules/getBooksData';
import axios from "axios";
import addBook from './modules/addBook';
import deleteBook from './modules/deleteBook';

const fetchBooks = async () => {
    try {
        const books = await getBooksData();
        console.log("Books data fetched successfully:", books);
    } catch (error) {
        console.error("Error fetching books:", error);
    }
};

fetchBooks();


const getBook = async (book: any) => {
    try {
      const response = await axios.post('https://4tqplmanybdulhmjq22ctlktum.appsync-api.us-east-2.amazonaws.com/graphql', {
        query: `
          mutation addBook($book: BookInput!) {
            addBook(book: $book) {
              isbn13
              author
              isbn10
              published
              title
            }
          }
        `,
        variables: {
          book: book
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'da2-dw6f3eifjzd5rebhrup2ojukji'
        }
      });
      
      console.log('Livro adicionado com sucesso:', response.data);
    } catch (error) {
      console.error('Ocorreu um erro ao adicionar o livro:', error);
    }
  };

const addNewBook = async () => {
  try {
      const newBook = await addBook("978-3-16-148410-0", "Author Name", "1234567890", "2024-01-01", "New Book Title");
      console.log("New book added successfully:", newBook);
  } catch (error) {
      console.error("Error adding new book:", error);
  }
};

addNewBook();

const removeBook = async (isbn13: string) => {
  try {
      const removedBook = await deleteBook(isbn13);
      console.log("Book deleted successfully:", removedBook);
  } catch (error) {
      console.error("Error deleting book:", error);
  }
};

removeBook("978-3-16-148410-0");