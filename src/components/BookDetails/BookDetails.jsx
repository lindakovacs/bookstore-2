import React, { Component } from 'react'
import axios from "axios";
import { Media } from 'react-bootstrap';
import DisplayContainer from './DisplayContainer';

class BookDetails extends Component {
    state = {
        bookId: "",
        book: {},
        displayValue: ('None'),
        isError: false,
        myBooks: {'Want To Read': [], 'Currently Reading': [], 'Read': []}
    };
    componentDidMount() {
        console.log("didmount: " , this.props.match.params.bookId);
        this.getBookDetails();
    };
    getBookDetails = () => {
    if (this.props.match.url) {
        this.setState(
            { 
                bookId: this.props.match.params.bookId 
            }, () => {
                axios
                    .get(`http://localhost:7000/book/${this.state.bookId}`)
                        .then(response => {
                            console.log(response.data.book);
                            this.setState({
                                book: response.data.book
                            });
                        })
                        .catch(error => {
                            this.setState({ isError: true })
                        })
                    }
                )
        }
    };
    render() {
        console.log('bookdetails: ', this.state);
        const { book } = this.state;
        return <div>
                <Media>
                    <Media.Left align="top">
                        <img src={book.imageLinks ? book.imageLinks.thumbnail : ''} alt={book.title} />
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>
                            <strong>{book.title}</strong>
                            {book.subtitle ? <p>{book.subtitle}</p> : ''}
                        </Media.Heading>
                        <p>
                            <strong>Author(s):</strong><br />
                            {book.authors ? book.authors.join(', ') : book.authors}
                        </p>
                        <p>{book.description}</p>
                        <p>Publisher: {book.publisher ? book.publisher : ''}</p>
                        <p>Published Date: {book.publishedDate ? book.publishedDate : ''}</p>
                        <p>Categories: {book.categories ? book.categories.join(', ') : 'None'}</p>
                    </Media.Body>
                </Media>
                <p>
                    <h3>Shelf</h3>
                    <div>
                        <DisplayContainer/>
                    </div>
                </p>
            </div>;
    }
}

export default BookDetails;
