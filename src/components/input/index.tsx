import React from "react";

import { IInput } from "src/types";

const Input: React.FC<IInput> = ({ ...rest }: IInput) => {
  return <input {...rest} />;
};

export default Input;
