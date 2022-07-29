import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { View, Text, FlatList } from 'react-native'
import { db } from '../../firebase/config';
import { Note } from '../../components/Note/Note';
import { INavigate } from '../../../types';
import { AuthUserContext } from '../../context/authUserContext';
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import { ActivityIndicator, FAB, useTheme } from 'react-native-paper';
import { style } from './Styles';

export default function Notes() {
    const { user } = React.useContext(AuthUserContext);
    const navigation = useNavigation<INavigate>();
    const [notas, setNotas] = React.useState<DocumentData | undefined | any>([]);
    const [loading, setLoading] = React.useState(true);
    const {colors} = useTheme();

    React.useEffect(() => {
        const colRef = collection(db, `users/${user?.uid}/Notas`);
        onSnapshot(colRef, (snapshot) => {
            let notes: object[] = []
            snapshot.docs.forEach(element => {
                let notesObj = {
                    id: element.id,
                    title: element.data().title,
                    description: element.data().description,
                    date: element.data().date,
                    color: element.data().color
                }
                notes.push(notesObj);
            });
            setNotas(notes);
            setLoading(false);
        })
    }, [])

return (
    <View style={{ ...style.container, backgroundColor: `${colors.background}` }}>
        {
            loading ?
                <View style={style.loading}>
                    <ActivityIndicator animating={true} color={`${colors.surface}`} size='large' />
                </View>
                : notas.length > 0 ?
                    <FlatList
                        style={style.flatList}
                        data={notas}
                        renderItem={({ item }) => (
                            <Note title={item.title} id={item.id} description={item.description} date={item.date} color={item.color}/>
                        )}
                        keyExtractor={item => item.title}
                    />
                    :
                    <View style={style.addFirstNote}>
                        <Text style={{...style.addFirstNoteText,   color: `${colors.text}`,}}>Add your first note</Text>
                    </View>
        }
        <FAB
            icon='plus'
            color={`${colors.surface}`}
            onPress={() => navigation.navigate('AddNote')}
            style={{...style.fabStyle, backgroundColor: `${colors.primary}`}} />
    </View>
)
}