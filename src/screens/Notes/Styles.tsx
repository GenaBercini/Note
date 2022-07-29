import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        flexGrow: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatList: {
        width: '98%',
        marginTop: 10
    },
    addFirstNote: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addFirstNoteText: {
        opacity: 0.3,
        fontSize: 20
    }
});