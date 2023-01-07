import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers from '../reducers'


import {persistStore} from 'redux-persist'
import  {PersistGate} from 'redux-persist/es/integration/react'

const middleWare = [thunkMiddleware]
const Store = compose(applyMiddleware(...middleWare))(createStore)(reducers)

export default Store