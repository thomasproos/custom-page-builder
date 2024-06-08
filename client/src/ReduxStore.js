import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 'home'
};

const actionTypes = {
  SET_PAGE: 'SET_PAGE',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer
});

export { store, actionTypes };