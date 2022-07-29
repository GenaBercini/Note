import { useNavigation } from '@react-navigation/native'
import { addDoc, collection } from 'firebase/firestore'
import * as React from 'react'
import { View } from 'react-native'
import { TextInput, RadioButton, IconButton, useTheme } from 'react-native-paper'
import { AuthUserContext } from '../../context/authUserContext';
import { style } from './Styles'
import { db } from '../../firebase/config'
import ColorOptions from '../../components/ColorOptions/ColorOptions'

export default function AddNote() {
    const navigation = useNavigation()
    const { user } = React.useContext(AuthUserContext);
    const [noteData, setNoteData] = React.useState({
        title: '',
        description: '',
        date: Date().slice(0, 15),
        color: '#FDD649'
    })

    const onHandleAddNote = () => {
        addDoc(collection(db, `users/${user?.uid}/Notas`), noteData);
        navigation.goBack();
    }

    return (
        <View style={{ ...style.container, backgroundColor: `${noteData.color}` }}>
            <ColorOptions onHandleAction={onHandleAddNote} noteData={noteData} setNoteData={setNoteData}/>
            <TextInput
                style={{ ...style.title, backgroundColor: `${noteData.color}` }}
                mode='outlined'
                outlineColor={noteData.color}
                activeOutlineColor={noteData.color}
                onChangeText={(text) => setNoteData({ ...noteData, title: text })}
                placeholder='Title'
                placeholderTextColor='black'
                theme={{ colors: { text: '#000000' } }}
                keyboardType='ascii-capable'
                value={noteData.title} />
            <TextInput
                style={{ backgroundColor: `${noteData.color}` }}
                mode='outlined'
                outlineColor={noteData.color}
                activeOutlineColor={noteData.color}
                numberOfLines={29}
                multiline={true}
                placeholderTextColor='black'
                theme={{ colors: { text: '#000000' } }}
                onChangeText={(text) => setNoteData({ ...noteData, description: text })}
                placeholder='description'
                keyboardType='ascii-capable'
                value={noteData.description} />
        </View>
    )
}