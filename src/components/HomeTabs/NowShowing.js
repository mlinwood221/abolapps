import React, {useState, useEffect} from 'react'
import {View, Text} from 'react-native-ui-lib'
import {FlatList} from 'react-native'
import {MovieItem} from '@components'
import {Colors, Constants} from '@commons'
import {MovieItemPlaceholder} from '@components/Placeholder'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

const placeHolderCount = 4
const tabScreenWidth = Constants.DOCUMENT_WIDTH-20

const NowShowing = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [numColumn, setNumColumn] = useState(2)

    useEffect(() => {
        const totalColumn = Constants.DOCUMENT_WIDTH/150
        setNumColumn(Math.floor(totalColumn))
    },[])

    useEffect(() => {
       
        if(props.type === ActionTypes.HOME_MOVIES.SUCCESS){
            setIsLoading(false)
        }
    },[props.type])

    useEffect(() => {
        if(isLoading){
            props.getHomeMovies();
        }
    },[isLoading])

    return (
        <View centerH paddingH-10 paddingV-10 backgroundColor={Colors.white}>
            {isLoading 
            ? <View row>{Array(placeHolderCount).fill(placeHolderCount).map( (_,i) => <MovieItemPlaceholder key={i}/>)}</View>
            : <FlatList
                data={props.now_showing}
                renderItem={({item, index}) => <MovieItem data={item} screenWidth={tabScreenWidth} numOfColumn={numColumn} index={index} onClickItem={() => props.navigation.navigate('TheaterScreen',{movieId:item.id})}/>}
                keyExtractor={(item) => item.id}
                numColumns={numColumn}
            />
            }
        </View>
    )
}


function mapStateToProps({moviesReducers}){
    return {
        type : moviesReducers.type,
        now_showing:moviesReducers.now_showing
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NowShowing)