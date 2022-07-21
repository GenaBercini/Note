import { useNavigation } from '@react-navigation/native'
import { addDoc, collection } from 'firebase/firestore'
import * as React from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import { AuthUserContext } from '../context/authUserContext'
import { db } from '../firebase/config'

export default function AddNote() {
    const navigation = useNavigation()
    const { user }: any = React.useContext(AuthUserContext);
    const [info, setInfo] = React.useState({
        title: '',
        description: '',
        date: Date().slice(0, 15),
        delete: false,
    })

    const onHandleAddNote = () => {
        addDoc(collection(db, `users/${user.uid}/Notas`), {
        title: info.title,
        description: info.description,
        date: info.date
      });
      navigation.goBack();
    }

    return (
        <View  style={style.container}>
            <TextInput
                onChangeText={(text) => setInfo({ ...info, title: text })}
                placeholder='Title'
                keyboardType='ascii-capable'></TextInput>
            <TextInput
                onChangeText={(text) => setInfo({ ...info, description: text })}
                placeholder='description'
                keyboardType='ascii-capable'></TextInput>
            <Button title='Add' onPress={() => onHandleAddNote()} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        top: 80,
    }
})