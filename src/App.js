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
    groups: {}
  }
  componentDidMount() {
    this.rehydrate();
  }

  persist = () => {
    localStorage.setItem('cookieMonsterState', JSON.stringify(this.state));
  }

  setSelected = (e) => {
    var value = e.target.value
    console.log(value)
    this.setState((state) => {
      return state;
      // console.log({groupKey, option})
      // var newGroup = Object.assign({}, state.groups[groupKey]);
      // newGroup.selectedOption = option;
      // // var newState = {
      // //   ...state,
      // //   groups: { ...state.groups, [groupKey]: }
      // // }
      // var newGroups = Object.assign({}, state.groups, {[groupKey]: newGroup});
      // return Object.assign(state, {groups: newGroups})
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
            options: ["A_Control"],
            selectedIndex: 0
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
          />
          <AddGroup handleAddGroup={this.handleAddGroup}/>
        </Paper>
      </React.Fragment>
    )
  }
}

export default App;
