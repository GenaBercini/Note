import { useNavigation } from '@react-navigation/native'
import { addDoc, collection } from 'firebase/firestore'
import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Checkbox, TextInput, Button, Text } from 'react-native-paper'
import { AuthUserContext } from '../context/authUserContext'
import { db } from '../firebase/config'

export default function AddNote() {
    const navigation = useNavigation()
    const { user }: any = React.useContext(AuthUserContext);
    const [info, setInfo] = React.useState({
        title: '',
        description: '',
        date: Date().slice(0, 15),
        color: '#E8A43E'
    })

    const onHandleAddNote = () => {
        addDoc(collection(db, `users/${user.uid}/Notas`), info);
        navigation.goBack();
    }

    const [checked, setChecked] = React.useState('#E8A43E');

    return (
        <View style={{ height: '100%', backgroundColor: `${checked}` }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF80' }}>
                <Checkbox
                    uncheckedColor='#E8A43E'
                    color='#E8A43E'
                    status={checked === '#E8A43E' ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked('#E8A43E');
                        setInfo({ ...info, color: '#E8A43E' })
                    }}
                />
                <Checkbox
                    uncheckedColor='#293A70'
                    color='#293A70'
                    status={checked === '#293A70' ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked('#293A70');
                        setInfo({ ...info, color: '#293A70' })
                    }}
                />
                <Checkbox
                    uncheckedColor='#D534CF'
                    color='#D534CF'
                    status={checked === '#D534CF' ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked('#D534CF');
                        setInfo({ ...info, color: '#D534CF' })
                    }}
                />
                <Checkbox
                    uncheckedColor='#DE6548'
                    color='#DE6548'
                    status={checked === '#DE6548' ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked('#DE6548');
                        setInfo({ ...info, color: '#DE6548' })
                    }}
                />
                <Button onPress={() => onHandleAddNote()}>Add Note</Button>
            </View>
            <TextInput
                style={{ backgroundColor: `${checked}`, fontSize: 25 }}
                mode='outlined'
                outlineColor={checked}
                activeOutlineColor={checked}
                onChangeText={(text) => setInfo({ ...info, title: text })}
                placeholder='Title'
                keyboardType='ascii-capable'
                value={info.title} />
            <TextInput
                style={{ backgroundColor: `${checked}` }}
                mode='outlined'
                outlineColor={checked}
                activeOutlineColor={checked}
                numberOfLines={29}
                multiline={true}
                onChangeText={(text) => setInfo({ ...info, description: text })}
                placeholder='description'
                keyboardType='ascii-capable'
                value={info.description} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        top: 80,
    }
})