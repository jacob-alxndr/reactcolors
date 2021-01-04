import React, { Component } from "react";
import Colorbox from "./Colorbox";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
// gsap.registerPlugin();
import selectShades from "../Helpers/selectShades";
import "../scss/Palette.scss";
export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: Array.from({
        length: this.props.palette.colors[100].length,
      }).fill(false),
      value: 500,
      format: "hex",
    };
    this.handleCopied = this.handleCopied.bind(this);
    this.update = this.update.bind(this);
    // this.myElements = [];
    // this.tl = new TimelineLite({ paused: true });
    this.tl = gsap.timeline({ paused: true });
    this.myElements = [];
  }

  update(name, value) {
    this.setState({ [name]: value });
  }
  componentWillUnmount() {
    console.log("unmount");
    this.tl.kill();
  }

  componentDidMount() {
    console.log(this.myElements)
    this.myElements = this.myElements.map((el) => el.myRef.current);
    this.tl
      .from(this.myElements, 0.5, {
        opacity: 0,
        autoAlpha: 1,
        stagger: { amount: 0.5 },
        onComplete: this.tl.restart(),
      })
      .play();
  }

  handleCopied(idx) {
    const newCopied = this.state.copied.map((color, i) =>
      i === idx ? true : false
    );
    this.setState({
      copied: newCopied,
    });
  }
  render() {
    const { match, palette } = this.props;
    const { format, copied, value } = this.state;
    const { paletteName, emoji, colors } = palette;
    const { colorId, paletteId } = match.params;

    let colorBoxes;
    !colorId
      ? (colorBoxes = palette.colors[value].map((c, i) => (
          <Colorbox
            match={match}
            bg={c[format]}
            name={c.name}
            handleCopied={this.handleCopied}
            copied={copied[i]}
            index={i}
            key={c.name}
            id={c.id}
            ref={(node) => (this.myElements[i] = node)}
          />
        )))
      : (colorBoxes = selectShades(colors, colorId).map((shade, i) => (
          <Colorbox
            match={match}
            bg={shade[format]}
            name={shade.name}
            handleCopied={this.handleCopied}
            copied={copied[i]}
            index={i}
            key={shade.name}
            id={shade.id}
            isSingle={true}
            ref={(node) => (this.myElements[i] = node)}
          />
        )));
    console.log(palette);
    return (
      <div className="Palette">
        <Navbar
          value={value}
          format={format}
          updateValue={this.updateValue}
          update={this.update}
          isSingle={!!colorId}
        />
        <div
          className={colorId ? "Palette__colors--single" : "Palette__colors"}
        >
          {colorBoxes}
          {colorId && (
            <Link className="Palette__back-button" to={`/palette/${paletteId}`}>
              GO BACK
            </Link>
          )}
        </div>
        <Footer palette={paletteName} emoji={emoji} />
      </div>
    );
  }
}
