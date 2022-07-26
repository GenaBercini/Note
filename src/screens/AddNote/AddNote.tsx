import { useNavigation } from '@react-navigation/native'
import { addDoc, collection } from 'firebase/firestore'
import * as React from 'react'
import { View } from 'react-native'
import {TextInput, RadioButton, IconButton } from 'react-native-paper'
import { AuthUserContext } from '../../context/authUserContext'
import { style } from './Styles'
import { db } from '../../firebase/config'

export default function AddNote() {
    const navigation = useNavigation()
    const { user }: any = React.useContext(AuthUserContext);
    const [info, setInfo] = React.useState({
        title: '',
        description: '',
        date: Date().slice(0, 15),
        color: '#FFFEFF'
    })

    const onHandleAddNote = () => {
        addDoc(collection(db, `users/${user.uid}/Notas`), info);
        navigation.goBack();
    }

    return (
        <View style={{ ...style.container, backgroundColor: `${info.color}` }}>
            <View style={style.optionsContainer}>
                <View style={style.colorsOptions}>
                    <RadioButton
                        value='#FFFEFF'
                        uncheckedColor='#FFFEFF'
                        color='#FFFEFF'
                        status={info.color === '#FFFEFF' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setInfo({ ...info, color: '#FFFEFF' })
                        }}
                    />
                    <RadioButton
                        value='#FDD649'
                        uncheckedColor='#FDD649'
                        color='#FDD649'
                        status={info.color === '#FDD649' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setInfo({ ...info, color: '#FDD649' })
                        }}
                    />
                    <RadioButton
                        value='#AF3875'
                        uncheckedColor='#AF3875'
                        color='#AF3875'
                        status={info.color === '#AF3875' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setInfo({ ...info, color: '#AF3875' })
                        }}
                    />
                    <RadioButton
                        value='#FF744B'
                        uncheckedColor='#FF744B'
                        color='#FF744B'
                        status={info.color === '#FF744B' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setInfo({ ...info, color: '#FF744B' })
                        }}
                    />
                    <RadioButton
                        value='#17E0AC'
                        uncheckedColor='#17E0AC'
                        color='#17E0AC'
                        status={info.color === '#17E0AC' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setInfo({ ...info, color: '#17E0AC' })
                        }}
                    />
                    <RadioButton
                        value='#2E68FF'
                        uncheckedColor='#2E68FF'
                        color='#2E68FF'
                        status={info.color === '#2E68FF' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setInfo({ ...info, color: '#2E68FF' })
                        }}
                    />
                </View>
                <View style={style.updateButtons}>
                <IconButton
                    onPress={() => navigation.goBack()}
                    icon={"close-thick"}
                    size={25}
                    color='white'
                    />
                    <IconButton
                    onPress={() => onHandleAddNote()}
                    icon={"check-bold"}
                    size={25}
                    color='white'
                    />
                    </View>
            </View>
            <TextInput
                style={{ ...style.title, backgroundColor: `${info.color}` }}
                mode='outlined'
                outlineColor={info.color}
                activeOutlineColor={info.color}
                onChangeText={(text) => setInfo({ ...info, title: text })}
                placeholder='Title'
                keyboardType='ascii-capable'
                value={info.title} />
            <TextInput
                style={{ backgroundColor: `${info.color}` }}
                mode='outlined'
                outlineColor={info.color}
                activeOutlineColor={info.color}
                numberOfLines={29}
                multiline={true}
                onChangeText={(text) => setInfo({ ...info, description: text })}
                placeholder='description'
                keyboardType='ascii-capable'
                value={info.description} />
        </View>
    )
}