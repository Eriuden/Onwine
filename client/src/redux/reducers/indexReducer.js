import { combineReducers} from "redux"
import userReducer from "./user.reducer"
import errorReducer from "./error.reducer"
import wineReducer from "./wine.reducer"
import allWinesReducer from "./wines.reducer"
import allUsersReducer from "./users.reducer"

const reducers = combineReducers({
    userReducer,
    errorReducer,
    wineReducer,
    allWinesReducer,
    allUsersReducer,
})

export default reducers