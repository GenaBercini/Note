import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    container: {
        height: '100%'
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        margin: 5
    },
    colorsOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10
    },
    updateButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10
    },
    title: {
        fontSize: 25
    }
})