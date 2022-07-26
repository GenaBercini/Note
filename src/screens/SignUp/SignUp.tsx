import { useNavigation } from '@react-navigation/native';
import * as React from 'react'
import { View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { TextInput, Text, HelperText, Button } from 'react-native-paper';
import { INavigate } from '../../../types';
import { onHandleSignUp } from '../../firebase/auth';
import { style } from './Styles';
const image = require('../../../assets/Login.jpg')


export default function SignUp() {
    const navigation = useNavigation<INavigate>();
    const [userData, setUserData] = React.useState({
        name: "",
        phone: "",
        email: "",
        password: "",
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
                    value={userData.name}
                    onChangeText={(name) => setUserData({ ...userData, name: name })}
                    placeholder='First Name' />
                <HelperText type="error" visible={true}>
                    Existing or invalid Name
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
                Existing or invalid Phone Number
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
                Existing or invalid Email
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
                    Invalid Password
                </HelperText>
                <Button style={style.button} onPress={() => onHandleSignUp(userData)}>Sign Up</Button>
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