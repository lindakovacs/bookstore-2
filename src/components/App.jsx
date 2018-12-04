import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NavBar from './NavBar/NavBar'
import Search from './Search/Search'
import Bookshelf from './Bookshelf/Bookshelf'
import BookDetails from './BookDetails/BookDetails'

function App () {
  return (
    <div>
      <NavBar />
      <main className='container'>
        <Switch>
          <Route exact path='/' component={Search} />
          <Route exact path='/search' component={Search} />
          <Route exact path='/bookshelf' component={Bookshelf} />
          <Route path='/book/:bookId' component={BookDetails} />
        </Switch>
      </main>
    </div>
  )
}

export default App
