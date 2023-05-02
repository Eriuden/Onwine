import { GET_ALL_WINES } from "../actions/wine.actions";
const initialState = {}

export default function allWinesReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_WINES:
            return action.payload
        default:
            return state
    }
}