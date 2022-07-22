import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Home from "../screens/Home";
import { auth } from "../firebase/config";
import { ActivityIndicator, View } from "react-native";
import { AuthUserContext } from "../context/authUserContext";
import NoteDetail from "../screens/NoteDetail";
import FormNote from "../screens/FormNote";
import { Text } from "react-native-paper";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthUserProvider({ children } : any) {
    const [user, setUser] = React.useState(null);
    return (
        <AuthUserContext.Provider value={{user, setUser}}>
            {children}
        </AuthUserContext.Provider>
    )
}

function NotesStack() {
    return (
    <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                name='Home' 
                component={Home} 
                options={{ headerShown: true,
                  headerLeft:() => (
                    <Text>Home</Text>
                ) }}
                />
                <Stack.Screen 
                name='FormNote' 
                component={FormNote}  
                options={({route}: any) => ({title: route.params.title, presentation: 'containedModal' , animation: 'slide_from_right', headerShown: true, headerTitle: route.params.title ? route.params.title:  'Add Note'})}/>
                <Stack.Screen 
                name='NoteDetail' 
                component={NoteDetail}  
                options={({route}: any) => ({title: route.params.title, presentation: 'containedModal' , animation:'slide_from_right'})}/>
            </Stack.Navigator>
    )
}

function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen 
                name='SignIn' 
                component={SignIn} 
                options={{ headerShown: false, animation: 'slide_from_left' }}/>
                <Stack.Screen 
                name='SignUp' 
                component={SignUp} 
                options={{ headerShown: false,  animation: 'slide_from_right' }}/>
            </Stack.Navigator>
    )
}

export function Navigation() {
    const { user, setUser } : any = React.useContext(AuthUserContext);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, async (authUser) => {
            authUser ? setUser(authUser) : setUser(null);
            setLoading(false);
        });
        return () => unsuscribe();
    }, [user]);

    if(loading) {
        return (
            <View>
                <ActivityIndicator size='large'/>
            </View>
        )
    }
    return(
        <NavigationContainer>
            {
                user ? <NotesStack/> : <AuthStack/>
            }
        </NavigationContainer>
    )
}