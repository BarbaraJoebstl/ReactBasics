import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';
import * as BookAPI from './BooksAPI';

class SearchBook extends Component {
    state = {
        query: '',
        foundBooks: []
    };

    static propTypes = {
        foundBooks: PropTypes.array.isRequired
        /* handleChange: PropTypes.func.isRequired */
    };

    // TODO Compare with books in state of app to set the shelve
    updateQuery = (query) => {
        this.setState({query: query});
        this.searchBooks(query);
    };

    searchBooks = (value)  => {
        if (value !== '') {
            BookAPI.search(value, 20).then(apiFoundBooks => {
                console.log(apiFoundBooks);
                if(apiFoundBooks.length > 0) {
                    this.state.foundBooks = apiFoundBooks;
                    /* this.setState({foundBooks: apiFoundBooks}) */
                }
            })
        }
    }


    clearQuery = () => {
        this.updateQuery('')
    };


    shouldComponentUpdate(nextProps) {
        const newFoundBooks = this.props.foundBooks !== nextProps.foundBooks;
        return newFoundBooks;
    }


    render() {
        const { query } = this.state.query;
        const { foundBooks } = this.state.foundBooks;


        //this.searchBooks(query);

        return (
            <div>
                <Link to='/'>
                    Back to my bookshelves
                </Link>
                <div>
                    <input
                        type='text'
                        placeholder='Search books'
                        value={query}
                        onChange={(e) => this.updateQuery(e.target.value)}/>
                </div>
                {query !== '' && foundBooks.length > 0 && (
                    <BookShelf
                        key= "searchShelf"
                        className="list-books"
                        books = {foundBooks}
                        title = "Found Books"
                        handleChange={(id, shelf) => {this.props.handleChange(id, shelf)}}
                    />
                )}
            </div>
        )}
}

export default SearchBook