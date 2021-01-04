import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
// import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useStyles } from "./Drawer/DrawerStyles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChromePicker from "./ChromePicker";
import DraggableColorBox from "./DraggableColorBox";

export default function NewPaletteForm(props) {
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [colors, addColor] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addColors = (color) => {
    addColor([...colors, color]);
  };

  const clearPalette = () => {
    addColor([]);
  };

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar
          style={{ display:"flex", justifyContent:"space-between"}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create a New Palette
            </Typography>
            <Link      style={{ color: "white"}} to="/">Home</Link>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton
              onClick={handleDrawerClose}
              className={classes.iconButton}
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <ChromePicker addColor={addColors} clear={clearPalette} />
        </Drawer>
        <main
          style={{ height: "100vh" }}
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className="Palette__colors">
            {colors.map((c) => (
              <DraggableColorBox key={c.hex} color={c.hex} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
