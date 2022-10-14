export const SET_MINUTES = 'SET_MINUTES';
export const SET_HOURS = 'SET_HOURS';
export const SET_TIMER_STOPPED = 'SET_TIMER_STOPPED';

export const setMinutes = minutes => dispatch => {
    dispatch({
        type: SET_MINUTES,
        payload: minutes
    })
}

export const setHours = hours => dispatch => {
    dispatch({
        type: SET_HOURS,
        payload: hours
    })
}