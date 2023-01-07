import WService from './helper/WService'

var wservice = new WService()

export const signIn = (data) => {
    return new Promise((resolve, reject) => {
        wservice.signIn(data)
        .then(response => {
            const {statusCode, body} = response
            if(statusCode != 200){
                reject(body);
            }
            resolve(body);
        })
        .catch(err => {
            reject(false);
        })
    })
}

export const setVerify = () => {
    return new Promise((resolve, reject) => {
        wservice.setVerify()
        .then(response => {
            const {statusCode, body} = response
            if(statusCode != 200){
                reject(body);
            }
            resolve(body);
        })
        .catch(err => {
            reject(false);
        })
    })
}

export const signUp = (data) => {
    return new Promise((resolve, reject) => {
        wservice.signUp(data)
        .then(response => {
            const {statusCode, body} = response
            if(statusCode != 200){
                reject(body);
            }
            resolve(body);
        })
        .catch(err => {
            reject(false);
        })
    })
}

export const forgotPassword = (data) => {
    return new Promise((resolve, reject) => {
        wservice.forgotPassword(data)
        .then(response => {
            const {statusCode, body} = response
            if(statusCode != 200){
                reject(body);
            }
            resolve(body);
        })
        .catch(err => {
            reject(false);
        })
    })
}

export const logout = (data) => {
    return new Promise((resolve, reject) => {
        wservice.logout(data)
        .then(response => {
            const {statusCode, body} = response
            if(statusCode != 200){
                reject(body);
            }
            resolve(body);
        })
        .catch(err => {
            reject(false);
        })
    })
}