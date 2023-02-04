import { combineReducers } from "redux";
import authReducer from "./Authreducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";

export const reducers=combineReducers({authReducer,postReducer,userReducer})