import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 'home',
  hoveredComponent: null,
  draggedComponent: null
};

const actionTypes = {
  SET_PAGE: 'SET_PAGE',
  SET_HOVERED_COMPONENT: 'SET_HOVERED_COMPONENT',
  SET_DRAGGED_COMPONENT: 'SET_DRAGGED_COMPONENT'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };
    case actionTypes.SET_HOVERED_COMPONENT:
      return { ...state, hoveredComponent: action.payload };  
    case actionTypes.SET_DRAGGED_COMPONENT:
      return { ...state, draggedComponent: action.payload };  
    default:
      return state;
  }
};

const store = configureStore({
  reducer
});

export { store, actionTypes };