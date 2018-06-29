import React, { Component } from "react";
import "./App.css";
import * as BookAPI from "./BooksAPI";
import AllBooks from "./AllBooks";
import {Route} from "react-router-dom";
import SearchBook from "./SearchBook";

class App extends Component {
    state = {
        books: []
    };

    handleChange = (selectedShelf, book) => {
        BookAPI.update(book, selectedShelf);
        this.getAllBooks();
    };

    getAllBooks() {
        BookAPI.getAll()
            .then((books) => {
                this.setState(() => ({books}));
            })
    }

    componentDidMount() {
        this.getAllBooks();
    }

    render() {
        return (
            <div className="App">
                <Route path="/search" render={() => (
                    <SearchBook books={this.state.books} handleChange={this.handleChange}/>
                )}/>
                <Route exact path="/" render={() =>(
                    <AllBooks books={this.state.books} handleChange={this.handleChange}/>
                )} />
            </div>
        );
    }
}

export default App;
