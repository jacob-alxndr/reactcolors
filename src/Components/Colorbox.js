import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import "../scss/Colorbox.scss";
export default class Colorbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: false,
    };
    this.myRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.animate = this.animate.bind(this);
  }

  animate() {
    setTimeout(() => {
      this.setState({ overlay: false });
    }, 2000);
  }

  handleClick(e) {
    this.props.handleCopied(this.props.index);
    this.setState({ overlay: true }, this.animate);
  }

  componentDidMount() {}
  render() {
    const { name, id, bg, copied, match, isSingle } = this.props;
    const { overlay } = this.state;
    let luminosity;
    let bgLuminosity;
    if (chroma(bg).luminance() > 0.3) {
      luminosity = "#191919";
      bgLuminosity = "rgba(255, 255, 255, 0.6)";
    } else {
      luminosity = "#f2f2f2";
      bgLuminosity = "rgba(255, 255, 255, .4)";
    }

    return (
      <div
        className="Colorbox"
        style={{ backgroundColor: bg, color: luminosity }}
        ref={this.myRef}
      >
        <div
          className={`Colorbox__overlay ${overlay && "active"}`}
          style={{ backgroundColor: bg, color: luminosity }}
        ></div>
        <div className={`Colorbox__overlay-message ${overlay && "active"}`}>
          <h1>Copied!</h1>
          <p>{bg}</p>
        </div>
        <div className="Colorbox__container">
          <div className="Colorbox__content">
            <span className="Colorbox__color-name">{name}</span>
          </div>

          <CopyToClipboard
            text={this.props.bg}
            onCopy={() => this.setState({ copied: true })}
          >
            <button
              style={{ color: luminosity }}
              onClick={this.handleClick}
              className={
                !copied
                  ? "Colorbox__copy-button"
                  : "Colorbox__copy-button copied"
              }
            >
              {!copied ? "Copy" : "Copied"}
            </button>
          </CopyToClipboard>
        </div>
        {!isSingle && (
          <Link
            style={{ color: luminosity, background: bgLuminosity }}
            className="Colorbox__more-button"
            to={`${match.url}/${id}`}
          >
            More
          </Link>
        )}
      </div>
    );
  }
}
