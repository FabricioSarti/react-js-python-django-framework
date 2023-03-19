import React from "react";
import "./ClientLayout.scss";

export function ClientLayout(props) {
  /*ESTE CHILDREN HACE QUE SE EXPORTE TODO EL LAYOUT*/
  const { children } = props;
  return (
    <div>
      <p>ClientLayout</p>
      {children}
    </div>
  );
}
