/**
 *  a simple state store to be shared between JobSearchResult and ChatForm
 *  Currently, the state contains only one member which is foundJob
 */

import { createStore } from 'redux';

function jobs(state = null, action) {
  switch (action.type) {
  case 'FOUNDJOB':
    console.log('FOUNDJOB action');
    return action.foundJob
  default:
    return state
  }
}

let store = createStore(jobs);

export default store;