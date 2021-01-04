import React, { Component } from "react";
import ColorsApp from "./Components/ColorsApp";
import "./scss/App.scss";
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <ColorsApp />
      </div>
    );
  }
}
