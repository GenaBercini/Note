import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/config";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-native-paper";
import { CombinedDarkTheme, CombinedDefaultTheme } from "../../Theme";
import { DrawerStack } from "./DrawerStack";
import { AuthStack } from "./AuthStack";
import { AuthUserContext } from "../context/authUserContext";

export const AuthUserProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null);
    return <AuthUserContext.Provider value={{user, setUser}}>{children}</AuthUserContext.Provider>;
};

export function Navigation() {
    const { user, setUser } = React.useContext(AuthUserContext);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, async (authUser) => {
            authUser ? setUser(authUser) : setUser(null);
            setLoading(false);
        });
        return () => unsuscribe();
    }, [user]);

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  function toggleTheme() {
    setIsDarkTheme(isDark => !isDark);
  }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' />
            </View>
        )
    }
    return (
        <Provider theme={theme}>
            <NavigationContainer >
                {
                    user ? <DrawerStack toggleTheme={toggleTheme} isDarkTheme={isDarkTheme}/> : <AuthStack />
                }
            </NavigationContainer>
        </Provider>
    )
}