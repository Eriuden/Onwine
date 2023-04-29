import { combineReducers} from "redux"
import userReducer from "./user.reducer"
import errorReducer from "./error.reducer"
import wineReducer from "./wine.reducer"

const reducers = combineReducers({
    userReducer,
    errorReducer,
    wineReducer
})

export default reducers