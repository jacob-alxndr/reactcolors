import chroma from "chroma-js";
// {
//     paletteName: "Material UI Colors",
//     id: "material-ui-colors",
//     emoji: "🎨",
//     colors: [
//       { name: "red", color: "#F44336" },
//       { name: "pink", color: "#E91E63" },
//       { name: "purple", color: "#9C27B0" },
//       { name: "deeppurple", color: "#673AB7" },
//       { name: "indigo", color: "#3F51B5" },
//       { name: "blue", color: "#2196F3" },
//       { name: "lightblue", color: "#03A9F4" },
//       { name: "cyan", color: "#00BCD4" },
//       { name: "teal", color: "#009688" },
//       { name: "green", color: "#4CAF50" },
//       { name: "lightgreen", color: "#8BC34A" },
//       { name: "lime", color: "#CDDC39" },
//       { name: "yellow", color: "#FFEB3B" },
//       { name: "amber", color: "#FFC107" },
//       { name: "orange", color: "#FF9800" },
//       { name: "deeporange", color: "#FF5722" },
//       { name: "brown", color: "#795548" },
//       { name: "grey", color: "#9E9E9E" },
//       { name: "bluegrey", color: "#607D8B" }
//     ]
//   }
export default function generatePalette(palette) {
  const values = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  let newPalette = {
    paletteName: palette.paletteName,
    id: palette.id,
    emoji: palette.emoji,
    colors: {},
  };
  for (let value of values) {
    newPalette.colors[value] = [];
  }
  for (let color of palette.colors) {
    let scale = generateScale(color.color, values.length).reverse();
    for (let i in scale) {
      newPalette.colors[values[i]].push({
        name: `${color.name}-${values[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: `${scale[i]}`,
        rgb: chroma(scale[i]).css(),
        rgba: `rgba(${chroma(scale[i]).rgba()})`,
        hsla: `hsla(${chroma(scale[i])
          .hsl()
          .map((num, i) => {
            if (isNaN(num)) {
              return 0;
            } else if (i === 1 || i === 2) {
              return num.toFixed(1) * 100 + "%";
            } else {
              return num.toFixed(1).toString();
            }
          })})`,
      });
    }
  }

  return newPalette;
}

const getColorRange = (hex) => [
  chroma(hex).darken(2),
  chroma(hex),
  chroma(hex).brighten(4),
];
const generateScale = (hex, numColors) =>
  chroma.scale(getColorRange(hex)).mode("lab").colors(numColors);
