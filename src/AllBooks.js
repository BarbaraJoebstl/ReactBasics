import React, {
    Component
} from "react";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";
import {Link} from "react-router-dom";

class AllBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        handleChange: PropTypes.func.isRequired
    };

    filterByRead(books, title) {
        return books.filter((book) => (book.shelf === title))
    };

    render() {
        const books = this.props.books;
        const handleChange = this.props.handleChange;

        return ( <div>
                <Link className="open-search" to="/search">
                    add a new book
                </Link>
                <BookShelf
                    key= "currentlyReading"
                    className="list-books"
                    books = {this.filterByRead(books, 'currentlyReading')}
                    title = "Currently Reading"
                    handleChange={handleChange}/>
                <BookShelf
                    key= "wantToRead"
                    className="list-books"
                    books={this.filterByRead(books, 'wantToRead')}
                    title = "Want to read"
                    handleChange={handleChange}/>
                <BookShelf
                    key= "Read"
                    className="list-books"
                    books={this.filterByRead(books, 'read')}
                    title = "Read"
                    handleChange={handleChange}/>
            </div>
        )
    }
}
export default AllBooks;