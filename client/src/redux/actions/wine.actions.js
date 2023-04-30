import axios from "axios"

export const GET_ALL_WINES = "GET_ALL_WINES"
export const GET_WINE = "GET_WINE"
export const UPDATE_WINE = "UPDATE_WINE"
export const DELETE_WINE = "DELETE_WINE"

export const GET_WINE_ERRORS = "GET_WINE_ERRORS"

export const LIKE_WINE = "LIKE_WINE"
export const UNLIKE_WINE = "UNLIKE_WINE"

export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"

export const getWine = () => {
    return (dispatch) => {
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/wine/`)
            .then((res)=> {
                const array = res.data.slice (0,num)
                dispatch({type: GET_WINE, payload: array})
                dispatch({type: GET_ALL_WINES, payload: res.data})
            })
            .catch((err)=> {window.alert(err)})
    }
}

export const addWine = (data) => {
    return (dispatch) => {
        return axios 
            .post(`${process.env.REACT_APP_API_URL}api/wine/`, data)
            .then((res)=> {
                if (res.data.errors) {
                    dispatch( { type:GET_WINE_ERRORS, payload: res.data.errors})
                } else {
                    dispatch( { type: GET_WINE_ERRORS, payload:""})
                }
            })
    }
}

export const updateWine = (wineId, wineName, year, cépage ) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url:`${process.env.REACT_APP_API_URL}api/wine/${wineId}`,
            data: {wineName, year, cépage}
        })
            .then((res)=> {
                dispatch({type: UPDATE_WINE, payload: wineName, year, cépage})
            })
            .catch((err)=> { window.alert(err)})
             
    }
}

export const deleteWine = (wineId, wineName, year, cépage) => {
    return (dispatch) => {
        return axios({
            method:"delete",
            url: `${process.env.REACT_APP_API_URL}api/wine/${wineId}`,
            data: { wineName, year, cépage}
        })

        .then((res)=> {
            dispatch({type: DELETE_WINE, payload: {wineId}})
        })
        .catch((err)=> window.alert(err))
    }
}

export const likeWine = (wineId, userId) => {
    return (dispatch) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/wine/like-wine` + wineId,
            data: { userId}
        })
        .then((res) => {
            dispatch({ type: LIKE_WINE, payload: { wineId, userId}})
        })
        .catch((err)=> {
            window.alert(err)
        })
    }
}

export const unlikeWine = (wineId, userId) => {
    return (dispatch) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/wine/unlike-wine` + wineId,
            data: {userId}
        })
        .then((res) => {
            dispatch({ type: UNLIKE_WINE, payload: { wineId, userId}})
        })
        .catch((err)=> {
            window.alert(err)
        })
    }
}

export const addComment = (wineId, commentId, commenterName, text) => {
    return (dispatch) => {
        return axios({
            method:'patch',
            url: `${process.env.REACT_APP_API_URL}api/wine/add-comment/${wineId}`,
            data: {commentId, commenterName, text},
        })
        .then((res)=> {
            dispatch({ type: ADD_COMMENT, payload: { wineId}})
        })
        .catch((err)=> {
            window.alert(err)
        })
    }
}

export const editComment = (wineId, commentId, text) => {
    return (dispatch) => {
        return axios({
            method:"put",
            url:`${process.env.REACT_APP_API_URL}api/wine/edit-comment/${wineId}`,
            data: { commentId, text}
        })
        .then((res) => {
            dispatch({type: EDIT_COMMENT, payload: { wineId, commentId, text}})
        })
        .catch((err) => window.alert(err))
    }
}

export const deleteComment = (wineId, commentId) => {
    return (dispatch) => {
        return axios({
            method:"delete",
            url:`${process.env.REACT_APP_API_URL}api/wine/delete-comment/${wineId}`,
            data: { commentId}
        })
        .then((res) => {
            dispatch({type: DELETE_COMMENT, payload: {wineId, commentId}})
        })
        .catch((err)=> { window.alert(err)})
    }
}