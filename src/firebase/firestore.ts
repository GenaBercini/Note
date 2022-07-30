import { collection, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from './config';

export const updateNote = (dataNote: object, noteId: string, userId: string | undefined) => {
    const colRef = collection(db, `users/${userId}/Notas`);
    updateDoc(doc(colRef, noteId), dataNote);
}

export const getNote = async (noteId: string, userId: string | undefined) => {
    const colRef = doc(db, `users/${userId}/Notas/${noteId}`);
    let note = await getDoc(colRef);
    return {
        title: note.data()?.title,
        date: note.data()?.date,
        description: note.data()?.description,
        color: note.data()?.color
    };
}

export const addNote = (dataNote: object, userId: string | undefined) => {
    addDoc(collection(db, `users/${userId}/Notas`), dataNote);
}