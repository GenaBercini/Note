import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        height: '100%'
    },
    detailContainer: {
        height: '95%',
        margin: 15
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
    description: {
        color: 'black'
    },
    title: {
        fontSize: 25,
        color: 'black'
    },
    dateText: {
        color: 'black',
        fontSize: 12,
        opacity: 0.5
    }
})