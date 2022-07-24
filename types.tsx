
export type RootStackParamList = {
  DrawerStack: undefined;
  SignIn: undefined;
    SignUp: undefined;
    Notes: undefined;
    AddNote: undefined;
    NoteDetail: undefined;
  };

export interface INotesProps  {
  id: string;
  title: string;
  date: string;
  description: string;
  color: string;
}
  
export interface INavigate {
    navigate: (param1: string, param2?: object) =>  void;
    goBack: () => void;
    setParams: () => void;
    setOptions: (param1: object) => void;
}
