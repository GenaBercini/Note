import { Alert } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDoc, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const onHandleLogin = (email: string, password: string) => {
    if (email !== "" && password !== "") {
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                const colRef = doc(db, `users/${user.user.uid}`);
                getDoc(colRef).then((user: any) => {
                    AsyncStorage.setItem('currentUser', JSON.stringify(user.data())).then(() => console.log('Login'));
                })
            })
            .catch((error) => {
                if (error.message === 'Firebase: Error (auth/invalid-email).') Alert.alert("Invalid Email", error.message);
                else if (error.message === 'Firebase: Error (auth/user-not-found).') Alert.alert("User doesn't found", error.message);
                else if (error.message === 'Firebase: Error (auth/wrong-password).') Alert.alert("Wrong Password", error.message);
                else Alert.alert("Error", error.message);
            })
    }
}

export const onHandleSignUp = (userData: any) => {
    if (userData.email !== "" && userData.password !== "") {
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
            .then((user) => {
                const currentUser = {
                    name: userData.name,
                    phone: userData.phone,
                    email: userData.email,
                    password: userData.password,
                }
                setDoc(doc(db, "users", user.user.uid), currentUser);
                AsyncStorage.setItem('currentUser', JSON.stringify(currentUser)).then(() => console.log('Login'));
            })
            .catch((error) => Alert.alert('Error', error.message))
    }
}