import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    container: {
        height: '100%'
    },
    optionsContainer: {
        flexDirection: 'row',
        backgroundColor: '#27314A80',
        justifyContent: 'space-between',
        borderRadius: 10,
        margin: 5
    },
    colorsOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#27314A',
        borderRadius: 10
    },
    updateButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#27314A',
        borderRadius: 10
    },
    title: {
        fontSize: 25
    }
})