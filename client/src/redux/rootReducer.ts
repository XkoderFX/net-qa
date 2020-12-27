import { combineReducers } from "redux";
import postReducer from "./posts/postReducer";

const rootReducer = combineReducers({
    postsReducer: postReducer
})

export default rootReducer