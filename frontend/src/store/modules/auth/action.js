import { SET_TOKEN } from "./actionTypes";

export const setToken = (payload) => {
  return {
    type: SET_TOKEN,
    payload: payload,
  };
};



//sends the request to reducers