import WService from './helper/WService'

var wservice = new WService()

export const buyTicket = (data) => {
    return new Promise((resolve, reject) => {
        wservice.buyTicket(data)
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

export const addCredit = (data) => {
    return new Promise((resolve, reject) => {
        wservice.addCredit(data)
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

export const getTicketList = () => {
    return new Promise((resolve, reject) => {
        wservice.getTicketList()
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


export const getTicketDetail = (ticketId) => {
    return new Promise((resolve, reject) => {
        wservice.getTicketDetail(ticketId)
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