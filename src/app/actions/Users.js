import * as ActionTypes from './ActionTypes'

import {AsyncStorage} from '@react-native-community/async-storage'


export const getUserData = (userId) => {
    return(dispatch, getState) => {
        
        dispatch({
            type :ActionTypes.GET_USER_DATA_PENDING,
            user_data : null
        })

        if(monitorReducers.monitorMode == 1){
            const ref = database().ref('/users/'+userId).once("value")
            .then(snapshot => {
                let user = snapshot.val()
                if(user){
                    
                    dispatch({type : ActionTypes.USER.GET_USER_DATA_SUCCESS, user_data:user })
                }else{
                    dispatch({type : ActionTypes.USER.GET_USER_DATA_FAIL })
                }
                
            }).catch(err => dispatch({type : ActionTypes.USER.GET_USER_DATA_FAIL }))
        }else{

        }
    }
}