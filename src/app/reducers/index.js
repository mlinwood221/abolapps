import {persistCombineReducers} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

//import storage from 'redux-persist/es/storage'
import authReducers from './auth'
import bannerReducers from './banners'
import moviesReducers from './movies'
import theatersMovieReducers from './theatersmovie'
import cityReducers from './city'
import settingReducers from './setting'
import likedMoviesReducers from './liked_movies'
import like_unlike from './like_unlike'
import toastReducers from './toast'
import contentReducers from './content'
import ticketReducers from './tickets'
import creditReducers from './credits'
import notificationReducers from './notification'
import cartReducers from './cart'
import theaterProductReducers from './theaterProduct'

const config = {
    key:'root',
    storage:AsyncStorage,  
    whitelist:["authReducers", "cityReducers", "settingReducers"] 
}

const reducers = persistCombineReducers(config, {
    authReducers,
    bannerReducers,
    moviesReducers,
    theatersMovieReducers,
    cityReducers,
    settingReducers,
    likedMoviesReducers,
    like_unlike,
    toastReducers,
    contentReducers,
    ticketReducers,
    creditReducers,
    notificationReducers,
    cartReducers,
    theaterProductReducers
})

export default reducers