import * as AuthActions from './auth'
import * as BannerActions from './banners'
import * as MoviesActions from './movies'
import * as CitiesActions from './city'
import * as SettingActions from './setting'
import * as ToastActions from './toast'
import * as ContentActons from  './content'
import * as TicketActions  from './ticket'
import * as NotificationActions from './notification'
import * as CartAction from './cart'

export const ActionCreators = Object.assign({}, 
    AuthActions, BannerActions, MoviesActions,
    CitiesActions, SettingActions, ToastActions, ContentActons,
    TicketActions, NotificationActions, CartAction)