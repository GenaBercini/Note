import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity } from 'react-native'
import { INavigate } from '../../types';
import { AuthUserContext } from '../context/authUserContext';
import { INotesProps } from '../../types';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Card, Paragraph, Title, Button, FAB, Avatar } from 'react-native-paper';

export function Note({ id, description, date, title }: INotesProps) {
    const { user }: any = React.useContext(AuthUserContext);
    const navigation = useNavigation<INavigate>();

    const onHandleDeleteNote = (inHome: boolean) => {
        const colRef = collection(db, `users/${user.uid}/Notas`);
        !inHome && navigation.goBack();
        deleteDoc(doc(colRef, id));
    }

    const rightContent = (props: any) => {
        return (
            <FAB {...props}
                icon='trash-can'
                small
                onPress={() => onHandleDeleteNote(true)}
                style={{ backgroundColor: '#7462D2', marginRight: 5, marginBottom: 20 }} />
        )
    }

    return (
        <View style={{ marginBottom: 10 }}>
            <Card onPress={() => navigation.navigate('NoteDetail', {
                id: id,
                title: title,
                date: date,
                description: description,
                onHandleDeleteNote: onHandleDeleteNote
            })}
                style={{ backgroundColor: '#7462D2' }}>
                <Card.Title titleStyle={{ color: 'white' }} title={title} subtitle={date} right={rightContent} />
                <Card.Content>
                    <Paragraph>{description}</Paragraph>
                </Card.Content>
            </Card>
        </View>
    )
}