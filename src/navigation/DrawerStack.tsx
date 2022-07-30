import * as React from "react";
import { RootStackParamList } from "../../types";
import { useTheme } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NotesStack } from "./NotesStack";
import { CustomDrawer } from "./CustomDrawer/CustomDrawer";

const DrawerNavigator = createDrawerNavigator<RootStackParamList>()

export function DrawerStack({ toggleTheme, isDarkTheme }: { toggleTheme: () => void, isDarkTheme: boolean }) {
    const { colors } = useTheme();

    return (
        <DrawerNavigator.Navigator
            drawerContent={(props) => <CustomDrawer {...props} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: `${colors.primary}`,
                    width: 250,
                },
                drawerType: 'back',
                drawerStatusBarAnimation: 'fade'
            }}>
            <DrawerNavigator.Screen name='NotesStack' component={NotesStack} />
        </DrawerNavigator.Navigator>
    )
}