import React, { useEffect, useState } from 'react'
import {ScrollView, FlatList, TextInput} from 'react-native'
import {View, Text} from 'react-native-ui-lib'
import {PageContent, ActionBar} from '@components'
import {Colors,Constants} from '@commons'
import {MovieItem, Search} from '@components'
import {TheatersMoviePlaceholder} from '@components/Placeholder'


import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

import styles from './style'
import { robotoWeights } from 'react-native-typography'

const placeHolderCount = 4
const tabScreenWidth = Constants.DOCUMENT_WIDTH-32

const TheaterList = (props) =>{
    const [theaterIsload, setTheaterIsLoad] = useState(true)
    const [selectedCity, setSelectedCity] = useState(null)
    const [dataFilters, setDataFilter] = useState(null)
    const [searchValue, setSearchValue] = useState(null)
    const [isRefresh, setIsRefresh] = useState(false)
    const {movieId} = props.params
    const [numColumn, setNumColumn] = useState(2)

    useEffect(() => {
        setTheaterIsLoad(true)
        props.setSelectedCity(null)
        props.getTheatersMovie(movieId) 
        setIsRefresh(false)
        const totalColumn = Constants.DOCUMENT_WIDTH/160
        return () => {setNumColumn(Math.floor(totalColumn))}
    },[])

    useEffect(() => {
        if(props.type === ActionTypes.THEATER.MOVIES.SUCCESS){
            
            setDataFilter(props.theaters)
            setFilter()
            setIsRefresh(false)
        }

        if(props.type === ActionTypes.THEATER.MOVIES.PENDING){
            setTheaterIsLoad(true)
        }

        if(theaterIsload && ( props.type === ActionTypes.THEATER.MOVIES.SUCCESS
            || props.type === ActionTypes.THEATER.MOVIES.FAIL )
        ){
           setTheaterIsLoad(false)
        }
        
    },[props.type])

    useEffect(() => {
        setFilter();

    },[searchValue, selectedCity])

    useEffect(() => {
        setSelectedCity(props.selectedCity)
    },[props.selectedCity])

    const setFilter = () => {
        const {theaters} = props
        let filters = theaters;
        if(searchValue && searchValue != "" && theaters){
            filters = filters.filter(theater => theater.name.toLowerCase().includes(searchValue.trim().toLowerCase()))
        }

        if(selectedCity && selectedCity.id > 0 && theaters){
            filters = filters.filter(theater => {
                return theater.city_id === selectedCity.id
            })
        }

        if((!searchValue || searchValue == "") && (!selectedCity || selectedCity.id <= 0)){
            filters = theaters
        }
        
        setDataFilter(filters)
    }

    const load_refresh = ()=>{
        setIsRefresh(true)
        props.getTheatersMovie(movieId) 
    }


    return(
        <PageContent statusBarColor={Colors.primary} navigation={props.navigation}
            refreshable={true}
            isRefreshing={isRefresh}
            onRefresh={load_refresh}
        >
           
            <View flex backgroundColor={Colors.white}>
            <ScrollView>
                <View flex paddingV-16 backgroundColor={Colors.white}>
                    {/* <TextInput onChangeText/> */}
                    <View flex center paddingH-30 marginV-10>
                        <Search
                            onChangeText={(val) => setSearchValue(val) }
                        />
                    </View>
                    <Text center marginT-10 marginB-5 style={styles.sectionTitle}>{__("SELECT YOUR CITY & CINEMA")} </Text>
                    {(selectedCity && selectedCity.id > 0)
                    && <Text center color={Colors.primary} marginB-5 style={{...robotoWeights.light}} text90>{selectedCity.city} </Text>}
                    
                    <View centerH={dataFilters && dataFilters.length > 1} paddingH-16 paddingV-10 marginT-10 >
                        {theaterIsload 
                        ? <View flex row style={{flexWrap:"wrap"}}>{Array(placeHolderCount).fill(placeHolderCount).map( (_,i) => <TheatersMoviePlaceholder key={i}/>)}</View>
                        : <FlatList
                            scrollEnabled={false}
                            ListEmptyComponent={<EmptyFlat/>} 
                            data={dataFilters}
                            renderItem={({item}) => <MovieItem mode={"theater"} onBell={(id, status) => {
                               props.isLogedin ? props.notifyTheater(id,status) : props.showToast()
                            }} data={item} 
                            screenWidth={tabScreenWidth} numOfColumn={numColumn}
                            onClickItem={() => props.navigation.navigate('TheaterDetailScreen', {theaterMovieId: item.id, theaterName : item.name})}/>}
                            keyExtractor={(item) => item.id}
                            numColumns={numColumn} 
                        />
                        }
                        
                    </View>
                </View>
            </ScrollView>
            </View>
        </PageContent>
    )
}

const EmptyFlat = () => {
    return(
        <View flex center paddingV-30><Text color={Colors.gray}>{__("Data not found")}</Text></View>
    )
}


function mapStateToProps({theatersMovieReducers, cityReducers, authReducers}){
    return {
        type:theatersMovieReducers.type,
        theaters:theatersMovieReducers.theaters,
        message:theatersMovieReducers.message,
        cityType : cityReducers.type,
        selectedCity : cityReducers.selectedCity,
        isLogedin : authReducers.isLogedin
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TheaterList)