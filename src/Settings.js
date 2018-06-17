import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

function Settings(props) {
  var { classes } = props;
  return (
    <div>
      <form className={classes.container}>
        <TextField
          id="cookieKey"
          label="Set Cookie Key"
          name="cookieKey"
          value={props.cookieKey}
          onChange={props.handleChange}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="delimiter"
          label="Set Cookie Delimiter"
          name="delimiter"
          value={props.delimiter}
          onChange={props.handleChange}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="kvSeparator"
          label="Set Key-Value Separator"
          name="kvSeparator"
          value={props.kvSeparator}
          onChange={props.handleChange}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="defaultOption"
          label="Set Default Option"
          name="defaultOption"
          value={props.defaultOption}
          onChange={props.handleChange}
          className={classes.textField}
          margin="normal"
        />
      </form>
      <IconButton aria-label="Settings" onClick={props.flipSettings}>
        <HomeIcon />
      </IconButton>
    </div>
  )
}

var styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    width: 200,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
})

export default withStyles(styles)(Settings)
