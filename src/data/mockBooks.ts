function generateMockBooks() {
    const tags = ["fiction", "non-fiction", "science", "essay"];
    const books = [];

    for (let i = 0; i < tags.length; i++) {
        for (let j = 0; j < 3; j++) {
            const book = {
                "title": `Book Title ${i * 3 + j + 1}`,
                "writer": `Book Writer ${i * 3 + j + 1}`,
                "coverImage": "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg",
                "price": 19.99,
                "tags": [tags[i]]
            };
            books.push(book);
        }
    }

    return books;
}

const mockBooks = generateMockBooks();
console.log(mockBooks);