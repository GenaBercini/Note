import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { IconButton, RadioButton, useTheme } from "react-native-paper";
import { style } from "./Style";
import { IColorOptionsProps } from "../../../types";

export default function ColorOptions({onHandleAction, noteData, setNoteData}: IColorOptionsProps) {
    const { colors } = useTheme();
    const navigation = useNavigation()
    return (
        <View style={{ ...style.optionsContainer, backgroundColor: `${colors.primary}80` }}>
                <View style={{ ...style.colorsOptions, backgroundColor: `${colors.primary}` }}>
                    <RadioButton
                        value='#FDD649'
                        uncheckedColor='#FDD649'
                        color='#FDD649'
                        status={noteData.color === '#FDD649' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setNoteData({ ...noteData, color: '#FDD649' })
                        }}
                    />
                    <RadioButton
                        value='#AF3875'
                        uncheckedColor='#AF3875'
                        color='#AF3875'
                        status={noteData.color === '#AF3875' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setNoteData({ ...noteData, color: '#AF3875' })
                        }}
                    />
                    <RadioButton
                        value='#FF744B'
                        uncheckedColor='#FF744B'
                        color='#FF744B'
                        status={noteData.color === '#FF744B' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setNoteData({ ...noteData, color: '#FF744B' })
                        }}
                    />
                    <RadioButton
                        value='#17E0AC'
                        uncheckedColor='#17E0AC'
                        color='#17E0AC'
                        status={noteData.color === '#17E0AC' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setNoteData({ ...noteData, color: '#17E0AC' })
                        }}
                    />
                    <RadioButton
                        value='#2E68FF'
                        uncheckedColor='#2E68FF'
                        color='#2E68FF'
                        status={noteData.color === '#2E68FF' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setNoteData({ ...noteData, color: '#2E68FF' })
                        }}
                    />
                </View>
                <View style={{ ...style.updateButtons, backgroundColor: `${colors.primary}` }}>
                    <IconButton
                        onPress={() => navigation.goBack()}
                        icon={"close-thick"}
                        size={25}
                        color={`${colors.text}`}
                    />
                    <IconButton
                        onPress={() => onHandleAction()}
                        icon={"check-bold"}
                        size={25}
                        color={`${colors.text}`}
                    />
                </View>
            </View>
    )
}