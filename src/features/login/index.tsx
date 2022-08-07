import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import Input from "src/components/input";
import Button from "src/components/button";

import { ILogin, ILoginDetails } from "src/types";

const LoginDetails: React.FC<ILoginDetails> = ({
  control,
  clearErrors,
  formState: { errors },
  watch,
  handleSubmit,
  onSubmit,
  ...rest
}: ILoginDetails) => {
  const studentName = watch("studentName");

  React.useEffect(() => {
    if (errors?.studentName && studentName.length) {
      clearErrors("studentName");
    }
  }, [studentName]);

  return (
    <div className="login">
      <label>Enter Student Name</label>
      <Controller
        control={control}
        name="studentName"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className="inputWrapper">
            <Input value={value} onChange={onChange} {...rest} />
            {error && <span className="errorMessage">{error.message}</span>}
          </div>
        )}
      />
      <Button onClick={handleSubmit(onSubmit)} disabled={!studentName}>
        Login
      </Button>
    </div>
  );
};

export const Login: React.FC<ILogin> = ({ onSubmit, ...rest }: ILogin) => {
  const methods = useFormContext();

  return <LoginDetails {...methods} onSubmit={onSubmit} {...rest} />;
};

export default Login;
