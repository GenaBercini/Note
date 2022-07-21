import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { onAuthStateChanged } from "firebase/auth";
import Login from "../screens/Login";
import SignIn from "../screens/SignIn";
import Home from "../screens/Home";
import { auth } from "../firebase/config";
import { ActivityIndicator, View } from "react-native";
import { AuthUserContext } from "../context/authUserContext";
import NoteDetail from "../screens/NoteDetail";
import FormNote from "../screens/FormNote";

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
                options={{ headerShown: false }}/>
                <Stack.Screen 
                name='FormNote' 
                component={FormNote}  
                options={({route}: any) => ({title: route.params.title, presentation: 'containedModal' , animation: 'slide_from_bottom', headerShown: route.params.title ? true : false})}/>
                <Stack.Screen 
                name='NoteDetail' 
                component={NoteDetail}  
                options={({route}: any) => ({title: route.params.title, presentation: 'containedModal' , animation:'slide_from_right'})}/>
            </Stack.Navigator>
    )
}

function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                name='Login' 
                component={Login} 
                options={{ headerShown: false }}/>
                <Stack.Screen 
                name='SignIn' 
                component={SignIn} 
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