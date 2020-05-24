import { StyleSheet } from 'react-native';
import normalize, { normalScale, verticalScale } from '../config/device/normalize';
import * as colors from '../../assests/colors';
import fonts from './../../assests/fonts';

const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        justifyContent: 'center'
    },
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    container: {        
        marginBottom: verticalScale(50)
    },
    innerContainer: {
        marginHorizontal: normalScale(20),
        marginVertical: verticalScale(10)  
    },
    card: {
        backgroundColor: colors.silver,
        minHeight: verticalScale(90),
        padding: verticalScale(20),
        borderRadius: 15,
        shadowColor: colors.white,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 5,
        elevation: 4
    },
    image: {
        height: '100%',
        width: normalScale(100),
        borderRadius: 15
    },
    detail: {
        marginVertical: verticalScale(10),
        width: '60%'        
    },
    name: {
        fontFamily: fonts.RobotoBold,
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: colors.lightBlack
    },
    nameInner: {
        fontFamily: fonts.RobotoBold,
        fontSize: normalize(13),
        fontWeight: 'bold',
        color: colors.lightBlack
    },
    author: {
        fontFamily: fonts.RobotoBold,
        fontSize: normalize(15),
        fontWeight: 'bold',
        color: colors.lightBlack,
        marginTop: verticalScale(10)
    },
    authorInner: {
        fontFamily: fonts.RobotoBold,
        fontSize: normalize(13),
        fontWeight: 'bold',
        color: colors.lightBlack
    }
})

export default styles;