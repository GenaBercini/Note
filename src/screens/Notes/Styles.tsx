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
        backgroundColor: '#7462D2'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50 
    },
    flatList: {
        width: '98%',
        marginTop: 10
    },
    addFirstNote: {
        width: '98%',
        marginTop: 10
    },
    addFirstNoteText: {
        color: '#FFFFFF',
        opacity: 0.3,
        fontSize: 20
    }
});