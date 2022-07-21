import { Alert } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from "firebase/firestore";

export const onHandleLogin = (email: string, password: string) => {
    if (email !== "" && password !== "") {
        signInWithEmailAndPassword(auth,email, password)
            .then(() => console.log('Login Success'))
            .catch((error) => {
                if(error.message === 'Firebase: Error (auth/invalid-email).') Alert.alert("Invalid Email", error.message);
                else if(error.message === 'Firebase: Error (auth/user-not-found).') Alert.alert("User doesn't found", error.message);
                else if(error.message === 'Firebase: Error (auth/wrong-password).') Alert.alert("Wrong Password", error.message);
                else Alert.alert("Error", error.message);
            })
    }
}

export const onHandleSignUp = (userData: any) => {
    if(userData.email !== "" && userData.password !== "") {
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then((user) => {
            setDoc(doc(db, "users", user.user.uid), {
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                email: userData.email,
                password: userData.password,
                image: userData.image
              });
        })
        .catch((error) => Alert.alert('Error', error.message))
    }
}