import { getTokenFromLocalStorage } from "../../../utils/localstorage.helper";
import { SET_TOKEN } from "./actionTypes";

const initialState = {
  token: getTokenFromLocalStorage(),
};

// action = { payload:'', type:''}
export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
};


//reducers instructions on how to handle each task