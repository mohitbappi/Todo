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
        backgroundColor: colors.white,
        flex: 1
    },
    container: {
        marginHorizontal: normalScale(30),
        marginVertical: verticalScale(100)                 
    },
    activeField: {
        borderBottomColor: colors.darkGreen,
        backgroundColor: colors.transparent,
        color: colors.lightBlack,
        paddingLeft: normalScale(12)
    },
    filledField: {
        borderBottomColor: colors.darkGreen,
        backgroundColor: colors.transparent,
        color: colors.lightBlack
    },
    inactiveField: {
        borderBottomColor: colors.green,
        color: colors.silverGrey,
        backgroundColor: colors.transparent
    },    
    button: {
        marginTop: verticalScale(100)
    },
    account: {
        marginTop: verticalScale(18),
        color: colors.silverGrey,
        fontFamily: fonts.OpenSansRegular,
        fontSize: normalize(16),
        alignSelf: 'center',
        marginBottom: verticalScale(70)
    },
    accountBold: {
        fontFamily: fonts.OpenSansBold,
        fontWeight: 'bold'
    }
})

export default styles;