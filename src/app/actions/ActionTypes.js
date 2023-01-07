export const SETTING = {
    LANGUAGE_PREPARE : "LANGUAGE_PENDING",
    LANGUAGE_CHANGED : "LANGUAGE_CHANGED"
}

export const AUTH = {
    LOGIN : {
        PENDING : "AUTH_LOGIN_PENDING",
        SUCCESS : "AUTH_LOGIN_SUCCESS",
        FAIL    : "AUTH_LOGIN_FAIL",
        VERIFY_PENDING : "AUTH_VERIFY_PENDING",
        VERIFY_SUCCESS : "AUTH_VERIFY_SUCCESS",
        VERIFY_FAIL : "AUTH_VERIFY_FAIL"
    },
    SIGN_UP : {
        PENDING : "AUTH_SIGNUP_PENDING",
        SUCCESS : "AUTH_SIGNUP_SUCCESS",
        FAIL    : "AUTH_SIGNUP_FAIL"
    },
    FORGOT_PASSWORD : {
        PENDING : "AUTH_FORGOT_PASSWORD_PENDING",
        SUCCESS : "AUTH_FORGOT_PASSWORD_SUCCESS",
        FAIL    : "AUTH_FORGOT_PASSWORD_FAIL"
    },
    LOGOUT : "AUTH_LOGOUT",
}

export const PROFILE = {
    GET : {
        PENDING : "PROFILE_PENDING",
        SUCCESS : "PROFILE_SUCCESS",
        FAIL : "PROFILE_FAIL"
    },
    UPDATE : {
        PENDING : "UPDATE_PROFILE_PENDING",
        SUCCESS : "UPDATE_PROFILE_SUCCESS",
        FAIL : "UPDATE_PROFILE_FAIL"
    },
    UPLOAD : {
        PENDING : "UPLOAD_PROFILE_PENDING",
        SUCCESS : "UPLOAD_PROFILE_SUCCESS",
        FAIL : "UPLOAD_PROFILE_FAIL"
    }
    
}

export const BANNERS = {
    PENDING : "GET_BANNER_PENDING",
    SUCCESS : "GET_BANNER_SUCCESS",
    FAIL : "GET_BANNER_FAIL"
}

export const CITIES = {
    SELECTED : "CITIES_SELECTED",
    PENDING : "CITIES_PENDING",
    SUCCESS : "CITIES_SUCCESS",
    FAIL : "CITIES_FAIL"
}

export const HOME_MOVIES = {
    PENDING : "HOME_MOVIES_PENDING",
    SUCCESS : "HOME_MOVIES_SUCCESS",
    FAIL : "HOME_MOVIES_FAIL"
}

export const THEATER = {
    MOVIES : {
        PENDING : "THEATER_MOVIES_PENDING",
        SUCCESS : "THEATER_MOVIES_SUCCESS",
        FAIL : "THEATER_MOVIES_FAIL"
    },
    DETAIL : {
        PENDING : "THEATER_DETAIL_PENDING",
        SUCCESS : "THEATER_DETAIL_SUCCESS",
        FAIL : "THEATER_DETAIL_FAIL"
    }
}

export const MOVIE = {
    DETAIL_PENDING: "MOVIE_DETAIL_PENDING",
    DETAIL_SUCCESS: "MOVIE_DETAIL_SUCCESS",
    DETAIL_FAIL: "MOVIE_DETAIL_FAIL",
}

export const LIKED_MOVIES = {
    GET_PENDING : "LIKED_MOVIES_GET_PENDING",
    GET_SUCCESS : "LIKED_MOVIES_GET_SUCCESS",
    GET_FAIL : "LIKED_MOVIES_GET_FAIL"
}

export const LIKE_MOVIE = {
    PENDING : "LIKE_MOVIE_PENDING",
    SUCCESS : "LIKE_MOVIE_SUCCESS",
    FAIL : "LIKE_MOVIE_FAIL"
}

export const UNLIKE_MOVIE = {
    PENDING : "UNLIKE_MOVIE_PENDING",
    SUCCESS : "UNLIKE_MOVIE_SUCCESS",
    FAIL : "UNLIKE_MOVIE_FAIL"
}

export const TOAST = {
    SHOW : "SHOW_TOAST",
    DISMISS : "DISMISS_TOAST"
}

export const CONTENT = {
    ABOUT : {
        PENDING : "CONTENT_ABOUT_PENDING",
        SUCCESS : "CONTENT_ABOUT_SUCCESS",
        FAIL : "CONTENT_ABOUT_FAIL",
    },
    CONTACT : {
        PENDING : "CONTENT_CONTACT_PENDING",
        SUCCESS : "CONTENT_CONTACT_SUCCESS",
        FAIL : "CONTENT_CONTACT_FAIL",
    }
}

export const TICKET = {
    BUY : {
        PENDING: "TICKET_BUY_PENDING",
        SUCCESS : "TICKET_BUY_SUCCESS",
        FAIL : "TICKET_BUY_FAIL"
    },
    LIST : {
        PENDING: "TICKET_LIST_PENDING",
        SUCCESS : "TICEKT_LIST_SUCCESS",
        FAIL : "TICKET_LIST_FAIL"
    },
    DETAIL : {
        PENDING : "TICKET_DETAIL_PENDING",
        SUCCESS : "TICKET_DETAIL_SUCCESS",
        FAIL : "TICKET_DETAIL_FAIL"
    }
}

export const CREDIT = {
    ADD : {
        PENDING : "CREDIT_ADD_PENDING",
        SUCCESS : "CREDIT_ADD_SUCCESS",
        FAIL : "CREDIT_ADD_FAIL"
    }
}

export const TOKEN = {
    SAVE : "TOKEN_SAVE",
    REFRESH : {
        PENDING : "TOKEN_REFRESH_PENDING",
        SUCCESS : "TOKEN_REFRESH_SUCCESS",
        FAIL : "TOKEN_REFRESH_FAIL"
    }
}

export const NOTIFICATION = {
    RESET : "NOTIFICATION_RESET",
    SYNC  : "NOTIFICATION_SYNC",
    NEW : "NOTIFICATION_NEW",
    HISTORY: {
        PENDING: "NOTIFICATION_HISTORY_PENDING",
        SUCCESS : "NOTIFICATION_HISTORY_SUCCESS",
        FAIL : "NOTIFICATION_HISTORY_FAIL"
    }
}

export const THEATER_PRODUCT = {
    PENDING : "THEATER_PRODUCT_PENDING",
    SUCCESS : "THEATER_PRODUCT_SUCCESS",
    FAIL : "THEATER_PRODUCT_FAIL"
}

export const CART = {
    PENDING:"CART_PENDING",
    ADD : "CART_ADD",
    REMOVE : "CART_REMOVE",
    REMOVE_ALL : "CART_REMOVE_ALL"
}