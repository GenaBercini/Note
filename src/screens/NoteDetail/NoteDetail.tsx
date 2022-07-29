import { collection,doc, getDoc, updateDoc } from 'firebase/firestore';
import * as React from 'react'
import { View } from 'react-native'
import { db } from '../../firebase/config';
import { FAB, IconButton, Portal, Provider, RadioButton, Text, TextInput, useTheme } from 'react-native-paper';
import { style } from './Styles';
import { AuthUserContext } from '../../context/authUserContext';
import ColorOptions from '../../components/ColorOptions/ColorOptions';
import { IRouteProps } from '../../../types';

export default function NoteDetail({ route }: IRouteProps) {
    const { id, title, description, color, date, onHandleDeleteNote} = route.params
    const { user } = React.useContext(AuthUserContext);
    const {colors} = useTheme();
    const [update, setUpdate] = React.useState(false);
    const [updateNote, setUpdateNote] = React.useState({
        title: title,
        date: `Edit in ${Date().slice(0, 15)}`,
        description: description,
        color: color
    })
    const [note, setNote] = React.useState({
        title: title,
        date: date,
        description: description,
        color: color
    })
    const [open, setOpen] = React.useState(false);
    
    const onHandleUpdateNote = () => {
        const colRef = collection(db, `users/${user?.uid}/Notas`);
        updateDoc(doc(colRef, id), updateNote);
        setNote(updateNote);
        setUpdate(false);
    }

    React.useEffect(() => {
        const colRef = doc(db, `users/${user?.uid}/Notas/${id}`);
        getDoc(colRef).then((note: any) => {
            setNote({
                title: note.data().title,
                date: note.data().date,
                description: note.data().description,
                color: note.data().color
            })
        })
    }, [])

    if (update) {
        return (
            <View style={{...style.container, backgroundColor: `${updateNote.color}` }}>
                <ColorOptions onHandleAction={onHandleUpdateNote} noteData={updateNote} setNoteData={setUpdateNote}/>
                <TextInput
                    mode='outlined'
                    style={{ ...style.title, backgroundColor: `${updateNote.color}` }}
                    outlineColor={updateNote.color}
                    activeOutlineColor={updateNote.color}
                    onChangeText={(text) => setUpdateNote({ ...updateNote, title: text })}
                    placeholder='Title'
                    placeholderTextColor='black'
                    theme={{colors: {text: '#000000'}}}
                    keyboardType='ascii-capable'
                    value={updateNote.title} />
                <Text style={{...style.dateText, marginLeft: 15}}>{note.date}</Text>
                <TextInput
                    mode='outlined'
                    style={{color: 'black', backgroundColor: `${updateNote.color}` }}
                    outlineColor={updateNote.color}
                    activeOutlineColor={updateNote.color}
                    numberOfLines={28}
                    multiline={true}
                    theme={{colors: {text: '#000000'}}}
                    placeholderTextColor='black'
                    onChangeText={(text) => setUpdateNote({ ...updateNote, description: text })}
                    placeholder='description'
                    keyboardType='ascii-capable'
                    value={updateNote.description} />
            </View>
        )
    }
    else {
        return (
            <View style={{...style.container, backgroundColor: `${note.color}` }} >
                <View style={{ ...style.detailContainer, backgroundColor: `${note.color}` }}>
                    <Text style={style.title}>{note.title}</Text>
                    <Text style={style.dateText}>{note.date}</Text>
                    <Text style={style.description}>{note.description}</Text>
                </View>
                <Provider>
                    <Portal>
                        <FAB.Group
                            visible={true}
                            open={open}
                            color={`${colors.surface}`}
                            fabStyle={{backgroundColor: `${colors.primary}`}}
                            icon={open ? 'chevron-down' : 'chevron-up'}
                            actions={[
                                {
                                    icon: 'pencil',
                                    label: 'edit',
                                    color: `${colors.surface}`,
                                    labelTextColor: `${colors.surface}`,
                                    style: {backgroundColor: `${colors.primary}`},
                                    labelStyle: {backgroundColor: `${colors.primary}`},
                                    onPress: () => setUpdate(true)
                                },
                                {
                                    icon: 'trash-can',
                                    label: 'delete',
                                    color: `${colors.surface}`,
                                    labelTextColor: `${colors.surface}`,
                                    style: {backgroundColor: `${colors.primary}`},
                                    labelStyle: {backgroundColor: `${colors.primary}`},
                                    onPress: () => onHandleDeleteNote(false),
                                },
                            ]}
                            onStateChange={() => setOpen(!open)}
                        />
                    </Portal>
                </Provider>
            </View>
        )
    }
}