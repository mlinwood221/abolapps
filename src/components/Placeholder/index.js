import React from 'react'
import {View} from 'react-native-ui-lib'
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade, Progressive,
    Shine, ShineOverlay
  } from "rn-placeholder"


export const MovieItemPlaceholder = (props) => {
    return(
        <View paddingH-10 marginB-20 style={{ width:"50%"}}> 
            <Placeholder Animation={ShineOverlay}>
                <PlaceholderMedia style={{
                        borderRadius:15,
                        height:210,
                        width:"100%"
                    }}/>
                <PlaceholderLine height={14} style={{marginTop:10, borderRadius:30}}/>
            </Placeholder>
        </View>
    )
}

export const TheatersMoviePlaceholder = (props) => {
    return(
        <View paddingH-10 marginB-20 style={{ width:"50%"}}> 
            <Placeholder Animation={ShineOverlay}>
                <PlaceholderMedia style={{
                        borderRadius:15,
                        height:210,
                        width:"100%"
                    }}/>
                <View row>
                    <PlaceholderLine height={14} style={{ flex:1, marginTop:10, marginRight:10, borderRadius:30}}/>
                    <PlaceholderLine height={14} width={20} style={{  marginTop:10, borderRadius:30}}/>
                </View>
               
            </Placeholder>
        </View>
    )
}

export const MoviesTheaterPlaceholder = (props) => {
    return(
        <View flex paddingH-16 style={{borderRadius:10}}> 
            <Placeholder Animation={ShineOverlay} style={{padding:0}}>
                <View center>
                    <PlaceholderLine width={30} height={14} style={{ marginTop:10, marginRight:10, borderRadius:30}}/>
                </View>
            </Placeholder>
            
                {/* <View  style={{backgroundColor:10}}> */}
                    <Placeholder Animation={ShineOverlay} style={{marginBottom:16, height:100, backgroundColor:"rgba(0,0,0,.03)", borderRadius:10}}>
                        
                        <View row>
                            <PlaceholderLine height={100} width={30} style={{ borderRadius:0,borderTopLeftRadius:10,borderBottomLeftRadius:10 }}/>
                            <View flex marginL-10 marginT-10 paddingT-10> 
                                <PlaceholderLine width={60} height={14} style={{ marginTop:5, marginRight:10, borderRadius:30}}/>
                                <PlaceholderLine width={80} height={14} style={{ marginRight:10, borderRadius:30}}/>
                            </View>
                        </View>
                        
                    </Placeholder>
                    
                {/* </View> */}
                    
                <Placeholder Animation={ShineOverlay} style={{marginBottom:16, height:100, backgroundColor:"rgba(0,0,0,.03)", borderRadius:10}}>
                        
                    <View row>
                        <PlaceholderLine height={100} width={30} style={{ borderRadius:0,borderTopLeftRadius:10,borderBottomLeftRadius:10 }}/>
                        <View flex marginL-10 marginT-10 paddingT-10> 
                            <PlaceholderLine width={60} height={14} style={{ marginTop:5, marginRight:10, borderRadius:30}}/>
                            <PlaceholderLine width={80} height={14} style={{ marginRight:10, borderRadius:30}}/>
                        </View>
                    </View> 
                </Placeholder>
            
            
        </View>
    )
}

export const MovieDetailPlaceholder = (props) => {
    return(
        <View flex paddingH-16 > 
            <Placeholder Animation={ShineOverlay} style={{padding:0}}>
                <View center>
                    <PlaceholderLine  style={{ height:150, marginTop:16, marginHorizontal:16, borderRadius:30}}/>
                </View>
                <View row style={{justifyContent:"space-between"}}>
                    <PlaceholderLine style={{ width:"40%", height:35, marginTop:10 }}/>
                    <PlaceholderLine  style={{ width:"40%", height:35, marginTop:10}}/>
                </View>
                <View row>
                    <PlaceholderLine style={{ width:70, height:15, marginTop:16, marginRight:10, borderRadius:30}}/>
                    <PlaceholderLine style={{ width:90, height:15, marginTop:16, borderRadius:30}}/>
                </View>
                <View row style={{justifyContent:"space-between"}}>
                    <View row>
                        <PlaceholderLine style={{ width:80, height:15,  marginRight:10, borderRadius:30}}/>
                        <PlaceholderLine style={{ width:50, height:15,  borderRadius:30}}/>
                    </View>
                    <View row>
                        <PlaceholderLine style={{ width:80, height:15,  marginRight:10, borderRadius:30}}/>
                        <PlaceholderLine style={{ width:50, height:15,  borderRadius:30}}/>
                    </View>
                </View>
                <View marginT-10>
                    <PlaceholderLine style={{ width:80, height:15,  marginRight:10, borderRadius:30}}/>
                    <PlaceholderLine style={{ height:15,  borderRadius:30}}/>
                    <PlaceholderLine width={50} style={{ height:15,  borderRadius:30}}/>
                </View>
                <View marginT-10>
                    <PlaceholderLine style={{ width:80, height:15,  marginRight:10, borderRadius:30}}/>
                    <PlaceholderLine style={{ height:15,  borderRadius:30}}/>
                    <PlaceholderLine width={90} style={{ height:15,  borderRadius:30}}/>
                    <PlaceholderLine  style={{ height:15,  borderRadius:30}}/>
                    <PlaceholderLine width={50} style={{ height:15,  borderRadius:30}}/>
                </View>
               
            </Placeholder>
        </View>
    )
}

export const TicketItemsPlaceHolder = (props) => {
    return(<View paddingH-10 marginB-20 > 
                <Placeholder Animation={ShineOverlay}>
                    <PlaceholderMedia style={{
                            borderRadius:15,
                            height:110,
                            width:"100%"
                        }}/>
                    <PlaceholderLine height={14} style={{marginTop:10, borderRadius:30}}/>
                </Placeholder>
            </View>)
} 