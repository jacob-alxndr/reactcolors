export default function selectShades(colors, colorId) {
  let shades = [];
  for (let value in colors) {
    shades.push(...colors[value].filter((c) => c.id === colorId));
  }
  console.log(shades);
  return shades.slice(1);
}
