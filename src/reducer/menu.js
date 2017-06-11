import { handleActions } from 'redux-actions';

import { SET_OPEN } from '../action/menu';

export default handleActions({
  [SET_OPEN]: (state, action) => Object.assign({}, state, {
    open: action.payload,
  }),
}, { open: false });
