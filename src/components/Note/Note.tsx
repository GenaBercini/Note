import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View} from 'react-native'
import { INavigate } from '../../../types';
import { AuthUserContext } from '../../context/authUserContext';
import { INotesProps } from '../../../types';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Card, Paragraph, IconButton, useTheme } from 'react-native-paper';
import { style } from './Styles'

export function Note({ id, description, date, title, color }: INotesProps) {
    const { user }: any = React.useContext(AuthUserContext);
    const navigation = useNavigation<INavigate>();
    const { colors, dark } = useTheme();

    const onHandleDeleteNote = (inHome: boolean) => {
        const colRef = collection(db, `users/${user.uid}/Notas`);
        !inHome && navigation.goBack();
        deleteDoc(doc(colRef, id));
    }

    const rightContent = () => {
        return (
            <IconButton
                animated={true}
                style={style.deleteButton}
                icon="trash-can"
                color='white'
                size={25}
                onPress={() => onHandleDeleteNote(true)}
            />
        )
    }

    return (
        <View style={style.container}>
            <Card onPress={() => navigation.navigate('NoteDetail', {
                id: id,
                title: title,
                date: date,
                description: description,
                color: color,
                onHandleDeleteNote: onHandleDeleteNote
            })}
                style={{...style.card, backgroundColor: `${color}` }}>
                <Card.Title titleStyle={{color: `${colors.text}`, textShadowColor: `${dark ? '#000' : '#FFF' }`, textShadowOffset: { width: 0.5, height: 1 }, textShadowRadius: 10,}} title={title} subtitle={date} subtitleStyle={style.title} right={rightContent} />
                <Card.Content>
                    <Paragraph style={style.title}>{description}</Paragraph>
                </Card.Content>
            </Card>
        </View>
    )
}