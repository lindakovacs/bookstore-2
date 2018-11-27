import React, { Component } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
// import { FormGroup, FormControl, ControlLabel, ListGroup, ListGroupItem, Media } from 'react-bootstrap'

class Bookshelf extends Component {
  state = {
    bookId: '',
    bookOnShelf: 'none',
    book: {},
    myBooks: null,
    displayValue: 'None',
    isError: false,
    selected: 'None',
    shelfData: {
      none: 'None',
      wantToRead: 'Want To Read',
      currentlyReading: 'Currently Reading',
      read: 'Read'
    }
  }
  componentDidMount () {
    console.log('didmount: ', this.props.match.params.bookId)
    this.getMyBookShelf()
  }
  getMyBookShelf = () => {
    if (this.props.match.url) {
      this.setState(() => {
        axios
                    .get(`http://localhost:7000/bookshelf`)
                    .then(response => {
                      console.log('axios: ', response.data.book)
                      this.setState({
                        myBooks: response.data.books
                      })
                    })
                    .catch(error => {
                      this.setState({ isError: true })
                    })
      })
    }
  }
  render () {
    console.log('bookshelf: ', this.state.myBooks)
    return (
      <div>
        {this.state.myBooks
                    ? Object.entries(this.state.myBooks).map((shelf, idx) => {
                      return (
                        <div>
                          <h2>{this.state.shelfData[shelf[0]]}</h2>
                          <p>
                            {Object.values(shelf[1]).map((book, index) => {
                              return (
                                <p>
                                  {book.id}, {book.title}, {book.authors}, {book.imageLinks.thumbnail}
                                </p>
                              )
                            })}
                          </p>
                        </div>
                      )
                    })
                    : 'No Books Available in your Bookshelf'}
      </div>
    )
  }
}

export default Bookshelf
