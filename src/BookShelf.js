import React, {
    Component
} from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        handleChange: PropTypes.func.isRequired
    };

    render() {
        const books = this.props.books;
        const title = this.props.title;

        return (
            <div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">{title}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {books.map((book) => (
                                        <li key={book.id}>
                                            <Book book={book} handleChange={this.props.handleChange}/>
                                        </li> ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookShelf;