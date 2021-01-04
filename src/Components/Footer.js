import React from "react";
import "../scss/Footer.scss";
export default function Footer(props) {
  return (
    <footer className="Footer">
      <div className="Footer__container">
        <div>{props.palette}</div>
        <div>{props.emoji}</div>
      </div>
    </footer>
  );
}
