// import React, { Component } from "react";
// import Colorbox from "./Colorbox";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { Link } from "react-router-dom";
// import selectShades from "../Helpers/selectShades";
// import { gsap } from "gsap";
// import "../scss/Palette.scss";
// export default class SingleColorPalette extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       copied: Array.from({
//         length: this.props.palette.colors[100].length,
//       }).fill(false),
//       format: "hex",
//     };
//     this.handleCopied = this.handleCopied.bind(this);
//     this.update = this.update.bind(this);
//     this.myTween = gsap.timeline({ paused: true });
//     this.myElements = [];
//   }

//   update(name, value) {
//     this.setState({ [name]: value });
//   }

//   handleCopied(idx) {
//     const newCopied = this.state.copied.map((color, i) =>
//       i === idx ? true : false
//     );
//     this.setState({
//       copied: newCopied,
//     });
//   }
//   componentDidMount() {
//     const myElements = this.myElements.map((el) => el.myRef.current);
//     console.log(myElements[19]);

//     this.myTween
//       .from(myElements, 0.5, {
//         opacity: 0,
//         autoAlpha: 1,
//         stagger: { amount: 0.5 },
//         onComplete: this.myTween.restart(),
//       })
//       .play();
//   }

//   render() {
//     const { palette, match } = this.props;
//     const { format, value, copied } = this.state;
//     const { paletteName, emoji, colors } = palette;
//     const { colorId, paletteId } = match.params;
//     const isSingle = true;
//     let colorBoxes = selectShades(colors, colorId).map((shade, i) => (
//       <Colorbox
//         match={match}
//         bg={shade[format]}
//         name={shade.name}
//         handleCopied={this.handleCopied}
//         copied={copied[i]}
//         index={i}
//         key={shade.name}
//         id={shade.id}
//         isSingle={true}
//         ref={(node) => (this.myElements[i] = node)}
//       />
//     ));

//     return (
//       <div className="Palette">
//         <Navbar
//           value={value}
//           format={format}
//           updateValue={this.updateValue}
//           update={this.update}
//           isSingle={isSingle}
//         />

//         <div className="Palette__colors--single">
//           {colorBoxes}
//           <Link className="Palette__back-button" to={`/palette/${paletteId}`}>
//             GO BACK
//           </Link>
//         </div>
//         <Footer palette={paletteName} emoji={emoji} />
//       </div>
//     );
//   }
// }
