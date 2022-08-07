import { Control, SubmitHandler } from "react-hook-form";

export type ILoginForm = {
  studentName: string;
};

export interface ILogin extends HTMLInputElement {
  onSubmit: SubmitHandler<ILoginForm>;
}

export interface ILoginDetails extends ILogin {
  control: Control<ILoginForm>;
  formState: any;
  clearErrors: (args: string) => void;
  watch: (args: string) => string;
  handleSubmit: (args: any) => void;
}

export type IClass = {
  name: string;
  students: string[];
};

export type IStudent = {
  name: string;
  classes: IClass[];
};

export interface IInput extends React.HTMLProps<HTMLInputElement> {}

export interface IButton extends React.HTMLProps<HTMLButtonElement> {
  children: React.ReactNode;
}

export type ICard = {
  name: string;
  students: string[];
};
