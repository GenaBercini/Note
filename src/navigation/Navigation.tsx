import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Notes from "../screens/Notes";
import { auth } from "../firebase/config";
import { ActivityIndicator, View } from "react-native";
import { AuthUserContext } from "../context/authUserContext";
import NoteDetail from "../screens/NoteDetail";
import FormNote from "../screens/FormNote";
import { Button, Text } from "react-native-paper";
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { UserInterfaceIdiom } from "expo-constants";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

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
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Hi {user.email}</Text>
            <Button  color ='white' style={{backgroundColor: '#7462D2'}} onPress={() => signOut(auth)}>SignOut</Button>
        </DrawerContentScrollView>
    );
}

function DrawerStack() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#27314A',
                    width: 200,
                },
                headerStyle: { backgroundColor: '#27314A' },
                headerTintColor: 'white',
            }}>
            <Drawer.Screen name='Notes' component={Notes} />
        </Drawer.Navigator>
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
                name='FormNote'
                component={FormNote}
                options={({ route }: any) => ({ title: route.params.title, presentation: 'containedModal', animation: 'slide_from_right', headerShown: true, headerTitle: route.params.title ? route.params.title : 'Add Note' })} />
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