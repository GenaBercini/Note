import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Notes from "../screens/Notes";
import { auth } from "../firebase/config";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { AuthUserContext } from "../context/authUserContext";
import NoteDetail from "../screens/NoteDetail";
import { Button, Divider, Text, Drawer, Avatar, Title, Paragraph, Caption, TouchableRipple, Switch } from "react-native-paper";
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddNote from "../screens/AddNote";

const Stack = createNativeStackNavigator<RootStackParamList>();
const DrawerNavigator = createDrawerNavigator<RootStackParamList>();

export function AuthUserProvider({ children }: any) {
    const [user, setUser] = React.useState(null);
    return (
        <AuthUserContext.Provider value={{ user, setUser }}>
            {children}
        </AuthUserContext.Provider>
    )
}

function CustomDrawerContent(props: any) {
    const { user }: any = React.useContext(AuthUserContext);
    return (
        <DrawerContentScrollView {...props}>
            <View
                style={
                    styles.drawerContent
                }
            >
                <View style={styles.userInfoSection}>
                    <Title style={styles.title}>Hi {user.email}</Title>
                    <Caption style={styles.caption}>{user.email}</Caption>
                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                202
                            </Paragraph>
                            <Caption style={styles.caption}>Following</Caption>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="account-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Profile"
                        onPress={() => { }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons name="tune" color={color} size={size} />
                        )}
                        label="Preferences"
                        onPress={() => { }}
                    />
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                                name="bookmark-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Bookmarks"
                        onPress={() => { }}
                    />
                </Drawer.Section>
                <Drawer.Section title="Preferences">
                    <TouchableRipple onPress={() => { }}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={false} />
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
            </View>
        </DrawerContentScrollView>
    )
}

function DrawerStack() {
    return (
        <DrawerNavigator.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#27314A',
                    width: 200,
                },
                headerStyle: { backgroundColor: '#27314A' },
                headerTintColor: 'white',
            }}>
            <DrawerNavigator.Screen name='Notes' component={Notes} />
        </DrawerNavigator.Navigator>
    )
}

function NotesStack() {
    return (
        <Stack.Navigator
            initialRouteName="DrawerStack"
            screenOptions={{
                headerStyle: { backgroundColor: '#27314A' },
                headerTintColor: 'white',
            }}>
            <Stack.Screen
                name='DrawerStack'
                component={DrawerStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='AddNote'
                component={AddNote}
                options={{ presentation: 'containedModal', animation: 'slide_from_right', headerShown: true }} />
            <Stack.Screen
                name='NoteDetail'
                component={NoteDetail}
                options={({ route }: any) => ({ title: route.params.title, presentation: 'containedModal', animation: 'slide_from_right' })} />
        </Stack.Navigator>
    )
}

function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen
                name='SignIn'
                component={SignIn}
                options={{ headerShown: false, animation: 'slide_from_left' }} />
            <Stack.Screen
                name='SignUp'
                component={SignUp}
                options={{ headerShown: false, animation: 'slide_from_right' }} />
        </Stack.Navigator>
    )
}

export function Navigation() {
    const { user, setUser }: any = React.useContext(AuthUserContext);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, async (authUser) => {
            authUser ? setUser(authUser) : setUser(null);
            setLoading(false);
        });
        return () => unsuscribe();
    }, [user]);

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' />
            </View>
        )
    }
    return (
        <NavigationContainer>
            {
                user ? <NotesStack /> : <AuthStack />
            }
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
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