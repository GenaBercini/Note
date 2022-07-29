import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        padding: 20,
        borderBottomWidth: 2,
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    signout: {
        marginHorizontal: 4,
        borderRadius: 10,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});