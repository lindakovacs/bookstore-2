import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Media, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

const TYPES = ['Want to Read', 'Currently Reading', 'Read'];

class BookDetails extends Component {
    state = {
        bookId: "",
        book: {},
        bookshelfPick: 0,
        isError: false,
        bookshelfTypesIndex: 0
    };
    componentDidMount() {
        console.log("didmount: " , this.props.match.params.bookId);
        this.getBookDetails();
    }

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
    }

// const bookId = props.match.params.bookId;
    // const url = props.match.url;
    // function getBookDetails() {
    //     return axios
    //         .get(`http://localhost:7000/${url}`)
    //         .then(response => {
    //             return response.data;
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }
    // let details = getBookDetails();
    // console.log(details);
    // //const image = (details.imageLinks ? details.imageLinks.medium : details.imageLinks.thumbnail);
    // const authors = details.authors;
    // const title = details.title;
    // const subtitle = (details.subtitle ? details.subtitle : "");
    // const description = details.description
    render() {
        console.log('bookdetails: ', this.state);
        const { book } = this.state;
        const buttonsInstance = (
            <ButtonToolbar>
                <DropdownButton title="None" id="dropdown-size-medium">
                    <MenuItem eventKey="1">Want To Read</MenuItem>
                    <MenuItem eventKey="2">Currently Reading</MenuItem>
                    <MenuItem eventKey="3">Read</MenuItem>
                    {/* {TYPES.map((type, index) => {
                        return (
                            <MenuItem eventKey={index}>{type}</MenuItem>
                        )})
                    } */}
                </DropdownButton>
            </ButtonToolbar> 
        );
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
                    <h3>MyBookshelf Status</h3>
                    <ButtonToolbar>
                        <DropdownButton title="None" key={0} id="dropdown-basic" onChange={e => this.pickBookStatus(e.target.value)}>
                        {TYPES.map((type, index) => {
                            console.log(type, index);
                            return <MenuItem eventKey={index} onSelect={eventKey => "active"}>{type}</MenuItem>
                        })}
                        </DropdownButton>
                    </ButtonToolbar>
                </p>
            </div>;
    }
}

export default BookDetails;
