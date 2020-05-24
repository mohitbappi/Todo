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
        minHeight: verticalScale(130),
        paddingVertical: verticalScale(5),
        paddingLeft: normalScale(5),
        paddingRight: normalScale(25),
        marginBottom: verticalScale(10),
        borderRadius: 15,
        shadowColor: colors.white,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 5,
        elevation: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        height: '100%',
        width: normalScale(100),
        borderRadius: 15
    },
    detail: {
        marginVertical: verticalScale(10),
        width: '60%',
        justifyContent: 'space-between'
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
        color: colors.lightBlack
    },
    authorInner: {
        fontFamily: fonts.RobotoBold,
        fontSize: normalize(13),
        fontWeight: 'bold',
        color: colors.lightBlack
    },
    button: {
        backgroundColor: colors.green,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20            
    },
    buttonText: {
        fontWeight: 'bold',
        fontFamily: fonts.RobotoBold,
        fontSize: normalize(11),
        color: colors.white
    }
})

export default styles;