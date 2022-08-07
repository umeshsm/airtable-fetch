import React from "react";

import { IButton } from "src/types";

const Button: React.FC<IButton> = ({ children, ...rest }: IButton) => {
  return <button {...rest}>{children}</button>;
};

export default Button;
