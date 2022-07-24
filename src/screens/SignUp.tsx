import { useNavigation } from '@react-navigation/native';
import * as React from 'react'
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { TextInput, Text, HelperText, Button } from 'react-native-paper';
import { INavigate } from '../../types';
import { onHandleSignUp } from '../firebase/auth';
const image = require('../../assets/Login.jpg')


export default function SignUp() {
    const navigation = useNavigation<INavigate>();
    const [userData, setUserData] = React.useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    return (
        <View style={style.container}>
            <Image source={image} style={style.image} />
            <SafeAreaView style={style.form}>
                <Text style={style.title}>Sign Up</Text>
                <TextInput
                    mode='outlined'
                    keyboardType='ascii-capable'
                    textContentType='givenName'
                    autoCapitalize='words'
                    style={style.input}
                    value={userData.firstName}
                    onChangeText={(firstName) => setUserData({ ...userData, firstName: firstName })}
                    placeholder='First Name' />
                <HelperText type="error" visible={true}>
                    Email address is invalid!
                </HelperText>
                <TextInput
                    mode='outlined'
                    keyboardType='ascii-capable'
                    textContentType='givenName'
                    autoCapitalize='words'
                    style={style.input}
                    value={userData.lastName}
                    onChangeText={(lastName) => setUserData({ ...userData, lastName: lastName })}
                    placeholder='Last Name' />
                <HelperText type="error" visible={true}>
                    Email address is invalid!
                </HelperText>
                <TextInput
                    mode='outlined'
                    keyboardType='name-phone-pad'
                    textContentType='telephoneNumber'
                    style={style.input}
                    value={userData.phone}
                    onChangeText={(phone) => setUserData({ ...userData, phone: phone })}
                    placeholder='Phone Number' />
                <HelperText type="error" visible={true}>
                    Email address is invalid!
                </HelperText>
                <TextInput
                    mode='outlined'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoCapitalize='none'
                    style={style.input}
                    value={userData.email}
                    onChangeText={(email) => setUserData({ ...userData, email: email })}
                    placeholder='Email' />
                <HelperText type="error" visible={true}>
                    Email address is invalid!
                </HelperText>
                <TextInput
                    mode='outlined'
                    style={style.input}
                    autoCorrect={true}
                    keyboardType='ascii-capable'
                    textContentType='password'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    value={userData.password}
                    onChangeText={(password) => setUserData({ ...userData, password: password })}
                    placeholder='Password' />
                <HelperText type="error" visible={true}>
                    Email address is invalid!
                </HelperText>
                <TextInput
                    mode='outlined'
                    style={style.input}
                    autoCorrect={true}
                    keyboardType='ascii-capable'
                    textContentType='password'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    value={userData.confirmPassword}
                    onChangeText={(confirmPassword) => setUserData({ ...userData, confirmPassword: confirmPassword })}
                    placeholder='Confirm Password' />
                <HelperText type="error" visible={true}>
                    Email address is invalid!
                </HelperText>
                <Button style={style.button} onPress={() => onHandleSignUp(userData)}>Sign Up</Button>
                <View style={{ flexDirection: 'row', justifyContent: 'center', top: 20 }}>
                    <Text style={style.text}>Do you have an account ?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={{ color: '#7462D2', fontSize: 15 }}>Sign In</Text>
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
        height: '20%',
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
        color: '#FFFFFF',
        height: 50
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