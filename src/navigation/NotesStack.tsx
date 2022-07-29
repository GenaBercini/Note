import * as React from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { INavigate, RootStackParamList } from "../../types";
import Notes from "../screens/Notes/Notes";
import { TouchableOpacity } from "react-native";
import NoteDetail from "../screens/NoteDetail/NoteDetail";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddNote from "../screens/AddNote/AddNote";
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function NotesStack() {
    const { colors } = useTheme();
    const navigation = useNavigation<INavigate>();
    
    return (
        <Stack.Navigator
            initialRouteName="Notes"
            screenOptions={{
                headerStyle: { backgroundColor: `${colors.primary}` },
                headerTintColor: `${colors.text}`,
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
                                <MaterialCommunityIcons name="menu" size={30} color={`${colors.surface}`}/>
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