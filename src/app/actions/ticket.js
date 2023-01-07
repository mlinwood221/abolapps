import * as ActionTypes from './ActionTypes'
import * as Services from '@services'
import qs from 'querystring'

export const buyTickets = (data) => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.TICKET.BUY.PENDING})
        let food_param = {
            theaterMovieId:data.theaterMovieId,
            ticketType:data.ticketType,
            amount:data.amount
        };
         data.foods.map((itm, idx) => {
            food_param["foods["+idx+"][product_id]"] = itm.id;
            food_param["foods["+idx+"][qty]"] = itm.qty;
        })
        
       // console.log(qs.stringify(food_param)) 
        Services.buyTicket(food_param) 
        .then(response => {
            dispatch({type:ActionTypes.TICKET.BUY.SUCCESS, message:response.message, ticket_id:response.data.ticket_id})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.TICKET.BUY.FAIL, message:"Cannot connect to server"})
                return;
            }
            dispatch({type:ActionTypes.TICKET.BUY.FAIL, message:err.message})
            console.log(err)
        })
    }
}

export const addCredit = (data) => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.CREDIT.ADD.PENDING})
        
        Services.addCredit(data)
        .then(response => {
            dispatch({type:ActionTypes.CREDIT.ADD.SUCCESS, message:response.message})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.CREDIT.ADD.FAIL, message:"Cannot connect to server"})
                return;
            }
            dispatch({type:ActionTypes.CREDIT.ADD.FAIL, message:err.message})
        })
    }
}

export const getTicketList = () => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.TICKET.LIST.PENDING})
        Services.getTicketList()
        .then(response => {
            dispatch({type:ActionTypes.TICKET.LIST.SUCCESS, tickets:response.data, message:response.message})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.TICKET.LIST.FAIL, message:"Cannot connect to server"})
                return;
            }
            dispatch({type:ActionTypes.TICKET.LIST.FAIL, message:err.message})
        })
    }
}


export const getTicketDetail = (ticketId) => {
    return(dispatch, getState) => {
        dispatch({type:ActionTypes.TICKET.DETAIL.PENDING})
        Services.getTicketDetail(ticketId)
        .then(response => {
            // response.data = {...response.data, foods:[
            //     {
            //         id:1,
            //         name:"popcorn",
            //         size:"small",
            //         qty:5,
            //         price_total:50
            //     }
            // ]}
            dispatch({type:ActionTypes.TICKET.DETAIL.SUCCESS, ticket:response.data, message:response.message})
        })
        .catch(err => {
            if(!err){
                dispatch({type:ActionTypes.TICKET.DETAIL.FAIL, message:"Cannot connect to server"})
                return;
            }
            dispatch({type:ActionTypes.TICKET.DETAIL.FAIL, message:err.message})
        })
    }
}