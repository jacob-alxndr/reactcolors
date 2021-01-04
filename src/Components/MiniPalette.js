import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";
// import "../styles/MiniPalette.scss";

const styles = {
  miniPalette: {
    backgroundColor: `var(--color-primary)`,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // transform
    // padding: "1rem",
    transition: "transform .3s ease, background-color .2s ease",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-2%)",
      backgroundColor: `var(--black-light)`,
    },
    "&:hover $overlay": {
      opacity: 1,
    },
  },
  miniPalette__container: {
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",

    position: "relative",
    height: "10rem",
  },

  miniPalette__heading: {
    color: "var(--white)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem",
    "& h4": {
      fontWeight: 400,
    },
  },
  miniPalette__color: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    opacity: 0,
    position: "absolute",
    background: "rgba(0,0,0, .5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    transition: "opacity .3s ease",
    "& h4": {
      color: "var(--white)",
      fontWeight: 400,
      textTransform: "uppercase",
    },
  },
};
class MiniPalette extends Component {
  constructor(props) {
    super(props);
    this.handleRoute = this.handleRoute.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.myElement = null;
    this.myTween = null;
  }
  handleRoute() {
    const { palette, history } = this.props;
    history.push(`/palette/${palette.id}`);
  }

  handleKeydown(e) {
    e.keyCode === 13 && this.handleRoute();
  }

  componentDidMount() {
    // use the node ref to create the animation

    this.myTween = gsap.from(this.myElement, 1, {
      opacity: 0,
      delay: 0.2,
    });
  }

  render() {
    const { palette, classes } = this.props;
    return (
      <div
        className={classes.miniPalette}
        tabIndex={0}
        onKeyDown={this.handleKeydown}
        onClick={this.handleRoute}
        ref={(node) => (this.myElement = node)}
      >
        <div className={classes.miniPalette__container}>
          {" "}
          <div className={classes.overlay}>
            <h4>View Palette &#x279E;</h4>
          </div>
          {palette.colors.map((c) => {
            return (
              <div
                key={c.color}
                style={{
                  backgroundColor: c.color,
                  //   width: "25px",
                  //   height: "20px",
                }}
                className={classes.miniPalette__color}
              ></div>
            );
          })}
        </div>
        <div className={classes.miniPalette__heading}>
          <h4> {palette.paletteName}</h4>
          <span> {palette.emoji}</span>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(MiniPalette);
