import { Alert } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signIn = ({email, password}: {email: string; password: string;}) => {
    if (email !== "" && password !== "") {
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                const colRef = doc(db, `users/${user.user.uid}`);
                getDoc(colRef).then((user) => {
                    user.data() !== null && AsyncStorage.setItem('currentUser', JSON.stringify(user.data())).then(() => console.log('Login'));
                })
            })
            .catch((error) => {
                if (error.message === 'Firebase: Error (auth/invalid-email).') Alert.alert("Ups..","Invalid Email");
                else if (error.message === 'Firebase: Error (auth/user-not-found).') Alert.alert("Ups..","User doesn't found");
                else if (error.message === 'Firebase: Error (auth/wrong-password).') Alert.alert("Ups..","Wrong Password");
                else Alert.alert("Error", error.message);
            })
    }
}

export const signUp = (userData: { name: string; email: string; password: string; confirmPassword: string}) => {
    if (userData.email !== "" && userData.password !== "") {
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
            .then((user) => {
                if(user.user !== null && userData !== null) {
                    const currentUser = {
                        name: userData.name,
                        email: userData.email,
                        password: userData.password,
                    }
                    setDoc(doc(db, "users", user.user.uid), currentUser);
                    AsyncStorage.setItem('currentUser', JSON.stringify(currentUser)).then(() => console.log('Login'));
                }
            })
            .catch((error) => Alert.alert('Error', error.message))
    }
}