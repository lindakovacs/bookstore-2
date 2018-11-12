import React, { Component } from "react";
import axios from "axios";

class Search extends Component {
    state = {
        queryInput: null,
        results: [],
        isError: false,
        loading: false
    };

    search = (searchInput) => {
        //e.preventDefault();
        this.setState({ 
            queryInput: searchInput,
            loading: true
        });
        console.log(this.state.queryInput);
        axios
			.get(`http://localhost:7000/books/search/${this.state.queryInput}`)
			.then(response => {
				console.log("axios: ", Array.isArray(response.data.books));
				this.setState({ 
                    results: response.data.books,
                    loading: false 
                });
			})
			.catch(error => {
				this.setState({ isError: true });
			});
    };

    componentDidMount() {
        console.log('componentDidMount');
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
                        onChange={e => this.search(e.target.value)}
                    />
                </div>
                <div className="books-results">
                    {results && results.map((book, index) => {
                        console.log(book);
                        const key = 'book-' + index;
                        return (
                            <div className="book" key={key}>
                                {book.title}: {book.subtitle}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Search;
