import WService from './helper/WService'

var wservice = new WService()

export const getHomeMovies = () => {
    return new Promise((resolve, reject) => {
        wservice.getHomeMovies()
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

export const getTheatersMovie = (movieId) => {
    return new Promise((resolve, reject) => {
        wservice.getTheatersMovie(movieId)
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

export const getTheaterDetails = (theaterMovieId) => {
    return new Promise((resolve, reject) => {
        wservice.getTheaterDetails(theaterMovieId)
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

export const notifyTheater = (theaterMovieId, status) => {
    return new Promise((resolve, reject) => {
        wservice.notifyTheater({
            theaterid : theaterMovieId,
            isNotify : status
        })
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

export const likeMovie = (movieId, status) => {
    return new Promise((resolve, reject) => {
        wservice.likeMovie({
            movieId : movieId,
            status : status
        })
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

export const unlikeMovie = (movieId, status) => {  
    return new Promise((resolve, reject) => {
        wservice.unlikeMovie({
            movieId : movieId,
            status : status
        })
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


export const getMovieDetail = (movieId, released = false) => {
    return new Promise((resolve, reject) => {
        wservice.getMovieDetail(movieId, released)
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

export const getLikedMovies = () => {
    return new Promise((resolve, reject) => {
        wservice.getLikedMovies()
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

export const getTheaterProduct = (theaterMovieId) => {
    return new Promise((resolve, reject) => {
        wservice.getTheaterProduct(theaterMovieId)
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