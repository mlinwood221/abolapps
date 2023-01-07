import WService from './helper/WService'

var wservice = new WService()

export const aboutUs = () => {
    return new Promise((resolve, reject) => {
        wservice.aboutUs()
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

export const contactUs = () => {
    return new Promise((resolve, reject) => {
        wservice.contactUs()
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

export const notifications = () => {
    return new Promise((resolve, reject) => {
        wservice.notifications()
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