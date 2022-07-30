import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { View, Alert } from 'react-native'
import { TextInput } from 'react-native-paper'
import { AuthUserContext } from '../../context/authUserContext';
import { style } from './Styles'
import ColorOptions from '../../components/ColorOptions/ColorOptions'
import { addNote } from '../../firebase/firestore'

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
        if(noteData.title.length > 0 && noteData.date.length > 0) {
            addNote(noteData, user?.uid);
            navigation.goBack();
        }
        else {
            Alert.alert('Ups..', 'The note should have a title and a description')
        }
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
                placeholderTextColor='#00000090'
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
                placeholderTextColor='#00000090'
                theme={{ colors: { text: '#000000' } }}
                onChangeText={(text) => setNoteData({ ...noteData, description: text })}
                placeholder='Description'
                keyboardType='ascii-capable'
                value={noteData.description} />
        </View>
    )
}