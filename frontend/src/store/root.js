import { combineReducers } from "redux";
import { countReducer } from "./modules/count/reducer";
import { tokenReducer } from "./modules/auth/reducer";

export default combineReducers({
  countReducer,
  tokenReducer,
});
