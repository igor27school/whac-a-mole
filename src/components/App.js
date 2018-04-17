import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ListBillsAndSenators from './ListBillsAndSenators'
import BillDetails from './BillDetails'
import SenatorDetails from './SenatorDetails'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ListBillsAndSenators}/>
        <Route path="/bill/:bill_id" component={BillDetails}/>
        <Route path="/senator/:senator_id" component={SenatorDetails}/>
      </Switch>
    )
  }
}

export default App;
