import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Select, MenuItem, Snackbar, IconButton } from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
// import MenuItem from '@material-ui/core/MenuItem';
// import Slider, { Range } from "rc-slider";
// import "rc-slider/assets/index.css";
import "../scss/Navbar.scss";
export default class Navbar extends Component {
  static defaultProps = {
    types: ["hex", "rgb", "rgba", "hsla"],
  };
  constructor(props) {
    super(props);
    this.state = {
      format: this.props.format,
      isOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(e) {
    this.setState(
      { [e.target.name]: e.target.value },
      this.props.update(e.target.name, e.target.value)
    );
    if (e.target.name === "format") {
      this.setState({ isOpen: true });
    }
  }

  handleClose = (event, reason) => {
    // if (reason === "clickaway") {
    //   return;
    // }
    this.setState({ isOpen: false });
  };

  render() {
    const { value, types, format, isSingle } = this.props;
    return (
      <nav className="Navbar">
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message={<span id="message-id">Color format is now {format}</span>}
          open={this.state.isOpen}
          ContentProps={{ "aria-describedby": "message-id" }}
          action={[
            <IconButton
              style={{ color: "#f2f2f2" }}
              onClick={this.handleClose}
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        <div className="Navbar__title">
          <Link to="/">React Color Picker</Link>
        </div>
        {!isSingle && (
          <div className="input__item">
            <label htmlFor="type">{`Value ${value}`}</label>
            <input
              className="input__item-input"
              type="range"
              id="value"
              name={"value"}
              value={value}
              min="100"
              max="900"
              onChange={this.handleChange}
              step="100"
            />
          </div>
        )}

        <div className="Select__container">
          <Select
            value={this.state.format}
            name="format"
            onChange={this.handleChange}
          >
            {types.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </div>
      </nav>
    );
  }
}
// range-input rc-slider version

/* <div className="Slider">
          <Slider
            step={100}
            min={100}
            max={900}
            defaultValue={value}
            onAfterChange={this.handleChange}
            // handle={(props) => this.handleChange(props)}
          />
        </div> */

// Hand styles select

/* <select
          // onChange={this.handleChange}
          name="type"
          className="Navbar__dropdown"
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select> */
