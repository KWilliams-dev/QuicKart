export const SET_TOTAL = 'SET_TOTAL'

export const setTotal = total => dispatch => {
    dispatch({
        type: SET_TOTAL,
        payload: total
    })
}