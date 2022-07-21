import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { View, Text, Button, TouchableOpacity, FlatList } from 'react-native'
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { Note } from '../components/Note';
import { INavigate } from '../../types';
import { AuthUserContext } from '../context/authUserContext';
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';

export default function Home() {
    const { user }: any = React.useContext(AuthUserContext);
    const navigation = useNavigation<INavigate>();
    const [notas, setNotas] = React.useState<DocumentData | undefined | any>();
    React.useEffect(() => {
        const colRef = collection(db, `users/${user.uid}/Notas`);
        onSnapshot(colRef, (snapshot) => {
            let notes: any = []
            snapshot.docs.forEach(element => {
                let notesObj = {
                    id: element.id,
                    title: element.data().title,
                    description: element.data().description,
                    date: element.data().date
                }
                notes.push(notesObj);
            });
            setNotas(notes);
        })
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <Text>Home</Text>
            <Button title='LogOut' onPress={() => signOut(auth)} />
            <TouchableOpacity onPress={() => navigation.navigate('FormNote', {
                update: false
            })}>
                <Text>Add</Text>
            </TouchableOpacity>
            <FlatList
                data={notas}
                renderItem={({ item }) => (
                    <Note title={item.title} id={item.id} description={item.description} date={item.date} />
                )}
                keyExtractor={item => item.title}
            />
        </View>
    )
}