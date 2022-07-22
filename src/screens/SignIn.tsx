import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Text, TextInput, View, StyleSheet, ImageBackground, Button, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import { color } from 'react-native-reanimated';
import { INavigate } from '../../types';
import { onHandleLogin } from '../firebase/auth';
const image = require('../../assets/Login.jpg')


export default function SignIn() {
    const navigation = useNavigation<INavigate>();
    const [userData, setUserData] = React.useState({
        email: "",
        password: ""
    })

    return (
            <View style={style.container}>
                <Image source={image} style={style.image}/>
                <SafeAreaView style={style.form}>
                    <Text style={style.title}>Sign In</Text>
                    <TextInput
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoCapitalize='none'
                        style={style.input}
                        value={userData.email}
                        onChangeText={(email) => setUserData({ ...userData, email: email })}
                        placeholder='Email' />
                    <TextInput
                        style={style.input}
                        keyboardType='email-address'
                        textContentType='password'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={userData.password}
                        onChangeText={(password) => setUserData({ ...userData, password: password })}
                        placeholder='Password' />
                        <TouchableOpacity onPress={() => onHandleLogin(userData.email, userData.password)}>
                            <Text style={style.button}>Sign In</Text>
                        </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'center', top: 20}}>
                        <Text style={style.text}>Don't have an account ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{color: '#7462D2', fontSize: 15}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191F2F',
    },
    image: {
        width: '100%',
        height: '40%',
    },
    title: {
        fontSize: 40,
        color: '#FFFFFF',
        textAlign: 'center',
        bottom: 20
    },
    text: {
        color: '#FFFFFF',
        marginRight: 5
    },
    input: {
        backgroundColor: '#293A70',
        height: 50,
        marginBottom: 20,
        padding: 12,
        borderRadius: 10,
        color: '#FFFFFF'
    },
    button: {
        backgroundColor: '#7462D2',
        borderRadius: 10,
        textAlign: 'center',
        padding: 5,
        fontSize: 20
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30
    }
})