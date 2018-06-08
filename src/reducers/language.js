import { handleAction } from 'redux-actions';

const defaultState = navigator.language.substr(0, 2);

export const language = handleAction(
  'SET_LANGUAGE',
  (state, action) => action.payload,
  defaultState
);
