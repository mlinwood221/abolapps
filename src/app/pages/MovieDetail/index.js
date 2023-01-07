import React, { useEffect, useState } from 'react'
import {View, Text, LoaderScreen} from 'react-native-ui-lib'
import {ScrollView, Image} from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'

import {PageContent, ActionBar, Likes, Unlikes, Spinner, StandardButton} from '@components'
import {MovieDetailPlaceholder} from '@components/Placeholder'
import {Colors, Constants} from '@commons'
import styles from './style'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'
import {PullToRefreshView} from 'react-native-smooth-pull-to-refresh'
import {robotoWeights} from 'react-native-typography'
import YoutubePlayer from 'react-native-youtube-iframe'
 
const MovieDetail = (props) => {
    
    const [movie, setMovie] = useState({});
    const [isLoad, setIsLoad] = useState(true)
    const [isRefresh, setIsRefresh] = useState(false)
    const [spinerShow, setSpinnerShow] = useState(false)

    const {mode_released, isComingsoon} = props.params;
    const movieId = mode_released ? props.params.theatermovie_id : props.params.movieId

    const [playerReady, setPlayerReady] = useState(false);

    useEffect(() => {
        let timer;
        if(playerReady) {
            timer = setInterval(() => {  }, 500);
        }

        return () => clearInterval(timer);
    }, [playerReady]);
    
    useEffect(() => {
        setIsLoad(true) 
        props.movieDetail(movieId, mode_released);
    },[])

    useEffect(() => {
        
        if(props.movieType === ActionTypes.MOVIE.DETAIL_SUCCESS){
            setMovie(props.movie_detail)
           
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
        props.movieDetail(movieId, mode_released);
    }

    const videoIdFormatter = (link) => {
       try {
           
           const cleanUri = link.split("?")[0]
           const cleanId = cleanUri.split("/")
            return cleanId[cleanId.length-1]
       } catch (error) {
           return null
       }
        
    }

    return(
        <PageContent statusBarColor={Colors.primary} navigation={props.navigation} 
            refreshable={true}
            isRefreshing={isRefresh}
            onRefresh={load_refresh}
        >
            <ScrollView style={{flex:1,backgroundColor:Colors.white}}>
                {isLoad 
                ?<View flex>
                        <MovieDetailPlaceholder/>
                    </View>
                    : <View flex >
                        <Spinner visible={spinerShow}/>
                        {!isComingsoon &&
                        <View style={styles.bannerContainer}>
                            <Image source={{uri:props.movie_detail.cover, cache:"reload"}} style={styles.bannerImg}/>
                        </View>
                        }

                        <View flex row style={{justifyContent:"space-between"}} marginH-20 marginT-10>
                            <View style={styles.titleContentBoxes}>
                                <Text numberOfLines={2} style={styles.titleContent}>{props.movie_detail.title}</Text>  
                            </View>
                            <View style={styles.titleContentBoxes}>
                                <View flex row style={{alignItems:"center", justifyContent:"center"}}>
                                    <Likes count={movie.likes} isLiked={movie.isLiked} ids={mode_released ? movie.movie_id : movie.id}/> 
                                    <Unlikes style={{marginLeft:10}} count={movie.unlikes} ids={mode_released ? movie.movie_id : movie.id} isUnliked={movie.isUnliked}/>
                                </View>
                            </View> 
                        </View>
                        <View flex marginH-20 marginV-16 >
                            <View row style={{justifyContent:"space-between", alignItems:"center"}} marginB-10>
                                {props.movie_detail.screen_name && <Text text80 color={Colors.gray}>{__("Screen Name")} : {props.movie_detail.screen_name}</Text>}
                                {/* {mode_released && <StandardButton label={__("Buy Ticket")} style={{elevation:4}} onClick={() => {
                                    if(props.isLoggedin)  props.navigation.navigate("BuyTicketScreen", {theaterMovieId:movieId});
                                    else props.showToast();
                                   }}/>} */}
                            </View>
                            
                            {(props.movie_detail.regular_price || props.movie_detail.vip_price) &&
                            <View row marginT-10 style={{justifyContent:"space-between"}}>
                                <View row >
                                    <Text style={styles.labelTitle}>{__("Regular Price")} : </Text>
                                    <Text style={{...styles.labelTitle,color:Colors.gray}}>{props.movie_detail.regular_price}</Text>
                                </View>
                                <View row >
                                    <Text style={styles.labelTitle}>{__("VIP Price")} : </Text>
                                    <Text style={{...styles.labelTitle,color:Colors.gray}}>{props.movie_detail.vip_price}</Text>
                                </View>
                            </View>}
                            <View marginT-10>
                                <Text style={styles.labelTitle} marginV-5>{__("Directors")}</Text>
                                <Text dark30 text80BL marginV-5>{props.movie_detail.directors}</Text>
                            </View>
                            <View marginT-10>
                                <View row style={{justifyContent:"space-between"}}>
                                    <Text style={styles.labelTitle} marginV-5>{__("Actors")}</Text>
                                    {mode_released && <StandardButton label={__("Buy Ticket")} style={{elevation:4}} onClick={() => {
                                        props.navigation.navigate("BuyTicketScreen", {theaterMovieId:movieId});
                                       
                                    }}/>}
                                </View>
                                <Text dark30 text80BL marginV-5>{props.movie_detail.actors}</Text>
                            </View>
                            <View marginT-10>
                                <Text style={styles.labelTitle} marginV-5>{__("About Movie")}</Text>
                                <Text dark30 text80BL marginV-5>{props.movie_detail.about_movie}</Text>
                            </View>
                            {(props.movie_detail.youtubeVideoId && videoIdFormatter(props.movie_detail.youtubeVideoId)) &&     
                            <View marginT-10 marginB-16>
                                <Text center marginB-16 style={robotoWeights.medium} color={Colors.primary}>{__("PREVIEW")}</Text>
                                <YoutubePlayer
                                    webViewStyle={{ height:200}}
                                    videoId={videoIdFormatter(props.movie_detail.youtubeVideoId)}
                                    onReady={() => setPlayerReady(true)}
                                />
                            </View>}
                            
                        </View>
                    </View>
                    }
            </ScrollView>
               
        </PageContent>
    )
}

function mapStateToProps({moviesReducers, authReducers}){
    return {
        movieType : moviesReducers.type,
        movie_detail : moviesReducers.movie_detail,
        isLoggedin : authReducers.isLogedin
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail)