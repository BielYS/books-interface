import axios from 'axios';

const deleteBook = async (isbn13: string) => {
    const url = 'https://4tqplmanybdulhmjq22ctlktum.appsync-api.us-east-2.amazonaws.com/graphql';
    const apiKey = 'da2-dw6f3eifjzd5rebhrup2ojukji';
    const mutation = {
        query: `
            mutation deleteBook($isbn13: String!) {
                deleteBook(isbn13: $isbn13) {
                    isbn13
                    title
                }
            }
        `,
        variables: {
            isbn13,
        },
    };

    try {
        const response = await axios.post(url, mutation, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
        });

        console.log("API Response:", response.data);

        if (response.data && response.data.data && response.data.data.deleteBook) {
            return response.data.data.deleteBook;
        } else {
            console.error("deleteBook property is missing in the API response");
            throw new Error("deleteBook property is missing in the API response");
        }
    } catch (error) {
        console.error("Error deleting book:", error);
        throw new Error("Failed to delete book");
    }
};

export default deleteBook;
