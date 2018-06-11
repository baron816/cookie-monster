import React, { Component } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default class Group extends Component {
  state = {
    newOption: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  addOption = () => {
    this.props.handleAddOption(this.state.newOption, this.props.groupKey);
    this.setState({ newOption: ''});
  }

  render() {
    var {
      groupKey,
      options,
      selectedIndex,
      kvSeparator,
      setSelected
    } = this.props;
    return(
      <div key={groupKey}>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">{groupKey}</FormLabel>
          <RadioGroup
            aria-label={groupKey}
            name={groupKey}
            value={groupKey + kvSeparator + options[selectedIndex]}
            onChange={setSelected}
          >
            {this.props.options.map((option) => {
              return (
                <FormControlLabel
                  value={groupKey + kvSeparator + option}
                  control={<Radio />}
                  label={option}
                  key={groupKey}
                />
              )
            })}
          </RadioGroup>
        </FormControl>

        <TextField
          id="AddOption"
          label="New Option"
          name="newOption"
          value={this.state.newOption}
          onChange={this.handleChange}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={this.addOption}
        >
          Add
        </Button>
      </div>
    )
  }
}
