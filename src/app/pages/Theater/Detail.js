import React, {useEffect, useRef, useState} from 'react'
import {ScrollView, SectionList, TouchableHighlight} from 'react-native'
import {View, Text, Button} from 'react-native-ui-lib'
import {PageContent, ActionBar, TheaterMovieItem} from '@components'
import {MoviesTheaterPlaceholder} from '@components/Placeholder'
import ModalDropdown from 'react-native-modal-dropdown'; 
import {Colors, Constants} from '@commons'
import moment from 'moment'
import styles from './style'
import {useIsFocused} from '@react-navigation/native'


import { robotoWeights } from 'react-native-typography'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import  * as ActionTypes from '@actions/ActionTypes'

const today = moment().format() 
const totalDateDropdown = 7;

const TheaterDetail = (props) => {
    
    const [isMovieLoad, setIsMovieLoad] = useState(true);
    const {theaterMovieId, theaterName} = props.params
    const [listDates, setListDates] = useState([])
    const [selectedDates, setSelectedDate] = useState(null)
    const [listMovies, setListMovies] = useState([])
    const isFocused = useIsFocused();
    
    const dropdown = useRef(null)
    

    useEffect(() => {
        setIsMovieLoad(true)
        setListDates(Array(totalDateDropdown).fill(totalDateDropdown).map( 
            (_,i) => moment(today).add(i, "days").format("YYYY-MM-DD") )) 
        
       props.getTheaterDetails(theaterMovieId) 
    },[])

    useEffect(() => {
       // setIsMovieLoad(true)
        // setListDates(Array(totalDateDropdown).fill(totalDateDropdown).map( 
        //     (_,i) => moment(today).add(i, "days").format("YYYY-MM-DD") )) 
        
       props.getTheaterDetails(theaterMovieId) 
    },[isFocused])

    useEffect(() => {
        setSelectedDate(listDates[0])
    },[listDates])

    useEffect(() => {
        setMovieData();
    },[selectedDates])

    useEffect(() => {
        if(props.type === ActionTypes.THEATER.DETAIL.SUCCESS){
            setMovieData();
            setIsMovieLoad(false)
        }
    }, [props.type])

    useEffect(() => {
        //console.log(listMovies) 
    },[listMovies])

    const setMovieData = () => {
        const selected = moment(selectedDates).format('YYYY-MM-DD')
        
        if(props.theater_movies && selected in props.theater_movies){
          
            setListMovies(props.theater_movies[selected])

        }else{
            setListMovies([]);
        }
        
    }

    function  renderDropdown(rowData, rowID, highlighted) {
        let evenRow = rowID % 2;
        return (
            <View style={[styles.dropdown_2_row, highlighted && {backgroundColor:Colors.lightGray}]} paddingH-16 center paddingV-15>
              <Text center style={[styles.dropdown_2_row_text,{...robotoWeights.regular}, highlighted && {...robotoWeights.medium}]}>
                {__(moment(rowData).format("dddd"))} {moment(rowData).format('DD/MM/YYYY')}
              </Text> 
            </View>
        );
      }
    
    return ( 
        <PageContent statusBarColor={Colors.primary} navigation={props.navigation} title={props.params.theaterName}>
          
            <View  flex backgroundColor={Colors.white}>
                <View  paddingH-16 paddingV-20 >
                    <Text center marginB-10 text90 grey20 style={{...robotoWeights.medium}}>{__("PLEASE SELECT THE DATE")}</Text>
                    <ModalDropdown ref={dropdown}
                        dropdownStyle={{marginTop:-20, marginLeft:70,elevation:16, height:250}}
                        options={listDates}
                        onSelect={(index, value) => setSelectedDate(value) }
                        renderRow={renderDropdown.bind(this)} 
                        defaultIndex={0}
                    >
                   
                        <View style={styles.dateSelect} paddingH-16 center row paddingV-10>
                            <Text style={styles.optionlabel}>{selectedDates && __(moment(selectedDates).format("dddd"))+" "+moment(selectedDates).format('DD/MM/YYYY')}</Text>
                        </View>
                    </ModalDropdown>
                </View>
                <View flex> 
                    {isMovieLoad 
                        ? <ScrollView>
                                <MoviesTheaterPlaceholder/>
                                <MoviesTheaterPlaceholder/>
                            </ScrollView>
                        : <SectionList
                            style={{paddingHorizontal:16}}
                            sections={listMovies}
                            keyExtractor={(item, index) => item + index} 
                            renderItem={({ item }) => <TheaterMovieItem movie={item} moreAction={() => props.navigation.navigate('MovieDetailScreen', {theatermovie_id : item.theatermovie_id, mode_released:true, isComingsoon:true})}/>}
                            renderSectionHeader={({ section: { time } }) => (
                                <Text center style={styles.group_title} marginB-16>{time}</Text> 
                            )}
                            />
                    }
                </View>
            </View>
            
           
        </PageContent>
    )
}


TheaterDetail.defaultProps={
    params:{
        theaterName:"Test"
    }
}

function mapStateToProps({theatersMovieReducers}){
    return {
        type:theatersMovieReducers.type,
        theater_movies:theatersMovieReducers.theater_movies,
        message : theatersMovieReducers.message 
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TheaterDetail)