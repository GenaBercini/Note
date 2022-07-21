import * as React from 'react'
import { Text, TextInput, View, StyleSheet,Button, SafeAreaView } from 'react-native';
import { onHandleSignUp } from '../firebase/auth';


export default function Login() {
    const [userData, setUserData] = React.useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        image: "",
    })

    return (
            <View style={style.whiteSheet}>
                <SafeAreaView style={style.form}>
                    <Text>Sign Up</Text>
                    <TextInput
                        keyboardType='ascii-capable'
                        textContentType='givenName'
                        autoCapitalize='words'
                        autoFocus={true}
                        style={style.input}
                        value={userData.firstName}
                        onChangeText={(firstName) => setUserData({...userData, firstName: firstName})}
                        placeholder='First Name' />
                        <TextInput
                        keyboardType='ascii-capable'
                        textContentType='givenName'
                        autoCapitalize='words'
                        autoFocus={true}
                        style={style.input}
                        value={userData.lastName}
                        onChangeText={(lastName) => setUserData({...userData, lastName: lastName})}
                        placeholder='Last Name' />
                        <TextInput
                        keyboardType='name-phone-pad'
                        textContentType='telephoneNumber'
                        autoFocus={true}
                        style={style.input}
                        value={userData.phone}
                        onChangeText={(phone) => setUserData({...userData, phone: phone})}
                        placeholder='Phone Number' />
                    <TextInput
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoCapitalize='none'
                        autoFocus={true}
                        style={style.input}
                        value={userData.email}
                        onChangeText={(email) => setUserData({...userData, email: email})}
                        placeholder='Email' />
                    <TextInput
                        style={style.input}
                        autoCorrect={true}
                        keyboardType='ascii-capable'
                        textContentType='password'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={userData.password}
                        onChangeText={(password) => setUserData({...userData, password: password})}
                        placeholder='Password' />
                        <View>
                        <Button title='Sign in' onPress={() => onHandleSignUp(userData)}/>
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