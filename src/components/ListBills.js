import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchBillsFromServer } from '../actions/ActionCreators'
import BillSummary from './BillSummary'

/**
* @description Displays bills as a list.
*/
export class ListBills extends Component {
  static propTypes = {
    hasBills: PropTypes.bool.isRequired,
    bills: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
  }
  componentDidMount() {
    const { hasBills, fetchBillsFromServer } = this.props
    if (!hasBills) {
      fetchBillsFromServer()
    }
  }
  render() {
    const { bills } = this.props
    return (
      <div>
        <h2>BILLS</h2>
        <ul>
          {bills.sort(function(b1, b2) {
            if (b1.title < b2.title){
              return 1
            }
            return -1
          }).map(bill => (
            <li key={bill._id}>
              <BillSummary billId={bill._id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ bills }) {
  return {
    bills: bills.allIds.map(bill => bills.byId[bill]),
    hasBills: bills.allIds.length > 0,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchBillsFromServer: () => dispatch(fetchBillsFromServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListBills)
