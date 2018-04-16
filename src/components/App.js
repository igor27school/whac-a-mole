import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ListBills from './ListBills'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ListBills}/>
      </Switch>
    )
  }
}

export default App;
