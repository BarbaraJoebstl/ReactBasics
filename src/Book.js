import React, {Component} from "react"
import PropTypes from "prop-types"

class Book extends Component {
    static propTypes =  {
        book: PropTypes.object.isRequired,
        handleChange: PropTypes.func.isRequired
    };

    checkImage() {
        if (typeof this.props.book.imageLinks != "undefined") {
            return this.props.book.imageLinks.smallThumbnail;
        }
        return "none";
    }

    checkShelf() {
        if (typeof this.props.book.shelf != "undefined") {
            return this.props.book.shelf;
        }
        return "none";
    }

    render() {
        const book = this.props.book;
        const handleChange = this.props.handleChange;
        const backgroundImage = this.checkImage();
        const currentShelf = this.checkShelf();

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${backgroundImage})` }}></div>

                    <div className="book-shelf-changer">
                        <select onChange={(e) => handleChange(e.target.value, book)}
                            defaultValue={currentShelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="none">None</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors &&
                    <div className="book-authors">{book.authors}</div>
                }
            </div>
        )
    }
}

export default Book