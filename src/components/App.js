import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ListBillsAndSenators from './ListBillsAndSenators'
import BillDetails from './BillDetails'
import SenatorDetails from './SenatorDetails'
import VoteDetails from './VoteDetails'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ListBillsAndSenators}/>
        <Route path="/bill/:bill_id" component={BillDetails}/>
        <Route path="/senator/:senator_id" component={SenatorDetails}/>
        <Route path="/vote/:vote_id" component={VoteDetails}/>
      </Switch>
    )
  }
}

export default App;
