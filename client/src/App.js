import React from 'react'
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/products/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
        </main>
      </Container>
      <Footer />
    </Router>
  )
}

export default App
