import React, { Component } from "react";
import axios from "axios";

class Search extends Component {
    state = {
        queryInput: null,
        results: [],
        isError: false,
        loading: false
    };

    search = (e) => {
        e.preventDefault();
        this.setState({ 
            queryInput: e.target.value
        });
    };

    getBooks = () => {
        console.log("getBooks: ", this.state);
        this.setState({
            loading: true
        });
        axios
			.get(`http://localhost:7000/books/search/apple${this.state.queryInput}`)
			.then(response => {
				console.log("axios: ", response.data);
				this.setState({ 
                    results: response.data,
                    loading: false 
                });
			})
			.catch(error => {
				this.setState({ isError: true });
			});
    };

    componentDidMount() {
        console.log('componentDidMount');
        this.getBooks();
    };

    render() {
        if (this.state.results) {
            console.log('I HAVE DATA!!!: ', this.state.results);
        }
        const { results } = this.state;
        return (
            <div className="BooksSearch">
                <div className="Search">
                    <input
                        type="search"
                        placeholder="Search..."
                        aria-label="Search"
                        className="search"
                        onChange={e => this.search(e)}
                    />
                    <button type="submit" onClick={this.getBooks}>Search...</button>
                </div>
                <div className="books-results">
                    {results.books}
                    {/* {results && results.map((book, index) => {
                        console.log(book);
                        const key = 'book-' + index;
                        const title = book.title;
                        return (
                            <div className="book" key={key}>
                                {title}: {book}
                            </div>
                        );
                    })} */}
                </div>
            </div>
        );
    }
}

export default Search;
