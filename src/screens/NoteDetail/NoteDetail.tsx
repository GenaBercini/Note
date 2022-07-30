import * as React from 'react'
import { View } from 'react-native'
import { FAB, Portal, Provider, Text, TextInput, useTheme } from 'react-native-paper';
import { style } from './Styles';
import { AuthUserContext } from '../../context/authUserContext';
import ColorOptions from '../../components/ColorOptions/ColorOptions';
import { IRouteProps } from '../../../types';
import { getNote, updateNote } from '../../firebase/firestore';

export default function NoteDetail({ route }: IRouteProps) {
    const { id, title, description, color, date, onHandleDeleteNote} = route.params
    const { user } = React.useContext(AuthUserContext);
    const {colors} = useTheme();
    const [update, setUpdate] = React.useState(false);
    const [updateInfo, setUpdateInfo] = React.useState({
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
    
    const onHandleupdateInfo = () => {
        updateNote(updateInfo, id, user?.uid)
        setNote(updateInfo);
        setUpdate(false);
    }

    React.useEffect(() => {
        getNote(id, user?.uid).then( noteinfo => {
            setNote(noteinfo);
        })
    }, [])

    if (update) {
        return (
            <View style={{...style.container, backgroundColor: `${updateInfo.color}` }}>
                <ColorOptions onHandleAction={onHandleupdateInfo} noteData={updateInfo} setNoteData={setUpdateInfo}/>
                <TextInput
                    mode='outlined'
                    style={{ ...style.title, backgroundColor: `${updateInfo.color}` }}
                    outlineColor={updateInfo.color}
                    activeOutlineColor={updateInfo.color}
                    onChangeText={(text) => setUpdateInfo({ ...updateInfo, title: text })}
                    placeholder='Title'
                    placeholderTextColor='#00000080'
                    theme={{colors: {text: '#000000'}}}
                    keyboardType='ascii-capable'
                    value={updateInfo.title} />
                <Text style={{...style.dateText, marginLeft: 15}}>{note.date}</Text>
                <TextInput
                    mode='outlined'
                    style={{color: 'black', backgroundColor: `${updateInfo.color}` }}
                    outlineColor={updateInfo.color}
                    activeOutlineColor={updateInfo.color}
                    numberOfLines={28}
                    multiline={true}
                    theme={{colors: {text: '#000000'}}}
                    placeholderTextColor='#00000080'
                    onChangeText={(text) => setUpdateInfo({ ...updateInfo, description: text })}
                    placeholder='description'
                    keyboardType='ascii-capable'
                    value={updateInfo.description} />
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