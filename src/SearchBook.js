import React, {
    Component
} from "react";
import PropTypes from "prop-types";
import {
    Link
} from "react-router-dom";
import BookShelf from "./BookShelf";
import * as BookAPI from "./BooksAPI";

class SearchBook extends Component {
    state = {
        query: "",
        foundBooks: [],
        isErrorShown: false
    };

    static propTypes = {
        books: PropTypes.array.isRequired,
        handleChange: PropTypes.func.isRequired
    };


    resetSearch = () => {
        this.setState(() => ({
            query: "",
            foundBooks: [],
            isErrorShown: false
        }))
    };

    updateQuery = (query) => {
        this.setState({
            isErrorShown: false
        });
        if (query.length === 0) {
            this.resetSearch();
        } else {
            this.setState({
                query: query
            });
            this.searchBooks(query);
        }
    };

    findBook = (list, value) => {
        var index = list.indexOf(value);
        return index == -1 ? undefined : list[index];
    }

    /**
     * @description
     * fetches matching books from the BookAPI and
     * changes the shelf property according to the existing books in the shelves
     *
     * @param {string} value - The search string
     */
    searchBooks = (value) => {
        BookAPI.search(value)
            .then(apiFoundBooks => {
                if (!apiFoundBooks.error) {
                    this.setState({
                        foundBooks: apiFoundBooks.map(apiFoundBook => {
                            const bookAlreadyInLib = this.props.books.find(book => book.id === apiFoundBook.id);

                            if (bookAlreadyInLib) {
                                apiFoundBook.shelf = bookAlreadyInLib.shelf;
                            }
                            return apiFoundBook;
                        })
                    });
                };
            })
            .catch(e => {
                this.setState(() => ({
                    foundBooks: []
                }));
                this.setState(() => ({
                    isErrorShown: true
                }));
            });
    };


    addBook(selectedShelf, selectedBook) {
        BookAPI.update(selectedBook, selectedShelf);
        this.props.handleChange();
    }

    render() {
        const {
            query,
            foundBooks,
            isErrorShown
        } = this.state;

        return ( 
            <div>
            <div className = "search-books-bar" >
            <Link className = "close-search"
            to = "/" >
            Back to my bookshelves <
            /Link> <
            div className = "search-books-input-wrapper" >
            <
            input type = "text"
            placeholder = "Search books"
            value = {
                query
            }
            onChange = {
                (e) => this.updateQuery(e.target.value)
            }
            /> < /
            div > <
            /div>

            <
            div className = "search-books-results" >

            {
                foundBooks && ( <
                    BookShelf key = "searchShelf"
                    className = "list-books"
                    books = {
                        foundBooks
                    }
                    title = "Found Books"
                    handleChange = {
                        this.props.handleChange
                    }
                    />
                )
            }

            {
                isErrorShown && ( <
                    div > ...something went wrong: / <
                    button onClick = {
                        this.resetSearch
                    } > reset this search < /button> < /
                    div >
                )
            }

            <
            /div> < /
            div >
        )
    }
}

export default SearchBook