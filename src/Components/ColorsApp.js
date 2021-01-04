import React from "react";
import Palette from "./Palette";
// import SingleColorPalette from "./SingleColorPalette";
import PaletteList from "./PaletteList";
import seedPalettes from "../seedPalettes";
import generatePalette from "../Helpers/colorHelper";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NewPaletteForm from "./NewPaletteForm";
// import SingleColorPalette from "./SingleColorPalette";
function ColorsApp() {
  const findPalette = (id) => seedPalettes.find((palette) => palette.id === id);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList {...routeProps} palettes={seedPalettes} />
          )}
        />
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPaletteForm routeProps={routeProps} palettes={seedPalettes} />
          )}
        />
        <Route
          key="paletteId"
          exact
          path="/palette/:paletteId"
          render={(routeProps) => (
            <Palette
              {...routeProps}
              palette={generatePalette(
                findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
        <Route
          key="colorId"
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <Palette
              {...routeProps}
              palette={generatePalette(
                findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
      {/* 
      <div className="ColorsApp">
        <Palette palette={helper(seedPalettes[8])} />
      </div> */}
    </Router>
  );
}

export default ColorsApp;
