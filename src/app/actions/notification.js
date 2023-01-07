import * as ActionTypes from './ActionTypes'
import * as Services from '@services'

export const getNotificationHistory = () => {
    return (dispatch, getState) => {
        dispatch({type: ActionTypes.NOTIFICATION.HISTORY.PENDING})
        Services.notifications()
        .then(response => {
            dispatch({type:ActionTypes.NOTIFICATION.HISTORY.SUCCESS, message:response.message, notifications:response.data})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.NOTIFICATION.HISTORY.FAIL, message:"Cannot connect to server"})
                return;
            }
            dispatch({type:ActionTypes.NOTIFICATION.HISTORY.FAIL, message:err.message})
        })
    }
}