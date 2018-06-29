import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
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

    updateQuery = (query) => {
        this.setState({isErrorShown: false});
        if (query.length === 0) {
            this.setState({query: ""});
            this.setState({foundBooks: []});
        } else {
            this.setState({query: query});
            this.searchBooks(query);
        }
    };

    resetSearch() {
        this.setState(() => ({query: ""}));
        this.setState(() => ({foundBooks: []}));
        this.setState(() => ({isErrorShown: false}));
    }

    /**
     * @description
     * fetches matching books from the BookAPI and
     * changes the shelf property according to the existing books in the shelves
     *
     * @param {string} value - The search string
     */
    searchBooks = (value)  => {
        BookAPI.search(value)
            .then(apiFoundBooks => {
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
        })
            .catch(e => {
                this.setState(() => ({foundBooks: []}));
                this.setState(() => ({isErrorShown: true}));
            });
    };

    render() {
        const { query, foundBooks, isErrorShown } = this.state;
        const { handleChange } = this.props.handleChange;

        return (
            <div>
                <div class="search-books-bar">
                    <Link class="close-search" to="/">
                        Back to my bookshelves
                    </Link>
                    <div class="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search books"
                            value={query}
                            onChange={(e) => this.updateQuery(e.target.value)}/>
                    </div>
                </div>
                <div class="search-books-results">
                {foundBooks && (
                    <BookShelf
                        key= "searchShelf"
                        className="list-books"
                        books = {foundBooks}
                        title = "Found Books"
                        handleChange={handleChange}
                    />
                )}


                {!foundBooks && (
                    <div>nothing found</div>
                )}
                {isErrorShown&& (
                    <div>...something went wrong :/

                <button onClick={this.resetSearch}>reset this search</button>
                    </div>
                    )}
</div>
            </div>
        )
    }
}

export default SearchBook