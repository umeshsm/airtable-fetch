import React from "react";

import { ICard } from "src/types";

const Card: React.FC<ICard> = ({ name, students }: ICard) => {
  return (
    <div className="card">
      <b>Name</b>
      <span>{name}</span>
      <b>Students</b>
      <span>{students.join(", ")}</span>
    </div>
  );
};

export default Card;
