import { DarkTheme, DefaultTheme} from "react-native-paper";

export const CombinedDefaultTheme = {
    ...DefaultTheme,
    roundness: 2,
    version: 3,
    colors: {
        ...DefaultTheme.colors,
        primary: '#A5B8E4',
        surface: '#27314A',
        background: '#E6E9F0',
        text: '#000000',
        notification: 'rgb(255, 69, 58)',
    },
};

export const CombinedDarkTheme = {
    ...DarkTheme,
    roundness: 2,
    version: 3,
    colors: {
        ...DarkTheme.colors,
        primary: '#27314A',
        surface: '#FFFEFF',
        background: '#191F2F',
        text: '#FFFFFF',
        notification: 'rgb(255, 69, 58)',
    },
};