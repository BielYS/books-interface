import axios from 'axios';

const addBook = async (isbn13: string, author: string, isbn10: string, published: string, title: string) => {
    const url = 'https://4tqplmanybdulhmjq22ctlktum.appsync-api.us-east-2.amazonaws.com/graphql';
    const apiKey = 'da2-dw6f3eifjzd5rebhrup2ojukji';
    const mutation = {
        query: `
            mutation addBook($isbn13: String!, $author: String!, $isbn10: String!, $published: String!, $title: String!) {
                addBook(isbn13: $isbn13, author: $author, isbn10: $isbn10, published: $published, title: $title) {
                    isbn13
                    author
                    isbn10
                    published
                    title
                }
            }
        `,
        variables: {
            isbn13,
            author,
            isbn10,
            published,
            title,
        },
    };

    try {
        const response = await axios.post(url, mutation, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
        });

        return response.data.data.addBook;
    } catch (error) {
        console.error("Error adding book:", error);
        throw new Error("Failed to add book");
    }
};

export default addBook;
