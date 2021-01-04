import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import chroma from "chroma-js";
import "../scss/ColorPicker.scss";
export default function ColorPicker(props) {
  const [currentColor, setCurrentColor] = React.useState({
    rgba: `rgba(100,100,100, 0)`,
    hex: "#32f",
    hsl: `hsla(100,100,100, 1))`,
    source: "hex",
  });
  const [colors, addColors] = React.useState([]);
  const [counter, addCounter] = React.useState(0);
  // const [currentColor, setCurrentColor] = React.useState("#32f");
  let luminosity;
  let bgLuminosity;
  if (chroma(currentColor.hex).luminance() > 0.3) {
    luminosity = "#191919";
    bgLuminosity = "rgba(255, 255, 255, 0.6)";
  } else {
    luminosity = "#f2f2f2";
    bgLuminosity = "rgba(255, 255, 255, .4)";
  }
  //   const handleDrawerOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleDrawerClose = () => {
  //     setOpen(false);
  //   };

  const updateState = (color) => {
    props.addColor(color);
    // console.log(color,colors)
  };

  const handleColorChange = (color) => {
    // console.log(color);

    const { r, g, b, a } = color.rgb;
    const { h, s, l } = color.hsl;
    const { hex, source } = color;
    console.log(source);

    setCurrentColor({
      rgba: `rgba(${r},${g},${b},${a})`,
      hex: hex,
      hsl: `hsla(${h},${s},${l},${a})`,
      source: source,
    });
  };

  const addToCounter = () => {
    if (counter <= 19) addCounter(counter + 1);
  };

  const addNewColor = () => {
    addToCounter();
    addColors([...colors, currentColor]);
    counter <= 19 && updateState(currentColor);
  };
  const addRandomColor = () => {
    addToCounter();
    const randomColor = chroma.random()._rgb;
    // const rgb = randomColor.map((a) => console.log(a));
    const rgba = `rgba(${randomColor.toString()})`;
    const hex = chroma(rgba).hex();
    const hsl = chroma(hex)
      .hsl()
      .map((c) => c.toFixed(2));

    addColors([...colors, { hex: hex, rgba: rgba, hsl: hsl }]);
    counter <= 19 && updateState({ hex: hex, rgba: rgba, hsl: hsl });
  };
  const clear = () => {
    props.clear();
    addCounter(0);
    addColors([]);
  };

  return (
    <div className="ColorPicker">
      <Typography variant="h5">Choose a color</Typography>
      <div className="ColorPicker__content">
        <Button variant="contained" color="secondary" onClick={clear}>
          Clear Palette
        </Button>
        <Button variant="contained" color="primary" onClick={addRandomColor}>
          Random Color
        </Button>
      </div>
      <ChromePicker
        width={`100%`}
        styles={{ margin: "0 auto" }}
        color={currentColor}
        onChange={handleColorChange}
        onChangeComplete={(a) => {
          console.log(a);
        }}
      />
      <Button
        variant="contained"
        style={{
          background: currentColor.hex,
          color: luminosity,
          width: "100%",
        }}
        onClick={addNewColor}
      >
        Add New Color
      </Button>
    </div>
  );
}
