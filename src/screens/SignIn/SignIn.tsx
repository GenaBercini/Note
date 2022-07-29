import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Button, Card, HelperText, Text, TextInput } from 'react-native-paper';
import { INavigate } from '../../../types';
import { login } from '../../firebase/auth';
import { style } from './Styles';
const image = require('../../../assets/Login.jpg')


export default function SignIn() {
    const navigation = useNavigation<INavigate>();
    const [userData, setUserData] = React.useState({
        email: "",
        password: ""
    })

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
                    onChangeText={(email) => setUserData({ ...userData, email: email })}
                    placeholder='Email' />
                <HelperText type="error" visible={true}>
                    Email address is invalid!
                </HelperText>
                <TextInput
                    mode='outlined'
                    style={style.input}
                    keyboardType='email-address'
                    textContentType='password'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    value={userData.password}
                    onChangeText={(password) => setUserData({ ...userData, password: password })}
                    placeholder='Password'
                    right={<TextInput.Icon name="eye" />} />
                <HelperText type="error" visible={true}>
                    Email address is invalid!
                </HelperText>
                <Button style={style.button} color='white' onPress={() => login(userData.email, userData.password)}>Sign In</Button>
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