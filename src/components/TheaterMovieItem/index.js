import React from 'react'
import {Image, TouchableOpacity} from 'react-native'
import {View, Text} from 'react-native-ui-lib'
import {Colors, Icons} from '@commons'
import Icon from 'react-native-vector-icons/Feather'
import {Likes} from '@components'
import styles from './style'

const TheaterMovieItem = (props) => {
    const {movie} = props
    
    return(
        <View row style={styles.itemContainer}>
            <Image source={{uri:movie.schedule_image, cache:"reload"}} style={styles.image}/>
            <View flex paddingH-16 style={{justifyContent:"center"}}> 
                <View row style={{justifyContent:"space-between", alignItems:"center"}}>
                    <View flex>
                        <Text style={styles.movieTitle}>{movie.movie_name}</Text>
                        <View row marginT-10>
                            <Likes style={{marginRight:5,}} isLiked={movie.is_liked} ids={movie.movie_id}  count={movie.likes}/>
                            <View row marginH-5 style={{alignItems:"center"}}>
                                <Text marginR-5 color={Colors.primary}>{movie.views}</Text>
                                <Icon name={"eye"} size={15} color={Colors.gray}/>
                            </View> 
                        </View>
                    </View>
                    
                    <TouchableOpacity onPress={() => props.moreAction()} style={{marginLeft:15}}>
                        <View row>
                            {/* <Text grey20 text90>{__("More")}</Text>
                            <Icon name={"chevron-right"} size={15} color={Colors.gray}/> */}
                            <Image source={Icons.ic_arrow_right} style={{width:30, resizeMode:"contain"}}/>
                        </View>
                        
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}

export default TheaterMovieItem