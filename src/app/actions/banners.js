import * as ActionTypes from './ActionTypes'
import * as Services from '@services'

import {AsyncStorage} from '@react-native-community/async-storage'


export const getBanners = () => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.BANNERS.PENDING})
        Services.getBanners()
        .then(response => {
            dispatch({type:ActionTypes.BANNERS.SUCCESS, banners:response.data})
        }).catch(err => {
            if(!err){
                dispatch({type:ActionTypes.BANNERS.FAIL, message:"Cannot connect to server"})
                console.log("Cannot connect to server");    
                return;
            }
            dispatch({type:ActionTypes.BANNERS.FAIL, message:err.message})
        })
    }
}