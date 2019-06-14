import React, { Component } from 'react'
import ListTallies from './ListTallies'
import ListSenators from './ListSenators'

export default class ListTalliesAndSenators extends Component {
  render() {
    return (
      <div>
        <ListTallies/>
        <ListSenators/>
      </div>
    )
  }
}
