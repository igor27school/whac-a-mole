import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchSenatorsFromServer } from '../actions/ActionCreators'
import SenatorNickname from './SenatorNickname'

/**
* @description Displays senators as a list.
*/
export class ListSenators extends Component {
  static propTypes = {
    hasSenators: PropTypes.bool.isRequired,
    senators: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }
  componentDidMount() {
    const { hasSenators, fetchSenatorsFromServer } = this.props
    if (!hasSenators) {
      fetchSenatorsFromServer()
    }
  }
  render() {
    const { senators } = this.props
    return (
      <div>
        <h2>SENATORS</h2>
        <ul>
          {senators.map(senator => (
            <li key={senator.id}>
              <SenatorNickname senatorId={senator.id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ senators }) {
  return {
    senators: senators.allIds.map(senator => senators.byId[senator]),
    hasSenators: senators.allIds.length > 0,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchSenatorsFromServer: () => dispatch(fetchSenatorsFromServer()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSenators)
