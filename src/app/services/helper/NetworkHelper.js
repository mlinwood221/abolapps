import store from '@helpers/Store'
import qs from 'querystring'

class NetworkHelper {
    static post(url, params, headers = null){
        
        return NetworkHelper.httpRequest('post', url, params, headers)
    }

    static get(url, headers = null){
        return NetworkHelper.httpRequest('GET', url, null, headers)
    }

    static httpRequest(method, url, params, headers){
        return new Promise((resolve, reject) => {
            var options = {
                method,
                headers : {
                    'Accept':'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-api-key' : "462c6ec5-c207-4f7a-9949-7a7391468679"
                }
            }

            const {authReducers} = store.getState()

            if(authReducers.isLogedin || authReducers.userInfo){
         
                options.headers["secret-key"] = authReducers.userInfo.secret
            }

          
            if(params) {
                options.body = qs.stringify(params)
            }
           
           
            fetch(url, options)
            .then((response) => { 

                return response.json()
            })
            .then((body) => {
                resolve({statusCode:body.status, body}) 
            })
            .catch(err => { 
                reject(err)
            }) 
        })
    }

    static upload(url, params){
        return new Promise((resolve, reject) => {
            var options = {
                method:"POST",
                headers : {
                    'Accept':'application/json',
                    'Content-Type': 'multipart/form-data',
                    'x-api-key' : "462c6ec5-c207-4f7a-9949-7a7391468679"
                }
            }

            const {authReducers} = store.getState()

            if(authReducers.isLogedin || authReducers.userInfo){
         
                options.headers["secret-key"] = authReducers.userInfo.secret
            }

            const form_data = new FormData()
            form_data.append('file', params)
           
            options.body = form_data
          
           
           
            fetch(url, options)
            .then((response) => { 

                return response.json()
            })
            .then((body) => {
                resolve({statusCode:body.status, body}) 
            })
            .catch(err => { 
                reject(err)
            }) 
        })
    }
}

export default NetworkHelper