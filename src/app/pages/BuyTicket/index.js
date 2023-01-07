import React, { useEffect, useState } from 'react'
import {View, Text, LoaderScreen, Stepper, Button} from 'react-native-ui-lib'
import {ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import Icon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

import {PageContent, ActionBar, Likes, Unlikes,
    Spinner, StandardButton, ProductItem, Cart,
    ItemCart} from '@components'
import {MovieDetailPlaceholder} from '@components/Placeholder'
import {Colors, Constants} from '@commons'
import styles from './style'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'
import {PullToRefreshView} from 'react-native-smooth-pull-to-refresh'
import {robotoWeights} from 'react-native-typography'
 
const BuyTicket = (props) => {
    
    const [movie, setMovie] = useState({});
    const [isLoad, setIsLoad] = useState(true)
    const [isRefresh, setIsRefresh] = useState(false)
    const [spinerShow, setSpinnerShow] = useState(false)
    const [selectedPrice, setSelectedPrice] = useState(1)
    const [prices, setPrices] = useState({1:0, 2:0})
    const [qty, setQty] = useState(1)
    const [showDialog, setShowDialog] = useState(false)
    const [showError, setShowError] = useState(false)
    const [totalPurchase, setTotalPurchase] = useState(0)

    
    const movieId = props.params.theaterMovieId

    useEffect(() => {
        setShowDialog(false)
        setShowError(false)
        setQty(1)
        setSelectedPrice(1)
        setIsLoad(true) 
        props.movieDetail(movieId, 1);
        setTotalPurchase(0)
    },[])

    useEffect(() => {
        if(props.movieType === ActionTypes.MOVIE.DETAIL_SUCCESS){
            props.getTheaterProduct(movieId)
            setMovie(props.movie_detail)
            setPrices({
                1: props.movie_detail.regular_price,
                2:props.movie_detail.vip_price
            })
            
            if(isLoad){
                setSpinnerShow(true)
                setIsLoad(false)
                setTimeout(() => {
                    setSpinnerShow(false)
                }, 2000);
            }
            setTimeout(() => {
                setIsRefresh(false)
            }, 500);
        }
    },[props.movieType])

    const load_refresh = () =>{ 
        setIsRefresh(true)
        props.movieDetail(movieId, 1);
        
    }

    const onSubmit = () => {
       setShowDialog(false)
       setSpinnerShow(true)

       setTimeout(() => {
            const fieldParams = {
                theaterMovieId : movieId,
                ticketType : selectedPrice,
                amount : qty,
                foods: props.cart_items
            }

            props.buyTickets(fieldParams)
       }, 500);

        
    }

    useEffect(() => {
        
        if(props.ticketType === ActionTypes.TICKET.BUY.PENDING){
            setSpinnerShow(true)
        }else{
            
            if(props.ticketType === ActionTypes.TICKET.BUY.SUCCESS){
                if(spinerShow){
                    props.getUser()
                    props.navigation.replace("TicketDetailScreen", {message: props.ticketMessage, ticket_id:props.ticket_id})
                }

                setSpinnerShow(false) 
            }
            if(props.ticketType === ActionTypes.TICKET.BUY.FAIL){
                if(spinerShow) setShowError(true)
                setSpinnerShow(false)
            }
           
        }
        
    },[props.ticketType])

    useEffect(() => {
        const calculate = () => {
            let tot = 0;
            if(props.cart_items){
                props.cart_items.map((item) => {
                    tot += item.price*item.qty
                })
            }
            //const moviePrices = prices[selectedPrice]+"";
            //const movieTotal = parseInt(moviePrices.replace(/[^0-9\.]+/g,''))*qty;
            setTotalPurchase(tot);
        }
        return () => calculate();
    },[props.cart_items, props.cart_type]) 

    return(
        <View flex>
        <PageContent statusBarColor={Colors.primary} navigation={props.navigation} title={__("Book Ticket")}
            refreshable={true}
            isRefreshing={isRefresh}
            onRefresh={load_refresh}
        >
            <View flex bg-white> 
            <ScrollView style={{flex:1,backgroundColor:Colors.white, height:"80%"}}> 
                {isLoad 
                ?<View flex >
                        <MovieDetailPlaceholder/> 
                    </View>
                    : <View flex >
                        <Spinner visible={spinerShow}/>
                        {/* <View style={styles.bannerContainer}>
                            <Image source={{uri:props.movie_detail.cover, cache:"reload"}} style={styles.bannerImg}/>
                        </View> */}

                        <View  row style={{justifyContent:"space-between"}} marginH-20 paddingT-10>
                            <View style={styles.titleContentBoxes}>
                                <Text numberOfLines={2} style={styles.titleContent}>{props.movie_detail.title}</Text>
                            </View>
                            <View style={styles.titleContentBoxes}>
                                <View flex row style={{alignItems:"center", justifyContent:"center"}}>
                                    <Likes count={movie.likes} isLiked={movie.isLiked} ids={props.movie_detail.id}/> 
                                    <Unlikes style={{marginLeft:10}} count={movie.unlikes} ids={movie.id} isUnliked={movie.isUnliked}/>
                                </View>
                            </View> 
                        </View>
                        <View flex marginH-20 marginV-16 >
                            {/* <View row style={{justifyContent:"center", alignItems:"center"}} marginB-10>
                                {props.movie_detail.screen_name && <Text text80 color={Colors.gray}>{__("Screen Name")} : {props.movie_detail.screen_name}</Text>}
                            </View> */}
                            <View height={1} marginV-10 backgroundColor={Colors.lightGray}/>
                            <View row style={{justifyContent:"center"}}>
                                <TouchableOpacity onPress={() => setSelectedPrice(1)} activeOpacity={0.8}>
                                    <View paddingV-8 
                                        paddingH-10
                                        style={[styles.toggle,styles.toggleLeft, selectedPrice == 1 && styles.activeBackground]}>
                                        <Text style={[robotoWeights.medium, selectedPrice == 1 && styles.activeLabel]} grey30 text90>{__("Regular")} : {prices[1]}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSelectedPrice(2)} activeOpacity={0.8}>
                                    <View paddingV-8 
                                        paddingH-10
                                        style={[styles.toggle,styles.toggleRight, selectedPrice == 2 && styles.activeBackground]}>
                                        <Text style={[robotoWeights.medium, selectedPrice == 2 && styles.activeLabel]} grey30 text90>{__("VIP")} : {prices[2]}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View row marginT-20 style={{justifyContent:"space-between", alignItems:"center"}} >
                                <Text style={{...robotoWeights.medium}} dark20>{__("How many tickets")} :</Text>
                                <View row style={styles.stepper}>
                                    <TouchableOpacity onPress={() => qty > 1 && setQty(qty-1)}>
                                        <View flex center paddingH-10 paddingV-5 style={{borderRightWidth:.5,borderRightColor:Colors.lightGray}}>
                                            <Icon name={"minus"} size={15}/>
                                        </View>
                                    </TouchableOpacity>
                                    <View paddingH-15 center backgroundColor={Colors.lightGray}>
                                        <Text dark20>{qty}</Text>
                                    </View>
                                    
                                    <TouchableOpacity onPress={() => setQty(qty+1)}>
                                        <View flex center paddingH-10 paddingV-5 style={{borderLeftWidth:.5,borderLeftColor:Colors.lightGray}}>
                                            <Icon name={"plus"} size={15}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View row marginT-15 style={{justifyContent:"space-between", alignItems:"center"}}>
                                <Text style={{...robotoWeights.medium, width:"60%"}} dark20>{__("Movie amount")} :</Text>
                                <Text style={{...robotoWeights.medium}} dark20 text70>{parseInt(prices[selectedPrice].replace(/[^0-9\.]+/g,''))*qty} BIR</Text>
                            </View>
                            {!props.products && props.product_type === ActionTypes.THEATER_PRODUCT.PENDING && 
                                <View flex center paddingV-10>
                                    <ActivityIndicator size={20}/>
                                </View>
                            }
                            {props.products && props.products.length > 0 && 
                                <>
                                <View height={1} marginT-20 backgroundColor={Colors.lightGray}/>
                                <Cart/>
                                <View flex marginT-20>
                                    <View row style={{justifyContent:'space-between'}} marginB-10>
                                        <Text style={{...robotoWeights.regular, width:"60%"}} grey20>{__("Food & Beverage")}</Text>
                                        {/* <TouchableOpacity>
                                            <View row centerV>
                                                <Text color={Colors.gray} marginR-5 text90>Show All</Text>
                                                <Icon name="chevron-right" color={Colors.gray} size={13}/>
                                            </View>
                                            
                                        </TouchableOpacity> */}
                                    </View>

                                </View>
                                </>
                                }
                        </View> 
                        <View row marginB-10 marginL-5>
                        {props.products && props.products.length > 0 && 
                            <ScrollView horizontal style={{paddingVertical:5}} showsHorizontalScrollIndicator={false} >
                                {props.products.map((item, index) => {
                                    return(<ProductItem key={index} item={item}/>)
                                })}
                            </ScrollView>
                        }
                        </View>
                        {/* <View flex center marginT-20 paddingV-10>
                            <StandardButton label={__("PAY")}  style={{ paddingHorizontal:50, elevation:5}} onClick={() => setShowDialog(true)}/>
                        </View> */}
                        
                        <AwesomeAlert
                            show={showDialog}
                            customView={<ModalConfirm 
                                onCancel={setShowDialog}
                                onConfirm={onSubmit}
                                data={{
                                    theaterMovieId : movieId,
                                    ticketType : selectedPrice,
                                    amount : qty,
                                    price : totalPurchase+(parseInt(prices[selectedPrice].replace(/[^0-9\.]+/g,''))*qty),
                                    foods : props.cart_items
                                }}/>}
                            contentContainerStyle={{padding:0, width:"70%"}}
                            onDismiss={() => setShowDialog(false)}
                        />
                        <AwesomeAlert
                            show={showError}
                            contentContainerStyle={{padding:0}}
                            customView={<ErrorView message={props.ticketMessage} />}
                            closeOnTouchOutside={false}
                            contentContainerStyle={{padding:0, width:"70%"}}
                            showCancelButton
                            cancelText={__("CLOSE")}
                            onCancelPressed={() => setShowError(false)}
                            actionContainerStyle={{padding:0, marginTop:-10}}
                            cancelButtonStyle={{backgroundColor:"transparent", alignSelf:"flex-end"}}
                            cancelButtonTextStyle={{color:Colors.red}}
                            onDismiss={() => setShowError(false)}
                        />
                        
                    </View>

                    }
            </ScrollView>
                 
            </View>
        </PageContent>
        {!isLoad &&
                <View paddingV-10 paddingH-16 bg-white style={{zIndex:1, bottom:0, elevation:5, borderTopWidth:0.4,borderTopColor:Colors.lightGray}}> 
                    <View row style={{justifyContent:"space-between"}}>
                        <View flex>
                            <Text text100>Total</Text>
                            <Text >{totalPurchase+(parseInt(prices[selectedPrice].replace(/[^0-9\.]+/g,''))*qty)} BIR</Text> 
                        </View>
                        <StandardButton label={__("PAY")}  style={{ paddingHorizontal:50, elevation:5}} onClick={() => {
                            if(props.isLoggedin) setShowDialog(true)
                            else props.showToast();
                        
                        }}/>
                    </View>
                </View> }
        </View>
    )
}

const ModalConfirm = (props) => {
   
    return(
        <View paddingV-5 paddingH-20>
            <View row style={{alignItems:"center"}}>
                <View marginR-10 center style={{width:20, height:20, borderRadius:50}} backgroundColor={Colors.primary}>
                    <Icon name={"help-circle"} size={20} color={Colors.white}/>
                </View>
                <Text style={{...robotoWeights.regular}}>{__("Confirm your purchase")}</Text>
            </View>
            <View center marginT-10>
                <FontAwesome name="ticket-alt" size={35} color={Colors.primary}/>
                <Text marginT-5 style={{...robotoWeights.condensedBold}}>({props.data.amount}) {props.data.ticketType === 1 ? __("Regular Tickets"):__("VIP Tickets")}</Text>
                {props.data.foods && 
                    props.data.foods.map(food => 
                        <Text key={food.id+"_mdl"} numberOfLines={1} marginT-5 text90 style={{...robotoWeights.condensed}}>({food.qty}) {food.name} {food.size && "("+food.size+")"}</Text> 
                    )
                }
                <View marginT-10 paddingH-20 bg-grey60 paddingV-5 style={{borderRadius:3}}>
                    <Text style={{...robotoWeights.medium}} text90>{props.data.price} BIR</Text>
                </View>
            </View>
            <View height={1} bg-grey50 marginT-15 style={{marginHorizontal:-16}}/>
            <View row center marginT-15>
                <Button label={__("Cancel")} onPress={() => props.onCancel(false)} marginH-5 enableShadow style={{height:30}}  labelStyle={{fontSize:12}} bg-grey40/>
                <Button label={__("Confirm")} onPress={() =>  props.onConfirm()} marginH-5 enableShadow style={{height:30, padding:0, backgroundColor:Colors.primary}} labelStyle={{fontSize:12}}/>
            </View>
        </View>
    )
}

const ErrorView = (props) => {
    return(
        <View paddingT-5 paddingH-10 style={{alignSelf:"flex-start"}}>
            <View row style={{alignItems:"center"}} >
                <Icon name="alert-circle" color={Colors.red} size={15}/>
                <Text marginL-5 text90 dark30 style={{...robotoWeights.medium}}>{__("Payment process failed")}</Text>
            </View>
            <Text marginT-15 marginB-5 grey20 style={{...robotoWeights.light}} text90>{props.message}</Text>
        </View>
    )
}

function mapStateToProps({moviesReducers, ticketReducers, cartReducers, theaterProductReducers, authReducers}){
    return {
        ticketType : ticketReducers.type,
        movieType : moviesReducers.type,
        movie_detail : moviesReducers.movie_detail,
        ticketMessage: ticketReducers.message,
        ticket_id : ticketReducers.ticket_id,
        cart_type : cartReducers.type,
        cart_items : cartReducers.cart_items,
        product_type : theaterProductReducers.type,
        products : theaterProductReducers.products,
        isLoggedin : authReducers.isLogedin
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(BuyTicket)