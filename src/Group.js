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
      selected,
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
            value={selected}
            onChange={setSelected(groupKey)}
          >
            {this.props.options.map((option, index) => {
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
