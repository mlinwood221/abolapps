import WService from './helper/WService'

var wservice = new WService()

export const getBanners = () => {
    return new Promise((resolve, reject) => {
        wservice.getBanners()
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