import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { Note } from '../components/Note';
import { INavigate } from '../../types';
import { AuthUserContext } from '../context/authUserContext';
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import { ActivityIndicator, AnimatedFAB, Searchbar, Provider, Menu, Divider, Button, FAB } from 'react-native-paper';

export default function Home() {
    const { user }: any = React.useContext(AuthUserContext);
    const navigation = useNavigation<INavigate>();
    const [notas, setNotas] = React.useState<DocumentData | undefined | any>([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const onChangeSearch = (query: any) => setSearchQuery(query);
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
            setLoading(false);
        })
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button onPress={() => signOut(auth)}>Desloguerse</Button>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            {
                loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        <ActivityIndicator animating={true} color='#BBBBBB' size='large' />
                    </View>
                    : notas.length > 0 ?
                        <FlatList
                            data={notas}
                            renderItem={({ item }) => (
                                <Note title={item.title} id={item.id} description={item.description} date={item.date} />
                            )}
                            keyExtractor={item => item.title}
                        />
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                            <Text>No hay notas</Text>
                        </View>
            }
            <AnimatedFAB
                icon='plus'
                label={'Label'}
                extended={false}
                onPress={() => navigation.navigate('FormNote', {
                    update: false
                })}
                visible={true}
                animateFrom={'right'}
                iconMode={'static'}
                style={styles.fabStyle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    },
});