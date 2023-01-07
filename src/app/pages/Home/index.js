import React, {useEffect, useState} from 'react'
import {View, Text} from 'react-native-ui-lib'
import {ScrollView} from 'react-native'
import {
    PageContent, 
    ActionBar, 
    Banners, 
    TabBar,BannerPagination  } from '@components'
import {Colors} from '@commons'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'



const Home = (props) => {
    const [bannerIndex, setBannerIndex] = useState(0);
    const [isLoad, setIsLoad] = useState(true)
    const [banners, setBanners] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false)

    useEffect(() => {
        setIsRefresh(false)
        setIsRefresh(false)
        props.getBanners()
        return () => true;
    }, []);

    useEffect(() => {
        if(props.bannerType !== ActionTypes.BANNERS.PENDING ){
            if(props.banners){
                setBanners(props.banners)
                props.getHomeMovies()
            }
        }

        if(props.bannerType === ActionTypes.BANNERS.FAIL){
            setIsLoad(false)
            setIsRefresh(false)
        }
        
    },[props.bannerType]) 

    useEffect(() => {
        if(props.movieType === ActionTypes.HOME_MOVIES.SUCCESS){
            props.getUser()
            props.getCities()
            setIsLoad(false)
            setIsRefresh(false)
        }
    }, [props.movieType])

    const load_refresh = () =>{ 
        setIsRefresh(true)
        props.getBanners()
    }
    
    return(
        <PageContent statusBarColor={Colors.primary} isTopPage={true} navigation={props.navigation}
            refreshable={true}
            isRefreshing={isRefresh}
            onRefresh={load_refresh}
        > 
            <View flex backgroundColor={Colors.white}>
                <ScrollView style={{flex:1}}>
                    <Banners data={banners} onSnap={(index) => setBannerIndex(index)} isLoad={isLoad}/>
                    <View flex>
                    <BannerPagination data={banners} activeSlide={bannerIndex}/>
                    </View>
                    
                    <View bg-white>
                        <TabBar banners={banners} bannerIndex={bannerIndex}/>
                    </View>
                </ScrollView>
            </View>
        </PageContent>
    )
}



function mapStateToProps({bannerReducers, moviesReducers}){
    return {
        bannerType:bannerReducers.type,
        banners:bannerReducers.banners,
        movieType : moviesReducers.type
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)