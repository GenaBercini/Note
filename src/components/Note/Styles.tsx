import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    card: {
        borderRadius: 5,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,

        elevation: 6,
    },
    title: {
        color: 'black'
    },
    deleteButton: {
        marginRight: 10,
        marginBottom: 20,
        color: 'white'
    }
})