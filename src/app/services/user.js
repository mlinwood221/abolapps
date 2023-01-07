import WService from './helper/WService'

var wservice = new WService()

export const getUser = () => {
    return new Promise((resolve, reject) => {
        wservice.getUser()
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

export const updateUser = (data) => {
    return new Promise((resolve, reject) => {
        wservice.updateUser(data)
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

export const profileUpload = (data) => {
    return new Promise((resolve, reject) => {
        wservice.profile_upload(data)
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
