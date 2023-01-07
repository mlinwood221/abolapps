import React, { useEffect, useRef, useState } from 'react'
import {FlatList} from 'react-native'
import {PageContent, ActionBar, MovieItem} from '@components'
import {MovieItemPlaceholder} from '@components/Placeholder'
import {Colors, Constants} from '@commons'
import { View, Text } from 'react-native-ui-lib'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

const placeHolderCount = 6
const tabScreenWidth = Constants.DOCUMENT_WIDTH-35

const LikedMovie = (props) =>{
    
    const [isLoad, setIsLoad] = useState(true)
    const [movies, setMovies] = useState([])
    const [isRefresh, setIsRefresh] = useState(false)
    const listItem = useRef(null)
    const [numColumn, setNumColumn] = useState(2)
    
    useEffect(() => {
        setIsRefresh(false)
        setIsLoad(true)
        props.getLikedMovies() 
        const totalColumn = Constants.DOCUMENT_WIDTH/160
        return () => {setNumColumn(Math.floor(totalColumn))}
    }, [])

    useEffect(() => {
        if(props.type === ActionTypes.LIKED_MOVIES.GET_SUCCESS){
            setMovies(props.liked_movies)
            setIsLoad(false)
            setIsRefresh(false)
        }
        
      
    },[props.type])

    const load_refresh = ()=>{
        setIsRefresh(true)
        props.getLikedMovies()
    }

    useEffect(() => {
        if(props.liked_action === ActionTypes.LIKE_MOVIE.PENDING){
           const index = movies.findIndex(item => item.id === props.m_id)
            if(index >= 0 && !props.updated_like){
               const lists =  movies;
               lists.splice(index, 1)
               setMovies(lists)
            }
        } 
    },[props.liked_action])

    return(
        <PageContent statusBarColor={Colors.primary} navigation={props.navigation} title={__("Liked Movies")}
            refreshable={true}
            isRefreshing={isRefresh}
            onRefresh={load_refresh}  
        >
            {/* <View  row style={{flexWrap:'wrap'}} paddingH-16 paddingV-20  bg-white> */}
            {isLoad 
            ? <View  row style={{flexWrap:'wrap'}} paddingH-16 paddingV-20  bg-white>
                {Array(placeHolderCount).fill(placeHolderCount).map( (_,i) => <MovieItemPlaceholder key={i}/>)}
                </View>
            : <FlatList
                ref={listItem}
                data={movies}
                renderItem={({item}) => <MovieItem mode={"liked_movie"} data={item} 
                    screenWidth={tabScreenWidth} numOfColumn={numColumn}
                    onClickItem={() => props.navigation.navigate('MovieDetailScreen', {movieId:item.id, mode_released:false})}/>}
                keyExtractor={(item) => item.id}
                numColumns={numColumn} 
                
                contentContainerStyle={{flex:1,paddingHorizontal:16, paddingVertical:20, backgroundColor:Colors.white}}
            />
            }
            {/* </View> */}
        </PageContent>
    )
}

function mapStateToProps({likedMoviesReducers, like_unlike}){
    return {
        type:likedMoviesReducers.type,
        liked_movies:likedMoviesReducers.liked_movies,
        liked_action : like_unlike.type,
        updated_like : like_unlike.isLiked,
        m_id : like_unlike.actionId
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(LikedMovie)