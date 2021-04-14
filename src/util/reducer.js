import {ADD_CARD, DELETE_CARD, PUT_CARD, MOVE_CARD } from './actions/card';

const reducer = (state, action) => {
  switch(action.type) {
    case ADD_CARD:
      return {
        ...state,
        [action.payload]: [action.payload]
      }
      // return newState;
    case DELETE_CARD:
      return state.filter((each) => { 
        return each === action.payload;
      });
      // return newState;
    case PUT_CARD:
      return state.map((each) => { 
        if (each === action.payload.title) {
          return action.payload;
        }
      });
      // return newState;
    case MOVE_CARD:
      break;
  }
}

export default reducer;