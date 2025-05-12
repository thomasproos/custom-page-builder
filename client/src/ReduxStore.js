import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 'home',
  hoveredComponent: null,
  draggedComponent: null,
  activeComponent: null,
  pageSettings: null,
  userSettings: null,
  marginIndex: 22
};

const actionTypes = {
  SET_PAGE: 'SET_PAGE',
  SET_HOVERED_COMPONENT: 'SET_HOVERED_COMPONENT',
  SET_DRAGGED_COMPONENT: 'SET_DRAGGED_COMPONENT',
  SET_ACTIVE_COMPONENT: 'SET_ACTIVE_COMPONENT',
  SET_PAGE_SETTINGS: 'SET_PAGE_SETTINGS',
  SET_USER_SETTINGS: 'SET_USER_SETTINGS'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };
    case actionTypes.SET_HOVERED_COMPONENT:
      return { ...state, hoveredComponent: action.payload };  
    case actionTypes.SET_DRAGGED_COMPONENT:
      return { ...state, draggedComponent: action.payload };  
    case actionTypes.SET_ACTIVE_COMPONENT:
      return { ...state, activeComponent: action.payload };  
    case actionTypes.SET_PAGE_SETTINGS:
      return { ...state, pageSettings: action.payload };  
    case actionTypes.SET_USER_SETTINGS:
      return { ...state, userSettings: action.payload };  
    default:
      return state;
  }
};

const store = configureStore({
  reducer
});

export { store, actionTypes };