import { SET_TOKEN } from "./actionTypes";

const initialState = {
  token: "",
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