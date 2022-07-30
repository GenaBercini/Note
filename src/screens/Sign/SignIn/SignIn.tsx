import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View, Alert } from 'react-native';
import { Button, Card, HelperText, Text, TextInput } from 'react-native-paper';
import { INavigate } from '../../../../types';
import { signIn } from '../../../firebase/auth';
import { style } from './Styles';
import { validate } from '../validate';
const image = require('../../../../assets/Login.jpg')

export default function SignIn() {
    const navigation = useNavigation<INavigate>();
    const [visiblePassword, setVisiblePassword] = useState(true);
    const [disableButton, setDisableButton] = useState(true);
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState({
        name: true,
        email: true,
        password: true,
        confirmPassword: true
    })

    useEffect(() => {
        setError(validate(userData))
        if (!error.email && !error.password) {
            setDisableButton(false);
        }
        else {
            setDisableButton(true)
        }
    }, [userData])

    const onHandleChange = (input: string, value: string) => {
        setUserData({
            ...userData,
            [input]: value
        });
    }

    const onHandleSignIn = () => {
        if (userData.email.length > 0 &&
            userData.password.length > 0 &&
            !error.email &&
            !error.password) {
                signIn(userData);
        }
        else {
            Alert.alert("Ups..", "There was a problem with the information entered")
        }
    }

    return (
        <View style={style.container}>
            <Card style={style.imageContainer}>
                <Card.Cover source={image} style={style.image} />
            </Card>
            <SafeAreaView style={style.form}>
                <Text style={style.title}>Sign In</Text>
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
                    Email address is invalid!
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
                <Button style={style.button} disabled={disableButton} color='white' onPress={() => onHandleSignIn()}>Sign In</Button>
                <View style={style.haveAccount}>
                    <Text style={style.haveAccountText}>Don't have an account ?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={style.haveAccountButton}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}