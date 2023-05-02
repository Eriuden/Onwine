import { GET_USER, UPLOAD_PICTURE, UPDATE_USER, DELETE_USER } from "../actions/users.actions";

const initialState = {}

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                name: action.payload,
                address: action.payload,
            }
        case DELETE_USER:
            return state.filter((user) => user._id !== action.payload.id)

        default:
            return state
    }
    
}