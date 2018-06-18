import React from "react";

import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import HomeIcon from "@material-ui/icons/Home";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Monster from './cookie_monster.png';

function AppBarComponent(props) {
  var { classes } = props;
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <img src={Monster} className={classes.icon} />
          <Typography variant="title" color="inherit" className={classes.flex}>
            Cookie Monster
          </Typography>
          {props.settingsActive ? (
            <IconButton
              aria-label="Settings"
              onClick={props.flipSettings}
              color="inherit"
              className={classes.menuButton}
            >
              <HomeIcon />
            </IconButton>
          ) : (
              <IconButton
                aria-label="Settings"
                onClick={props.flipSettings}
                color="inherit"
                className={classes.menuButton}
              >
                <SettingsIcon />
              </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

var styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  icon: {
    width: 30,
    marginRight: 10,
  }
};

export default withStyles(styles)(AppBarComponent);
