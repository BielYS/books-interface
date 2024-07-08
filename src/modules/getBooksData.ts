import axios from 'axios';

export const getBooksData = async () => {
    const url = 'https://4tqplmanybdulhmjq22ctlktum.appsync-api.us-east-2.amazonaws.com/graphql';
    const apiKey = 'da2-dw6f3eifjzd5rebhrup2ojukji';
    const query = {
        query: `
            query listBooks {
                listBooks {
                    items {
                        isbn13
                        author
                        isbn10
                        published
                        title
                    }
                }
            }
        `,
    };

    try {
        const response = await axios.post(url, query, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
        });

        return response.data.data.listBooks.items;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw new Error("Failed to fetch books data");
    }
};
