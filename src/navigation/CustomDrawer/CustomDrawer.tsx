import * as React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { View } from "react-native";
import { Drawer, Avatar, Title, Caption, Switch, useTheme } from "react-native-paper";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./Styles";
import { ICustomDrawerProps, INavigate } from "../../../types";
import { DrawerActions, useNavigation } from "@react-navigation/native";

export function CustomDrawer({ state, toggleTheme, isDarkTheme }: ICustomDrawerProps) {
    const [userData, setUserData] = React.useState({
        name: '',
        email: '',
    });
    const { colors } = useTheme();
    const navigation = useNavigation();

    React.useEffect(() => {
        getUserData();
    })
    
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

    const removeUserData = () => {
        try {
            AsyncStorage.removeItem('currentUser')
                .then(result => {
                    console.log('user removed');
                })
        } catch (error) {
            console.log(error)
        }
    }

    const onHandleSignOut = () => {
        removeUserData();
        navigation.dispatch(DrawerActions.closeDrawer())
        signOut(auth)
    }

    return (
        <View style={styles.drawerContent}>
            <DrawerContentScrollView {...state}>
                <View style={styles.drawerContent}>
                    <View style={{ ...styles.userInfoSection, borderBottomColor: `${colors.text}`, }}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Text
                            style= {{backgroundColor: `${colors.surface}`}}
                                label={userData?.name[0]?.toUpperCase()}
                                size={50}
                            />
                            <View style={{ marginLeft: 15 }}>
                                <Title style={{ color: `${colors.text}` }}>{userData?.name}</Title>
                                <Caption style={{ color: `${colors.text}` }}>{userData?.email}</Caption>
                            </View>
                        </View>
                    </View>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section>
                        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <MaterialCommunityIcons name={'brightness-5'} size={30} color={isDarkTheme ? 'black' : 'white'} /><Switch value={isDarkTheme} onValueChange={() => toggleTheme()} /><MaterialCommunityIcons name={'brightness-2'} size={30} color={isDarkTheme ? 'white' : 'black'} />
                        </View>
                    </Drawer.Section>
            <Drawer.Section style={{ ...styles.signout, backgroundColor: `${colors.surface}20`, }}>
                <DrawerItem
                    icon={() => (
                        <MaterialCommunityIcons name='logout-variant'
                            color={`${colors.text}`}
                            size={25}
                        />
                    )}
                    label='Sign Out'
                    labelStyle={{ color: `${colors.text}` }}
                    onPress={() => onHandleSignOut()}
                />
            </Drawer.Section>
        </View>
    )
}