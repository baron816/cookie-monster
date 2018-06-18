import React, { Component } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from "@material-ui/core/styles";

class Group extends Component {
  state = {
    newOption: '',
    editing: false,
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  addOption = () => {
    if (this.state.newOption) {
      this.props.handleAddOption(this.state.newOption, this.props.groupKey);
      this.setState({ newOption: ''});

    }
  }

  render() {
    var {
      groupKey,
      options,
      selected,
      kvSeparator,
      setSelected,
      classes
    } = this.props;
    var selectedVal = selected.split(kvSeparator)[1];
    return(
      <div key={groupKey} className={classes.group}>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">{groupKey}</FormLabel>
          <FormControlLabel
            control={
              <Switch
                checked={this.props.active}
                onChange={this.props.flipGroupActiveState}
                value={groupKey}
              />
            }
            label="Active State"
          />
          <RadioGroup
            aria-label={groupKey}
            name={groupKey}
            value={selected}
            onChange={setSelected(groupKey)}
          >
            {options.map((option, index) => {
              return (
                <FormControlLabel
                  value={groupKey + kvSeparator + option}
                  control={<Radio />}
                  label={option}
                  key={groupKey}
                  index={index}
                />
              )
            })}
          </RadioGroup>
        </FormControl>
        <form className={classes.addOption}>
          <TextField
            id="AddOption"
            label="New Option"
            name="newOption"
            value={this.state.newOption}
            onChange={this.handleChange}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={this.addOption}
          >
            Add
          </Button>
        </form>
        {this.state.editing ?
          <TextField
            id="EditOption"
            label="Edit Option"
            name="editOption"
            value={selectedVal}
            onChange={this.props.editSelected(groupKey)}
            onBlur={() => this.setState({editing: false})}
          /> : null}

        <Button
          variant="outlined"
          onClick={() => this.setState({editing: true})}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={this.props.handleDeleteGroup(this.props.groupKey)}
        >
          Delete
        </Button>
      </div>
    )
  }
}

var styles = {
  addOption: {
    marginBottom: 10,
  },
  group: {
    marginBottom: 10,
  }
}

export default withStyles(styles)(Group);
