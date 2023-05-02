import { GET_ALL_USERS } from "../actions/users.actions"
const initialState = {}

export default function allUsersReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_USERS:
            return action.payload
        default:
            return state
    }
}