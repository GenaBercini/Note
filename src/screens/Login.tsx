import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Text, TextInput, View, StyleSheet, ImageBackground, Button, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { INavigate } from '../../types';
import { onHandleLogin } from '../firebase/auth';


export default function Login() {
    const navigation = useNavigation<INavigate>();
    const [userData, setUserData] = React.useState({
        email: "",
        password: ""
    })

    return (
            <View style={style.whiteSheet}>
                <SafeAreaView style={style.form}>
                    <Text>Login</Text>
                    <TextInput
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoCapitalize='none'
                        autoFocus={true}
                        style={style.input}
                        value={userData.email}
                        onChangeText={(email) => setUserData({ ...userData, email: email })}
                        placeholder='Email' />
                    <TextInput
                        style={style.input}
                        autoCorrect={true}
                        keyboardType='email-address'
                        textContentType='password'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={userData.password}
                        onChangeText={(password) => setUserData({ ...userData, password: password })}
                        placeholder='Password' />
                    <View>
                        <Button title='Login' onPress={() => onHandleLogin(userData.email, userData.password)} />
                        <Text>Don't have an account ?</Text>
                        <Button title='Sign In' onPress={() => navigation.navigate('SignIn')} />
                    </View>
                </SafeAreaView>
            </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 100,
        position: 'absolute',
        top: 40,
        color: '#FFFFFF',
    },
    whiteSheet: {
        width: '100%',
        height: '65%',
        position: "absolute",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderBottomWidth: 0,
        borderColor: '#1CBAA4',
        bottom: 0
    },
    input: {
        backgroundColor: '#FBB03C',
        height: 58,
        marginBottom: 20,
        padding: 12,
        borderRadius: 10
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30
    }
})