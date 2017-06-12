import { createAction } from 'redux-actions';

export const SET_OPEN = 'menu/setOpen';

export const setOpen = createAction(SET_OPEN);

export function toggleOpen() {
  return (dispatch, getState) => {
    const { open } = getState().menu;
    return dispatch(setOpen(!open));
  };
}
