import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Groups from './Groups';
import AddGroup from './AddGroup';
import 'typeface-roboto';

class App extends Component {
  state = {
    cookieKey: "",
    delimiter: "&",
    kvSeparator: "-",
    defaultOption: "A_Control",
    groups: {}
  }
  componentDidMount() {
    this.rehydrate();
  }

  persist = () => {
    localStorage.setItem('cookieMonsterState', JSON.stringify(this.state));
  }

  setSelected = (groupKey) => (e) => {
    var value = e.target.value
    this.setState((state) => {
      return {
        ...state,
        groups: {
          ...state.groups,
          [groupKey]: {
            ...state.groups[groupKey],
            selected: value,
          }
        }
      };
    }, this.persist)
  }

  rehydrate = () => {
    var state = localStorage.getItem('cookieMonsterState');
    this.setState(JSON.parse(state));
  }

  handleAddGroup = (newGroupKey) => {
    this.setState((state) => {
      return {
        ...state,
        groups: {
          ...state.groups,
          [newGroupKey]: {
            options: [this.state.defaultOption],
            selected: `${newGroupKey}${this.state.kvSeparator}${this.state.defaultOption}`
          }
        }
      }
    }, this.persist)
  }

  handleAddOption = (value, groupKey) => {
    this.setState((state) => {
      return {
        ...state,
        groups: {
          ...state.groups,
          [groupKey]: {
            ...state.groups[groupKey],
            options: [...this.state.groups[groupKey].options, value]
          }
        }
      }
    }, this.persist);
  }

  handleDeleteGroup = (groupKey) => () => {
    this.setState((state) => {
      var { [groupKey]: unused, ...groups } = state.groups;
      return {
        ...state,
        groups
      }
    }, this.persist);
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Paper>
          <Groups
            groups={this.state.groups}
            delimiter={this.state.delimiter}
            kvSeparator={this.state.kvSeparator}
            cookieKey={this.state.cookieKey}
            setSelected={this.setSelected}
            setAllSelected={this.setAllSelected}
            handleAddOption={this.handleAddOption}
            handleDeleteGroup={this.handleDeleteGroup}
          />
          <AddGroup handleAddGroup={this.handleAddGroup}/>
        </Paper>
      </React.Fragment>
    )
  }
}

export default App;
