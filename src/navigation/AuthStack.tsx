import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import SignIn from "../screens/SignIn/SignIn";
import SignUp from "../screens/SignUp/SignUp";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthStack() {
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