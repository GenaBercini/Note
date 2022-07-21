import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import { INavigate } from '../../types';
import { AuthUserContext } from '../context/authUserContext';
import { INotesProps } from '../../types';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export function Note({id, description, date, title } : INotesProps) {
    const { user }: any = React.useContext(AuthUserContext);
    const navigation = useNavigation<INavigate>();
    
    const onHandleDeleteNote = (inHome: boolean) => {
        const colRef = collection(db, `users/${user.uid}/Notas`);
        deleteDoc(doc(colRef, id));
        !inHome && navigation.goBack();
    }

    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('NoteDetail', {
                id: id,
                title: title,
                date: date,
                description: description,
                onHandleDeleteNote: onHandleDeleteNote
            })}>
            <Text>{title}</Text>
            <Text>{date}</Text>
            <Text>{description}</Text>
            <Button title='Delete' onPress={() => onHandleDeleteNote(true)}/>
            </TouchableOpacity>
        </View>
    )
}