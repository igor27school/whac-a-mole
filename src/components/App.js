import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import ListBillsAndSenators from './ListBillsAndSenators'
import BillDetails from './BillDetails'
import SenatorDetails from './SenatorDetails'
import VoteDetails from './VoteDetails'
import CompareVotes from './CompareVotes'
import Facebook from './Facebook'
import ListUsers from './ListUsers'

class App extends Component {
  render() {
    return (
      <div>
        <Facebook />
        <Switch>
          <Route exact path="/" component={ListBillsAndSenators}/>
          <Route path="/bill/:bill_id" component={BillDetails}/>
          <Route path="/senator/:senator_id" component={SenatorDetails}/>
          <Route path="/vote/:vote_id" component={VoteDetails}/>
          <Route path="/compare/:first_senator_id/:second_senator_id" component={CompareVotes}/>
          <Route path="/users" component={ListUsers}/>
        </Switch>
      </div>
    )
  }
}

export default App;
