import { collection,doc, getDoc, updateDoc } from 'firebase/firestore';
import * as React from 'react'
import { View } from 'react-native'
import { db } from '../../firebase/config';
import { AuthUserContext } from '../../context/authUserContext';
import { FAB, IconButton, Portal, Provider, RadioButton, Text, TextInput } from 'react-native-paper';
import { style } from './Styles';

export default function NoteDetail({ route }: any) {
    const { id, title, description, color, date, onHandleDeleteNote} = route.params
    const { user }: any = React.useContext(AuthUserContext);
    const [update, setUpdate] = React.useState(false);
    const [updateNote, setUpdateNote] = React.useState({
        id: id,
        title: title,
        date: `Edit in ${Date().slice(0, 15)}`,
        description: description,
        color: color
    })
    const [note, setNote] = React.useState({
        id: id,
        title: title,
        date: date,
        description: description,
        color: color
    })
    const [open, setOpen] = React.useState(false);
    
    const onHandleUpdateNote = () => {
        const colRef = collection(db, `users/${user.uid}/Notas`);
        updateDoc(doc(colRef, id), updateNote);
        setNote(updateNote);
        setUpdate(false);
    }

    React.useEffect(() => {
        const colRef = doc(db, `users/${user.uid}/Notas/${id}`);
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
            <View style={{...style.container, backgroundColor: `${updateNote.color}` }}>
                <View style={style.optionsContainer}>
                    <View style={style.colorsOptions}>
                        <RadioButton
                            value='#FFFEFF'
                            uncheckedColor='#FFFEFF'
                            color='#FFFEFF'
                            status={updateNote.color === '#FFFEFF' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setUpdateNote({ ...updateNote, color: '#FFFEFF' })
                            }}
                        />
                        <RadioButton
                            value='#FDD649'
                            uncheckedColor='#FDD649'
                            color='#FDD649'
                            status={updateNote.color === '#FDD649' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setUpdateNote({ ...updateNote, color: '#FDD649' })
                            }}
                        />
                        <RadioButton
                            value='#AF3875'
                            uncheckedColor='#AF3875'
                            color='#AF3875'
                            status={updateNote.color === '#AF3875' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setUpdateNote({ ...updateNote, color: '#AF3875' })
                            }}
                        />
                        <RadioButton
                            value='#FF744B'
                            uncheckedColor='#FF744B'
                            color='#FF744B'
                            status={updateNote.color === '#FF744B' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setUpdateNote({ ...updateNote, color: '#FF744B' })
                            }}
                        />
                        <RadioButton
                            value='#17E0AC'
                            uncheckedColor='#17E0AC'
                            color='#17E0AC'
                            status={updateNote.color === '#17E0AC' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setUpdateNote({ ...updateNote, color: '#17E0AC' })
                            }}
                        />
                        <RadioButton
                            value='#2E68FF'
                            uncheckedColor='#2E68FF'
                            color='#2E68FF'
                            status={updateNote.color === '#2E68FF' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setUpdateNote({ ...updateNote, color: '#2E68FF' })
                            }}
                        />
                    </View>
                    <View style={style.updateButtons}>
                    <IconButton
                    onPress={() => setUpdate(false)}
                    icon={"close-thick"}
                    size={25}
                    color='white'
                    />
                    <IconButton
                    onPress={() => onHandleUpdateNote()}
                    icon={"check-bold"}
                    size={25}
                    color='white'
                    />
                    </View>
                </View>
                <TextInput
                    mode='outlined'
                    style={{ ...style.title, backgroundColor: `${updateNote.color}` }}
                    outlineColor={updateNote.color}
                    activeOutlineColor={updateNote.color}
                    onChangeText={(text) => setUpdateNote({ ...updateNote, title: text })}
                    placeholder='Title'
                    keyboardType='ascii-capable'
                    value={updateNote.title} />
                <Text style={style.dateText}>{note.date}</Text>
                <TextInput
                    mode='outlined'
                    style={{ backgroundColor: `${updateNote.color}` }}
                    outlineColor={updateNote.color}
                    activeOutlineColor={updateNote.color}
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
            <View style={{...style.container, backgroundColor: `${note.color}` }} >
                <View style={{ ...style.detailContainer, backgroundColor: `${note.color}` }}>
                    <Text style={style.title}>{note.title}</Text>
                    <Text style={style.dateText}>{note.date}</Text>
                    <Text>{note.description}</Text>
                </View>
                <Provider>
                    <Portal>
                        <FAB.Group
                            visible={true}
                            open={open}
                            fabStyle={style.fabStyle}
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