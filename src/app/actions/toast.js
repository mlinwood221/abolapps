import * as ActionTypes from './ActionTypes'
import * as Services from '@services'

import {AsyncStorage} from '@react-native-community/async-storage'


export const showToast = () => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.TOAST.SHOW})
        setTimeout(() => {
            dispatch({type:ActionTypes.TOAST.DISMISS})
        }, 1000);
    }
}
