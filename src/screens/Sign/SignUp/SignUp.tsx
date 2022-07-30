import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, Image, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Text, HelperText, Button } from 'react-native-paper';
import { INavigate } from '../../../../types';
import { signUp } from '../../../firebase/auth';
import { style } from './Styles';
import { validate } from '../validate';
const image = require('../../../../assets/Login.jpg')

export default function SignUp() {
    const navigation = useNavigation<INavigate>();
    const [visiblePassword, setVisiblePassword] = useState(true);
    const [disableButton, setDisableButton] = useState(true);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState({
        name: true,
        email: true,
        password: true,
        confirmPassword: true
    })

    useEffect(() => {
        setError(validate(userData));
        setDisableButton(!error.name &&
            !error.email &&
            !error.password &&
            !error.confirmPassword)
    }, [userData])

    const onHandleChange = (input: string, value: string) => {
        setUserData({
            ...userData,
            [input]: value
        });
    }

    const onHandleSignUp = () => {
        if (userData.name.length > 0 &&
            userData.email.length > 0 &&
            userData.password.length > 0 &&
            userData.confirmPassword.length > 0 &&
            !error.name &&
            !error.email &&
            !error.password &&
            !error.confirmPassword) {
            signUp(userData)
        }
        else {
            Alert.alert("Ups..", "There was a problem with the information entered")
        }
    }

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
                    value={userData.name}
                    onChangeText={(name) => onHandleChange('name', name)}
                    placeholder='Name' />
                <HelperText type="error" visible={error.name}>
                    Existing or invalid Name
                </HelperText>
                <TextInput
                    mode='outlined'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoCapitalize='none'
                    style={style.input}
                    value={userData.email}
                    onChangeText={(email) => onHandleChange('email', email)}
                    placeholder='Email' />
                <HelperText type="error" visible={error.email}>
                    Existing or invalid Email
                </HelperText>
                <TextInput
                    mode='outlined'
                    style={style.input}
                    autoCorrect={true}
                    keyboardType='ascii-capable'
                    textContentType='password'
                    autoCapitalize='none'
                    secureTextEntry={visiblePassword}
                    value={userData.password}
                    onChangeText={(password) => onHandleChange('password', password)}
                    placeholder='Password'
                    right={<TextInput.Icon name="eye" onPress={() => setVisiblePassword(!visiblePassword)} />} />
                <HelperText type="error" visible={error.password}>
                    Invalid Password
                </HelperText>
                <TextInput
                    mode='outlined'
                    style={style.input}
                    autoCorrect={true}
                    keyboardType='ascii-capable'
                    textContentType='password'
                    autoCapitalize='none'
                    secureTextEntry={visiblePassword}
                    onChangeText={(confirmPassword) => onHandleChange('confirmPassword', confirmPassword)}
                    placeholder='Confirm Password'
                    right={<TextInput.Icon name="eye" onPress={() => setVisiblePassword(!visiblePassword)} />} />
                <HelperText type="error" visible={error.confirmPassword}>
                    Existing or invalid Password
                </HelperText>
                <Button style={style.button} disabled={disableButton} onPress={() => onHandleSignUp()}>Sign Up</Button>
                <View style={style.haveAccount}>
                    <Text style={style.haveAccountText}>Do you have an account ?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={style.haveAccountButton}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}