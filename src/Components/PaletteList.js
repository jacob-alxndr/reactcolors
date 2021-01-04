import React from "react";
import MiniPalette from "./MiniPalette";

import "../scss/PaletteList.scss";
import { Link } from "react-router-dom";
export default function PaletteList(props) {
  const { palettes, history } = props;
  return (
    <div className="PaletteList">
      <div className="PaletteList__container">
        <div className="PaletteList__header">
          <h1 className="PaletteList__title"> React Color Palettes</h1>
          <Link to="/palette/new">Create Palette</Link>
        </div>

        <div className="PaletteList__palettes">
          {palettes.map((palette) => {
            return (
              <MiniPalette
                palette={palette}
                history={history}
                key={palette.paletteName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
