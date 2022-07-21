import { useNavigation } from '@react-navigation/native'
import { collection, updateDoc, doc } from 'firebase/firestore'
import * as React from 'react'
import { View, TextInput, Button } from 'react-native'
import { AuthUserContext } from '../context/authUserContext'
import { INavigate } from '../../types'
import { db } from '../firebase/config'

export default function UpdateNote({ id, title, description, date }: any) {
    const navigation = useNavigation<INavigate>()
    const { user }: any = React.useContext(AuthUserContext);
    const [info, setInfo] = React.useState({
        title: title,
        description: description,
        date: date,
    })

    const onHandleUpdateNote = () => {
        const colRef = collection(db, `users/${user.uid}/Notas`);
        updateDoc(doc(colRef, id), info);
        navigation.goBack();
    }

    return (
        <View>
            <TextInput
                onChangeText={(text) => setInfo({ ...info, title: text })}
                placeholder='Title'
                keyboardType='ascii-capable'
                value={info.title} />
            <TextInput
                onChangeText={(text) => setInfo({ ...info, description: text })}
                placeholder='description'
                keyboardType='ascii-capable'
                value={info.description} />
            <Button title='Update' onPress={() => onHandleUpdateNote()} />
        </View>
    )
}