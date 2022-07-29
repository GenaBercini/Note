import { DrawerActionType } from "@react-navigation/native";
import { Dispatch, SetStateAction } from "react";

export type RootStackParamList = {
  NotesStack: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Notes: undefined;
  AddNote: undefined;
  NoteDetail: undefined;
};

export interface INotesProps {
  id: string;
  title: string;
  date: string;
  description: string;
  color: string;
}


export interface IColorOptionsProps {
  onHandleAction: () => void;
  noteData: {
    title: string;
    description: string;
    date: string;
    color: string;
  };
  setNoteData: Dispatch<SetStateAction<{ title: string; description: string; date: string; color: string; }>>;
}

export interface IRouteProps {
  route: {
    params: {
      id: string;
      title: string;
      date: string;
      description: string;
      color: string;
      onHandleDeleteNote: (param: boolean) => void;
    }
  }
}

export interface INavigate {
  navigate: (param1: string, param2?: object) => void;
  goBack: () => void;
  setParams: () => void;
  setOptions: (param1: object) => void;
  dispatch: (param1: DrawerActionType) => void
}