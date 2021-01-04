import React from "react";
import chroma from "chroma-js";

export default function DraggableColorBox({ color }) {
  let luminosity;
  let bgLuminosity;
  if (chroma(color).luminance() > 0.4) {
    luminosity = "#191919";
    bgLuminosity = "rgba(255, 255, 255, 0.6)";
  } else {
    luminosity = "#f2f2f2";
    bgLuminosity = "rgba(255, 255, 255, .4)";
  }
  return (
    <div
      className="Colorbox"
      style={{ backgroundColor: color, color: luminosity, padding: "1rem" }}
    >
      {color}
    </div>
  );
}
