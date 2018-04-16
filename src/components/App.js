import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ListBillsAndSenators from './ListBillsAndSenators'
import BillDetails from './BillDetails'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ListBillsAndSenators}/>
        <Route path="/bill/:bill_id" component={BillDetails}/>
      </Switch>
    )
  }
}

export default App;
