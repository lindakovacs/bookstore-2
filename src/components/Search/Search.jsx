import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FormGroup, FormControl, ControlLabel, ListGroup, ListGroupItem, Media } from 'react-bootstrap'

class Search extends Component {
  state = {
    queryInput: '',
    results: [],
    isError: false,
    displayValue: 'None',
    selected: 'None',
    shelfData: {
      none: 'None',
      wantToRead: 'Want To Read',
      currentlyReading: 'Currently Reading',
      read: 'Read'
    }
  }

  search = (e, searchInput) => {
    e.preventDefault()
    if (searchInput) {
      this.setState(
        {
          queryInput: searchInput
        },
                () => {
                  axios
                        .get(`http://localhost:7000/books/search/${this.state.queryInput}`)
                        .then(response => {
                          this.setState({
                            results: response.data.books
                          })
                        })
                        .catch(error => {
                          this.setState({ isError: true })
                        })
                }
            )
    } else {
      this.setState({
        queryInput: '',
        results: [],
        isError: false
      })
    }
  }

  componentDidMount () {
    this.setState({
      queryInput: this.state.queryInput
    })
  }

  render () {
    const { results } = this.state
    return (
      <div>
        <form>
          <FormGroup>
            <ControlLabel>Search Bookstore</ControlLabel>
            <FormControl
              type='text'
              value={this.state.queryInput}
              placeholder='Search text'
              onChange={e => this.search(e, e.target.value)}
                        />
            <FormControl.Feedback />
          </FormGroup>
        </form>
        <ListGroup>
          {this.state.queryInput ? <h3>Searching for: {this.state.queryInput}</h3> : ''}
          {this.state.isError ? <p>No Search Results Found</p> : ''}
          {results &&
                        results.map((book, index) => {
                          const link = '/book/' + book.id
                          return (
                            <ListGroupItem>
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
                                      {book.title}: {book.subtitle ? <p>{book.subtitle}</p> : ''}
                                    </Link>
                                  </Media.Heading>
                                  <p>
                                                Author(s):<br />
                                    {book.authors ? book.authors.join(', ') : book.authors}
                                  </p>
                                  <p>Publisher: {book.publisher ? book.publisher : ''}</p>
                                  <p>Published Date: {book.publishedDate ? book.publishedDate : ''}</p>
                                  <p>Categories: {book.categories ? book.categories.join(', ') : 'None'}</p>
                                </Media.Body>
                              </Media>
                            </ListGroupItem>
                          )
                        })}
        </ListGroup>
      </div>
    )
  }
}

export default Search
