import React, { Component } from 'react'
import ListBills from './ListBills'
import ListSenators from './ListSenators'

export default class ListBillsAndSenators extends Component {
  render() {
    return (
      <div>
        <ListBills/>
        <ListSenators/>
      </div>
    )
  }
}
