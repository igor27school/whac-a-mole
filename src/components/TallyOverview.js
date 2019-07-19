import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchTallyFromServer } from '../actions/ActionCreators'
import BillOverview from './BillOverview'

/**
* @description Displays details of a particular tally.
*/
export class TallyOverview extends Component {
  static propTypes = {
    hasTally: PropTypes.bool.isRequired,
    tallyId: PropTypes.string.isRequired,
    tally: PropTypes.shape({
      _id: PropTypes.string,
      bill: PropTypes.string,
      date: PropTypes.string,
      link: PropTypes.string,
      votes: PropTypes.arrayOf.string,
    }),
  }
  componentDidMount() {
    const {
      hasTally,
      tallyId,
      fetchTallyFromServer,
    } = this.props
    if (!hasTally) {
      fetchTallyFromServer(tallyId)
    }
  }
  render() {
    const { tally, tallyId, hasTally } = this.props
    if (!hasTally) {
      return (
        <h4>The tally {tallyId} does not exist</h4>
      )
    }
    return (
      <div>
        <BillOverview billId={tally.bill}/>
        <h3>Date: {tally.formattedDate}</h3>
        <h3>Tally link: <Link to={`${tally.link}`} target="_blank">{tally.link}</Link></h3>
      </div>
    )
  }
}

function mapStateToProps ({ tallies }, { tallyId }) {
  const tally = tallies.byId[tallyId]
  return {
    tally,
    tallyId,
    hasTally: '_id' in tally ? true : false
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchTallyFromServer: tallyId => dispatch(fetchTallyFromServer(tallyId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TallyOverview)
