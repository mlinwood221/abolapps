import * as ActionTypes from './ActionTypes'
import * as Services from '@services'
import moment from 'moment'

export const getHomeMovies = () => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.HOME_MOVIES.PENDING})
        
        Services.getHomeMovies()
        .then(response => {
            const movies = response.data;
            
            const now_showing = movies.filter(movie => parseInt(movie.status) === 1)
            const coming_soon = movies.filter(movie => parseInt(movie.status) !== 1)
            
            dispatch({type:ActionTypes.HOME_MOVIES.SUCCESS, now_showing, coming_soon})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.HOME_MOVIES.FAIL, message:"Cannot connect to server"})
                return;
            }
            dispatch({type:ActionTypes.HOME_MOVIES.SUCCESS, message:err.message})
        })
    }
}

export const getTheatersMovie = (movieId) =>{
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.THEATER.MOVIES.PENDING})
        Services.getTheatersMovie(movieId)
        .then(response => {
            
            dispatch({type:ActionTypes.THEATER.MOVIES.SUCCESS, theaters: response.data})
        })
        .catch(err => {
            
            if(!err){
                dispatch({type:ActionTypes.THEATER.MOVIES.FAIL, message:"Cannot connect to server"})
                return;
            }
            dispatch({type:ActionTypes.THEATER.MOVIES.FAIL, message:err.message})
        })
    }
}

export const getTheaterDetails = (theaterMovieId) => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.THEATER.DETAIL.PENDING})

        Services.getTheaterDetails(theaterMovieId)
        .then(response => {
            
            const {movies} = response.data
           
            let movie_data = {};
            movies.map(movie => {
                const movie_date = moment(movie.date).format("YYYY-MM-DD")
                if(!(movie_date in movie_data)){
                    movie_data [movie_date] = [];
                }
                
                const exisitingIndex = movie_data [movie_date].findIndex(item => item.time === movie.time)
                
                if(exisitingIndex < 0){
                    movie_data [movie_date].push({
                        time : movie.time,
                        data : [movie]
                    })
                    
                }else{
                    
                    movie_data [movie_date][exisitingIndex].data.push(movie)
                   
                }
            
            })
           dispatch({type:ActionTypes.THEATER.DETAIL.SUCCESS, theater_movies: movie_data})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.THEATER.DETAIL.FAIL, message:"Cannot connect to server"})
                return;
            }
            dispatch({type:ActionTypes.THEATER.DETAIL.FAIL, message:err.message})
        })
    }
}

export const movieDetail = (movieId, released = false) => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.MOVIE.DETAIL_PENDING, released})
        
        Services.getMovieDetail(movieId, released)
        .then(response => {
         
            dispatch({type:ActionTypes.MOVIE.DETAIL_SUCCESS, movie_detail: response.data})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.MOVIE.DETAIL_FAIL, message:"Cannot connect to server"})
                return;
            }
            dispatch({type:ActionTypes.MOVIE.DETAIL_FAIL, message:err.message})
        })
    }
}

export const getLikedMovies = () => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.LIKED_MOVIES.GET_PENDING})
        
        Services.getLikedMovies()
        .then(response => {
            dispatch({type:ActionTypes.LIKED_MOVIES.GET_SUCCESS, liked_movies: response.data})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.LIKED_MOVIES.GET_FAIL, message:"Cannot connect to server"})
                return;
            }
            dispatch({type:ActionTypes.LIKED_MOVIES.GET_FAIL, message:err.message}) 
        })
    }
}


export const likeMovie = (isLiked, ids) => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.LIKE_MOVIE.PENDING, ids:ids, isLiked:isLiked})
        Services.likeMovie(ids, isLiked)
        .then(response => {
            console.log(response)
            dispatch({type:ActionTypes.LIKE_MOVIE.SUCCESS, ids:ids, isLiked:isLiked, message:response.message})
        })
        .catch(err => {
            console.log(err)
            if(!err){
                dispatch({type:ActionTypes.LIKE_MOVIE.FAIL, message:"Cannot connect to server"})
                return;
            }
            dispatch({type:ActionTypes.LIKE_MOVIE.FAIL, message:err.message}) 
        })
    }
}

export const unLikeMovie = (isUnliked, ids) => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.UNLIKE_MOVIE.PENDING, ids:ids, isUnliked:isUnliked})
        Services.unlikeMovie(ids, isUnliked)
        .then(response => {
           
            dispatch({type:ActionTypes.UNLIKE_MOVIE.PENDING, ids:ids, isUnliked:isUnliked, message:response.message})
        })
        .catch(err => { 
            if(!err){
                dispatch({type:ActionTypes.UNLIKE_MOVIE.FAIL, message:"Cannot connect to server"})
                return;
            }
            dispatch({type:ActionTypes.UNLIKE_MOVIE.FAIL, message:err.message}) 
        })
    }
}

export const notifyTheater = (id, status) => {
    return(dispatch, getState) => {
        
        Services.notifyTheater(id, status)
        .then(response => {
            console.log(response)
            //dispatch({type:ActionTypes.UNLIKE_MOVIE.PENDING, ids:ids, isUnliked:isUnliked, message:response.message})
        })
        .catch(err => { 
           console.log(err.message)
        })
    }
}

export const getTheaterProduct = (theaterMovieId) => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.THEATER_PRODUCT.PENDING})
        
        Services.getTheaterProduct(theaterMovieId)
        .then(response => {
            dispatch({type:ActionTypes.THEATER_PRODUCT.SUCCESS, products: response.data})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.THEATER_PRODUCT.FAIL, message:"Cannot connect to server"})
                return;
            }
            dispatch({type:ActionTypes.THEATER_PRODUCT.FAIL, message:err.message}) 
        })
    }
}
