import { useNavigation } from '@react-navigation/native';
import { collection, deleteDoc, doc, onSnapshot, getDoc, updateDoc } from 'firebase/firestore';
import * as React from 'react'
import { View } from 'react-native'
import { INavigate } from '../../types'
import { db } from '../firebase/config';
import { AuthUserContext } from '../context/authUserContext';
import { Button, Card, Checkbox, FAB, Portal, Provider, Text, TextInput } from 'react-native-paper';

export default function NoteDetail({ route }: any) {
    const { user }: any = React.useContext(AuthUserContext);
    const [update, setUpdate] = React.useState(false);
    const [updateNote, setUpdateNote] = React.useState({
        id: route.params.id,
        title: route.params.title,
        date: route.params.date,
        description: route.params.description,
        color: route.params.color
    })
    const [note, setNote] = React.useState({
        id: route.params.id,
        title: route.params.title,
        date: route.params.date,
        description: route.params.description,
        color: route.params.color
    })
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }: any) => setState({ open });

    const { open } = state;
    const [checked, setChecked] = React.useState('#E8A43E');

    const onHandleUpdateNote = () => {
        const colRef = collection(db, `users/${user.uid}/Notas`);
        updateDoc(doc(colRef, route.params.id), updateNote);
        setNote(updateNote);
        setUpdate(false);
    }

    React.useEffect(() => {
        const colRef = doc(db, `users/${user.uid}/Notas/${route.params.id}`);
        getDoc(colRef).then((note: any) => {
            setNote({
                id: note.id,
                title: note.data().title,
                date: note.data().date,
                description: note.data().description,
                color: note.data().color
            })
        })
    }, [])
    if (update) {
        return (
            <View style={{ height: '100%', backgroundColor: `${checked}` }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF80' }}>
                    <Checkbox
                        uncheckedColor='#E8A43E'
                        color='#E8A43E'
                        status={checked === '#E8A43E' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked('#E8A43E');
                            setUpdateNote({ ...updateNote, color: '#E8A43E' })
                        }}
                    />
                    <Checkbox
                        uncheckedColor='#293A70'
                        color='#293A70'
                        status={checked === '#293A70' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked('#293A70');
                            setUpdateNote({ ...updateNote, color: '#293A70' })
                        }}
                    />
                    <Checkbox
                        uncheckedColor='#D534CF'
                        color='#D534CF'
                        status={checked === '#D534CF' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked('#D534CF');
                            setUpdateNote({ ...updateNote, color: '#D534CF' })
                        }}
                    />
                    <Checkbox
                        uncheckedColor='#DE6548'
                        color='#DE6548'
                        status={checked === '#DE6548' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked('#DE6548');
                            setUpdateNote({ ...updateNote, color: '#DE6548' })
                        }}
                    />
                    <Button onPress={() => onHandleUpdateNote()}>Update</Button>
                </View>
                <TextInput
                    mode='outlined'
                    style={{ backgroundColor: `${checked}`, fontSize: 25 }}
                    outlineColor={checked}
                    activeOutlineColor={checked}
                    onChangeText={(text) => setUpdateNote({ ...updateNote, title: text })}
                    placeholder='Title'
                    keyboardType='ascii-capable'
                    value={updateNote.title} />
                <Text style={{ fontSize: 12 }}>{note.date}</Text>
                <TextInput
                    mode='outlined'
                    style={{ backgroundColor: `${checked}` }}
                    outlineColor={checked}
                    activeOutlineColor={checked}
                    numberOfLines={28}
                    multiline={true}
                    onChangeText={(text) => setUpdateNote({ ...updateNote, description: text })}
                    placeholder='description'
                    keyboardType='ascii-capable'
                    value={updateNote.description} />
            </View>
        )
    }
    else {
        return (
            <View style={{ height: '100%', backgroundColor: `${note.color}` }}>
                <Text style={{ fontSize: 25 }}>{note.title}</Text>
                <Text style={{ fontSize: 12 }}>{note.date}</Text>
                <Text>{note.description}</Text>
                <Provider>
                    <Portal>
                        <FAB.Group
                            visible={true}
                            open={open}
                            icon={open ? 'chevron-down' : 'chevron-up'}
                            actions={[
                                {
                                    icon: 'pencil',
                                    label: 'edit',
                                    onPress: () => setUpdate(true)
                                },
                                {
                                    icon: 'trash-can',
                                    label: 'delete',
                                    onPress: () => route.params.onHandleDeleteNote(false),
                                },
                            ]}
                            onStateChange={onStateChange}
                        />
                    </Portal>
                </Provider>
            </View>
        )
    }
}