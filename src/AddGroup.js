import React, {Component} from 'react';

export default class AddGroup extends Component {
  state = {
    newGroup: ''
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleAddGroup(this.state.newGroup);
    this.setState({newGroup: ''});
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
        >
          <label>
            Add Group
            <input
              type="text"
              placeholder="New Group"
              name="newGroup"
              onChange={this.handleChange}
              value={this.state.newGroup}
            />
          </label>
          <button type='submit'>+</button>
        </form>
      </div>
    )
  }
}
