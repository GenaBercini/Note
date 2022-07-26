import * as React from "react";
import { DrawerActions, NavigationContainer, useNavigation, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { INavigate, RootStackParamList } from "../../types";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from "../screens/SignIn/SignIn";
import SignUp from "../screens/SignUp/SignUp";
import Notes from "../screens/Notes/Notes";
import { auth } from "../firebase/config";
import { ActivityIndicator, View, StyleSheet, TouchableOpacity } from "react-native";
import { AuthUserContext } from "../context/authUserContext";
import NoteDetail from "../screens/NoteDetail/NoteDetail";
import { Button, Divider, Text, Drawer, Avatar, Title, Paragraph, Caption, TouchableRipple, Switch, Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, } from "react-native-paper";
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { CombinedDarkTheme, CombinedDefaultTheme } from "../../Theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddNote from "../screens/AddNote/AddNote";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

function CustomDrawerContent({props, toggleTheme, isDarkTheme}: any) {
    const [userData, setUserData] = React.useState({
        name: '',
        phone: '',
        email: '',
        password: '',
    });
    const getUserData = () => {
        try {
            AsyncStorage.getItem('currentUser')
                .then(user => {
                    if (user !== null) {
                        setUserData(JSON.parse(user));
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getUserData();
    }, [])

    return (
        <View style={styles.drawerContent}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Text
                                label={userData?.name[0]?.toUpperCase()}
                                size={50}
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Title style={{ color: 'white' }}>{userData.name}</Title>
                                <Caption style={{ color: 'white' }}>{userData.email}</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section>
                        <DrawerItem
                            icon={() => (
                                <MaterialCommunityIcons name='account'
                                    color={'white'}
                                    size={20}
                                />
                            )}
                            label='Profile'
                            onPress={() => console.log('Work in these')}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <MaterialCommunityIcons name={'brightness-2'} size={30} color={isDarkTheme ? 'black' : 'white'}/><Switch value={isDarkTheme} onValueChange={() => toggleTheme()} /><MaterialCommunityIcons name={'brightness-5'} size={30} color={isDarkTheme ? 'white' : 'black'}/>
                        </View>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.signout}>
                <DrawerItem
                    icon={() => (
                        <MaterialCommunityIcons name='logout-variant'
                            color='white'
                            size={25}
                        />
                    )}
                    label='Sign Out'
                    labelStyle={{ color: 'white' }}
                    onPress={() => signOut(auth)}
                />
            </Drawer.Section>
        </View>
    )
}

function DrawerStack({toggleTheme, isDarkTheme}: any) {
    return (
        <DrawerNavigator.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme}/>}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#27314A',
                    width: 250,
                },
                headerStyle: { backgroundColor: '#27314A' },
                headerTintColor: 'white',
                drawerType: 'back',
                drawerStatusBarAnimation: 'fade'
            }}>
            <DrawerNavigator.Screen name='NotesStack' component={NotesStack} />
        </DrawerNavigator.Navigator>
    )
}

function NotesStack() {

    const navigation = useNavigation<INavigate>();
    return (
        <Stack.Navigator
            initialRouteName="Notes"
            screenOptions={{
                headerStyle: { backgroundColor: '#27314A' },
                headerTintColor: 'white',
            }}>
            <Stack.Screen
                name='Notes'
                component={Notes}
                options={
                    {
                        headerTitleStyle: {
                            fontSize: 30,
                        },
                        headerTitleAlign: 'center',
                        headerBackVisible: false,
                        headerLeft: () => (
                            <TouchableOpacity style={{ borderWidth: 0, height: 40, justifyContent: 'flex-end' }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                                <MaterialCommunityIcons name="menu" size={30} color='white' />
                            </TouchableOpacity>
                        )
                    }}
            />
            <Stack.Screen
                name='AddNote'
                component={AddNote}
                options={{
                    presentation: 'containedModal',
                    animation: 'slide_from_right'
                }} />
            <Stack.Screen
                name='NoteDetail'
                component={NoteDetail}
                options={({ route }: any) => ({
                    title: route.params.title,
                    presentation: 'containedModal',
                    animation: 'slide_from_right',
                    headerTitleAlign: 'center'
                })} />
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

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  function toggleTheme() {
    setIsDarkTheme(isDark => !isDark);
  }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' />
            </View>
        )
    }
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
                {
                    user ? <DrawerStack toggleTheme={toggleTheme} isDarkTheme={isDarkTheme}/> : <AuthStack />
                }
            </NavigationContainer>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        padding: 20,
        borderBottomColor: 'white',
        borderBottomWidth: 2
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
    signout: {
        backgroundColor: '#FFFFFF10',
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