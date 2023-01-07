import {Dimensions, Platform, StatusBar} from 'react-native'

const {width, height} = Dimensions.get('window')

const Constants = {
    DOCUMENT_WIDTH:width,
    DOCUMENT_HEIGHT:height,
    STATUS_BAR_HEIGHT : Platform.OS === "ios" ? 20 : StatusBar.currentHeight,
    HEADER_HEIGHT : Platform.OS === "ios" ? 44 : 56,
}

export default Constants