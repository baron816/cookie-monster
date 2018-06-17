import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class AddGroup extends Component {
  state = {
    newGroup: ''
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.newGroup) {
      this.props.handleAddGroup(this.state.newGroup);
      this.setState({newGroup: ''});
    }
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
        >
          <TextField
            id="AddGroup"
            label="New Group"
            name="newGroup"
            value={this.state.newGroup}
            onChange={this.handleChange}
          />

          <Button
            variant="contained"
            type="submit"
            color="primary"
          >
            Add
          </Button>
        </form>
      </div>
    )
  }
}
