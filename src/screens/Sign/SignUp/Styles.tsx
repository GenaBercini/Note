import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191F2F',
    },
    image: {
        width: '100%',
        height: '20%',
    },
    title: {
        fontSize: 40,
        color: '#FFFFFF',
        textAlign: 'center',
        bottom: 20
    },
    input: {
        backgroundColor: '#293A70',
        color: '#FFFFFF',
        height: 50
    },
    button: {
        backgroundColor: '#7462D2',
        borderRadius: 10,
        textAlign: 'center',
        padding: 5,
        fontSize: 20
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30
    },
    haveAccount: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: 20
    },
    haveAccountButton: {
        color: '#7462D2',
        fontSize: 15
    },
    haveAccountText: {
        color: '#FFFFFF',
        marginRight: 5
    },
})