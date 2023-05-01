import { GET_WINE, UPDATE_WINE, DELETE_WINE, LIKE_WINE, UNLIKE_WINE, EDIT_COMMENT, DELETE_COMMENT } from "../actions/wine.actions";
const initialState = {}

export default function wineReducer(state = initialState, action){
    switch(action.type){
        case GET_WINE:
            return action.payload

        case LIKE_WINE:
            return state.map((wine)=> {
                if (wine._id === action.payload.wineId)
                    return {
                        ...wine,
                        likedBy: [ action.payload.userId, ...wine.likedBy]
                    }
            })
        case UNLIKE_WINE:
            return state.map((wine)=> {
                if (wine._id === action.payload.wineId)
                return {
                    ...wine,
                    likedBy: wine.likedBy.filter((id) => id != action.payload.userId)
                }
                return wine
            })
        case UPDATE_WINE:
            return state.map((wine)=>{
                if (wine._id === action.payload.wineId) {
                    return {
                        ...wine,
                        wineName: action.payload.wineName,
                        year: action.payload.year,
                        cépage: action.payload.cépage
                    }
                } else return wine 
            })

        case DELETE_WINE:
            return state.filter((wine)=> wine._id !== wine.action.wineId)

        case EDIT_COMMENT:
            return state.map((wine)=> {
                if (wine._id === action.payload.wineId){
                    return {
                        ...wine,
                        comments: wine.comments.map((comment)=> {
                            if (comment._id === action.payload.commentId) {
                                return {
                                    ...comment,
                                    text: action.payload.text 
                                }
                            } else {
                                return comment
                            }
                        })
                    }
                } else return comment
            })
        case DELETE_COMMENT:
            return state.map((comment)=> {
                if (wine._id === action.payload.wineId){
                    return {
                        ...comment,
                        comments: wine.comments.filter((comment)=> comment._id !== action.payload.commentId)
                    }
                } else return wine 
            })
            
        default: 
            return state 
    }
}