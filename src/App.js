import React, { Component } from 'react';
import './App.css';
import Groups from './Groups';
import AddGroup from './AddGroup';

class App extends Component {
  state = {
    cookieKey: "",
    delimiter: "",
    kvSeparator: "",
    groups: {
      WEB50321: {
        options: [
          "A_Control",
          "B_Redesign"
        ],
      },
      WEB49000: {
        options: [
          "A_Control",
          "B_ShowModal",
          "C_UpsellsOnly"
        ]
      }
    }
  }
  componentDidMount() {
    this.rehydrate();
  }

  componentDidUpdate() {
    localStorage.setItem('cookieMonsterState', JSON.stringify(this.state));
  }

  setSelected = (groupKey, option) => {
    this.setState((state) => {
      var newGroup = Object.assign({}, state.groups[groupKey]);
      newGroup.selectedOption = option;
      var newGroups = Object.assign({}, state.groups, {[groupKey]: newGroup});
      return Object.assign(state, {groups: newGroups})
    })
  }

  rehydrate = () => {
    var state = localStorage.getItem('cookieMonsterState');
    this.setState(JSON.parse(state));
  }

  handleAddGroup = (newGroupKey) => {
    this.setState((state) => {
      var newGroups = Object.assign({}, state.groups);
      newGroups[newGroupKey] = {
        options: []
      }
      return Object.assign(state, {groups: newGroups});
    })
  }

  render() {
    return (
      <div className="App">
        <Groups
          groups={this.state.groups}
          delimiter={this.state.delimiter}
          kvSeparator={this.state.kvSeparator}
          cookieKey={this.state.cookieKey}
          setSelected={this.setSelected}
          setAllSelected={this.setAllSelected}
        />
        <AddGroup handleAddGroup={this.handleAddGroup}/>
      </div>
    )
  }
}

export default App;
