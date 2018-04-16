import * as ServerAPI from '../utils/ServerAPI'
import * as Actions from './Actions'

export function fetchBillsFromServer() {
  return dispatch => ServerAPI.getBills().then(bills => {
      dispatch(Actions.receiveBills(bills))
      return bills
  }).catch(err => console.error(err))
}
