import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import BookShelf from "./BookShelf";
import * as BookAPI from "./BooksAPI";

class SearchBook extends Component {
    state = {
        query: "",
        foundBooks: []
    };

    static propTypes = {
        books: PropTypes.array.isRequired,
        handleChange: PropTypes.func.isRequired
    };

    updateQuery = (query) => {
        this.setState({query: query});
        this.searchBooks(query);
    };

    /**
     * @description
     * fetches matching books from the BookAPI and
     * changes the shelf property according to the existing books in the shelves
     *
     * @param {string} value - The search string
     */
    searchBooks = (value)  => {
        BookAPI.search(value).then(apiFoundBooks => {
            if(apiFoundBooks) {
                apiFoundBooks = apiFoundBooks.map(apiFoundBook => {
                    apiFoundBook.shelf = 'none';
                    const match = this.props.books.find(
                        book => book.id === apiFoundBook.id);
                    if (match) {
                        apiFoundBook.shelf = match.shelf;
                    }
                    this.setState(() => ({foundBooks: apiFoundBooks}));
                });
            }
        });
    };

    render() {
        const { query, foundBooks } = this.state;
        const { handleChange } = this.props.handleChange;

        return (
            <div>
                <Link to="/">
                    Back to my bookshelves
                </Link>
                <div>
                    <input
                        type="text"
                        placeholder="Search books"
                        value={query}
                        onChange={(e) => this.updateQuery(e.target.value)}/>
                </div>

                {foundBooks && (
                    <BookShelf
                        key= "searchShelf"
                        className="list-books"
                        books = {foundBooks}
                        title = "Found Books"
                        handleChange={handleChange}
                    />
                )}
            </div>
        )
    }
}

export default SearchBook