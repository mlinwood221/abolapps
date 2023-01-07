import React,{Component} from 'react'
import {View, Text} from 'react-native'
import App from './App'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import store from '@helpers/Store'

import reducers from '../reducers'

import {persistStore} from 'redux-persist'
import  {PersistGate} from 'redux-persist/es/integration/react'

// const middleWare = [thunkMiddleware]
// const store = compose(applyMiddleware(...middleWare))(createStore)(reducers)

let persistor = persistStore(store) 

class Root extends Component{
    render(){ 
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor} >
                    <App/>
                </PersistGate>
            </Provider>
            
        )
    }
}


export default Root