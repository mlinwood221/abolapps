import NetworkHelper from './NetworkHelper'
import store from '@helpers/Store'
import qs from 'querystring'

function WService(){}

WService.prototype.URI = (resource, params = null) => {
    var uri = "https://api.mocki.io/v1/90d7512f/" + resource
    const {settingReducers} = store.getState()
    var defaultLang = {lang: settingReducers.lang}
    
    if(params){
        params = {...defaultLang, ...params}
    }else{
        params = {...defaultLang}
    }
    const realParams = qs.stringify(params);
    console.log("TOTAL HOME REQUEST", uri+"?"+realParams);

    return  uri
}

WService.prototype.URI2 = (resource, params = null) => {
    var uri = "https://cinemabet.net/api/" + resource
    const {settingReducers} = store.getState()
    var defaultLang = {lang: settingReducers.lang}
    
    if(params){
        params = {...defaultLang, ...params}
    }else{
        params = {...defaultLang}
    }
    const realParams = qs.stringify(params);

    return uri+"?"+realParams
}

WService.prototype.signIn = function(data) { 
    return NetworkHelper.post( this.URI2("login") , data)
}

WService.prototype.setVerify = function() {
    return NetworkHelper.post( this.URI2("setsmsverified") )
}

WService.prototype.signUp = function(data) { 
    return NetworkHelper.post( this.URI2("sign-up") , data)
}

WService.prototype.forgotPassword = function(data) { 
   
    return NetworkHelper.post( this.URI2("forgot-password"), data)
}

WService.prototype.getUser = function () {
    return NetworkHelper.get( this.URI2("profile"))
}

WService.prototype.updateUser = function (data) {
    return NetworkHelper.post( this.URI2("update-profile"), data)
}

WService.prototype.getBanners = function() {
    return NetworkHelper.get( this.URI2("banners") ) 
}

WService.prototype.getCities = function() {
    return NetworkHelper.get( this.URI2("cities") )
}

WService.prototype.getHomeMovies = function() {
    return NetworkHelper.get( this.URI2("movies") )
}

WService.prototype.getTheatersMovie = function(movieId) {
    //movieId = 3 //DEBUG ONLY
    
    return NetworkHelper.get( this.URI2("movie-theaters/"+movieId) )  
}

WService.prototype.getTheaterDetails = function(theaterMovieId) {
   // theaterMovieId = 9 //DEBUG ONLY 
    return NetworkHelper.get( this.URI2("theater-detail/"+theaterMovieId) ) 
}

WService.prototype.notifyTheater = function (data) {
    return NetworkHelper.post( this.URI2("setnotifyintheater"), data)
}

WService.prototype.likeMovie = function (data) {
    return NetworkHelper.post( this.URI2("like-movie"), data)
}

WService.prototype.unlikeMovie = function (data) {
    return NetworkHelper.post( this.URI2("unlike-movie"), data)
}

WService.prototype.getMovieDetail = function(movieId, released = false) {
    if(released){
       // movieId = 3
        return NetworkHelper.get( this.URI2("movie-theater-detail/"+movieId) )
    }else{
        //movieId = 5
        return NetworkHelper.get( this.URI2("movie-detail/"+movieId) )
    }
    
}

WService.prototype.getLikedMovies = function () {
    return NetworkHelper.get( this.URI2("get-liked-movies"))
}

WService.prototype.aboutUs = function () {
    return NetworkHelper.get( this.URI2("about-us")) 
}

WService.prototype.contactUs = function () {
    return NetworkHelper.get( this.URI2("contact-us"))
}

WService.prototype.buyTicket = function (data) {
   return NetworkHelper.post( this.URI2("buyticket"), data )
 // return NetworkHelper.post( "http://34.87.89.9/test.php", data ) 
}

WService.prototype.addCredit = function(data){
    return NetworkHelper.post( this.URI2("addmoney"), data )
}

WService.prototype.getTicketList = function(){
    return NetworkHelper.get(this.URI2("mytickets"))
}

WService.prototype.getTicketDetail = function(ticketId){
    return NetworkHelper.get(this.URI2("ticket/"+ticketId))
}

WService.prototype.notifications = function(){
    return NetworkHelper.get(this.URI2("noti-history"))
}

WService.prototype.profile_upload = function(data){
   return NetworkHelper.upload(this.URI2('profile-upload'), data)
}

WService.prototype.logout = function(data) {
    return NetworkHelper.post(this.URI2('logout'), data)
}

WService.prototype.getTheaterProduct = function(theaterMovieId) {
   return NetworkHelper.get(this.URI2('theaterproducts/'+theaterMovieId))
}

module.exports = WService