import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ListGroupItem, Media } from 'react-bootstrap'

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
  updateShelf = (e, bookid) => {
    e.preventDefault()
    this.setState(
      {
        bookId: bookid,
        selected: e.target.value
      },
            () => {
              axios
                    .get(`http://localhost:7000/bookshelf/update/${this.state.bookId}/${this.state.selected}`)
                    .then(response => {
                      this.setState({
                        bookOnShelf: this.state.selected ? this.state.selected : 'None'
                      })
                    }, this.getMyBookShelf())
                    .catch(error => {
                      this.setState({ isError: true })
                    })
            }
        )
  }
  componentDidMount () {
    this.getMyBookShelf()
  }
  getMyBookShelf = () => {
    if (this.props.match.url) {
      this.setState(() => {
        axios
                    .get(`http://localhost:7000/bookshelf`)
                    .then(response => {
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
    return (
      <div>
        {this.state.myBooks
                    ? Object.entries(this.state.myBooks).map((shelf, idx) => {
                      const key = 'shelf-index-' + idx
                      return (
                        <div key={key}>
                          <h2>{this.state.shelfData[shelf[0]]}</h2>
                          {Object.values(shelf[1]).map((book, index) => {
                            const link = '/book/' + book.id
                            const key = 'book-index-' + index
                            return (
                              <ListGroupItem key={key}>
                                <Media>
                                  <Media.Left align='top'>
                                    <Link to={link}>
                                      <img
                                        src={book.imageLinks ? book.imageLinks.thumbnail : ''}
                                        alt={book.title}
                                                          />
                                    </Link>
                                  </Media.Left>
                                  <Media.Body>
                                    <Media.Heading>
                                      <Link to={link}>
                                        {book.title}
                                                              :
                                                              {''}
                                        {book.subtitle ? <p>{book.subtitle}</p> : ''}
                                      </Link>
                                    </Media.Heading>
                                    <p>
                                                          Author(s):<br />
                                      {book.authors ? book.authors.join(', ') : book.authors}
                                    </p>
                                    <div>
                                      <h4>Change Shelf</h4>
                                      <div>
                                        <select
                                              name='select'
                                              class='form-control SelectShelf'
                                              defaultValue={book.shelf}
                                              onChange={e => this.updateShelf(e, book.id)}
                                                              >
                                              {Object.entries(
                                                                      this.state.shelfData
                                                                  ).map((shelf, idx) => {
                                                                    const key = 'shelf-index-' + idx
                                                                    if (this.state.bookOnShelf === shelf[0]) {
                                                                      return (
                                                                        <option key={key} value={shelf[0]}>
                                                                          {shelf[1]}
                                                                        </option>
                                                                      )
                                                                    } else {
                                                                      return (
                                                                        <option key={key} value={shelf[0]}>
                                                                          {shelf[1]}
                                                                        </option>
                                                                      )
                                                                    }
                                                                  })}
                                            </select>
                                      </div>
                                    </div>
                                  </Media.Body>
                                </Media>
                              </ListGroupItem>
                            )
                          })}
                        </div>
                      )
                    })
                    : 'No Books Available in your Bookshelf'}
      </div>
    )
  }
}

export default Bookshelf
