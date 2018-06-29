import React, {Component} from "react"
import PropTypes from "prop-types"

class Book extends Component {
    static propTypes =  {
        book: PropTypes.object.isRequired,
        handleChange: PropTypes.func.isRequired
    };

    render() {
        const book = this.props.book;
        const handleChange = this.props.handleChange;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(e) => handleChange(e.target.value, book)}
                            defaultValue={book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }
}

export default Book