import * as ActionTypes from './ActionTypes'
import * as Services from '@services'

import {AsyncStorage} from '@react-native-community/async-storage'


export const getCities = () => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.CITIES.PENDING})
        Services.getCities()
        .then(response => {
            dispatch({type:ActionTypes.CITIES.SUCCESS, cities:response.data})
        }).catch(err => {
            if(!err){
                dispatch({type:ActionTypes.CITIES.FAIL, message:"Cannot connect to server"})
                console.log("Cannot connect to server");    
                return;
            }
            dispatch({type:ActionTypes.CITIES.FAIL, message:err.message})
        })
    }
}

export const setSelectedCity = (selected_city) => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.CITIES.SELECTED, selectedCity: selected_city})
    }
}