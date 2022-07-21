import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import * as React from 'react'
import { View, Text, Button } from 'react-native'
import { INavigate } from '../../types'
import { db } from '../firebase/config';
import { AuthUserContext } from '../context/authUserContext';

export default function NoteDetail({ route }: any) {
    const { user }: any = React.useContext(AuthUserContext);
    const navigation = useNavigation<INavigate>();
    const [note, setNote] = React.useState({
        id: route.params.id,
        title: route.params.title,
        date: route.params.date,
        description: route.params.description
    })
    React.useEffect(() => {
        const colRef = doc(db, `users/${user.uid}/Notas/${route.params.id}`);
        onSnapshot(colRef, (snapshot: any) => {
            setNote({
                id: snapshot.id,
                title: snapshot.data().title,
                date: snapshot.data().date,
                description: snapshot.data().description
            })
        })
    }, [])

    return (
        <View>
            <Text>{note.title}</Text>
            <Text>{note.date}</Text>
            <Text>{note.description}</Text>
            <Button title='Update' onPress={() => navigation.navigate('FormNote', {
                update: true,
                id: note.id,
                title: note.title,
                date: note.date,
                description: note.description,
                onHandleDeleteNote: route.params.onHandleDeleteNote
            })} />
            <Button title='Delete' onPress={() => route.params.onHandleDeleteNote(false)} />
        </View>
    )
}