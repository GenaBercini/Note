import * as React from 'react'
import { View } from 'react-native'
import AddNote from '../components/AddNote'
import UpdateNote from '../components/UpdateNote'

export default function FormNote({route}: any) {
    return (
        <View>
        {
           route.params. update ? 
            <UpdateNote {...route.params}/>
            :
            <AddNote/>
        }
        </View>
    )
}