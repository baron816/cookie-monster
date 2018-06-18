import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

import AppBar from './AppBar';
import Groups from './Groups';
import Settings from './Settings';
import AddGroup from './AddGroup';
import 'typeface-roboto';

// import Cookies from 'js-cookie';
import Cookies from 'universal-cookie';
var cookies = new Cookies();

class App extends Component {
  state = {
    cookieKey: "",
    delimiter: "",
    kvSeparator: "",
    defaultOption: "",
    groups: {},
    settingsActive: false,
  }
  componentDidMount() {
    this.rehydrate();
  }

  persist = () => {
    localStorage.setItem('cookieMonsterState', JSON.stringify({...this.state, settingsActive: false}));
    this.setCookies();
  };

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
    }, this.persist);
  };

  rehydrate = () => {
    var state = localStorage.getItem('cookieMonsterState');
    this.setState(JSON.parse(state));
  };

  handleAddGroup = (newGroupKey) => {
    this.setState((state) => {
      return {
        ...state,
        groups: {
          ...state.groups,
          [newGroupKey]: {
            options: [this.state.defaultOption],
            selected: `${newGroupKey}${this.state.kvSeparator}${this.state.defaultOption}`,
            active: false,
          }
        }
      }
    }, this.persist)
  };

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
  };

  handleDeleteGroup = (groupKey) => () => {
    this.setState((state) => {
      var { [groupKey]: unused, ...groups } = state.groups;
      return {
        ...state,
        groups
      }
    }, this.persist);
  };

  flipGroupActiveState = (e) => {
    var groupKey = e.target.value;

    this.setState((state) => {
      return {
        ...state,
        groups: {
          ...state.groups,
          [groupKey]: {
            ...state.groups[groupKey],
            active: !state.groups[groupKey].active
          }
        }
      }
    }, this.persist);
  }

  flipSettings = () => {
    this.setState((state) => {
      return {...state, settingsActive: !state.settingsActive};
    })
  };

  handleSettingsChange = (e) => {
    var value = e.target.value;
    this.setState({[e.target.name]: value}, this.persist);
  };

  setCookies = () => {
    var selectedGroups = Object.values(this.state.groups)
      .filter((group) => group.active)
      .map((group) => group.selected);

    var cookieString = selectedGroups.join(this.state.delimiter);
    cookies.set(this.state.cookieKey, cookieString);
  }

  editSelected = (groupKey) => (e) => {
    var value = e.target.value;
    this.setState((state) => {
      var group = state.groups[groupKey];
      var options = group.options;
      var prevSelectedVal = group.selected.split(state.kvSeparator)[1];
      var selectedIdx = group.options.indexOf(prevSelectedVal);
      return {
        ...state,
        groups: {
          ...state.groups,
          [groupKey]: {
            ...group,
            selected: groupKey + state.kvSeparator + value,
            options: [...options.slice(0, selectedIdx), value, ...options.slice(selectedIdx + 1, options.length)]
          }
        }
      }
    }, this.persist)
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <CssBaseline />
        <AppBar settingsActive={this.state.settingsActive} flipSettings={this.flipSettings} />
        <Paper className={this.props.classes.paper}>
          {this.state.settingsActive ?
          <Settings
            flipSettings={this.flipSettings}
            handleChange={this.handleSettingsChange}
            cookieKey={this.state.cookieKey}
            delimiter={this.state.delimiter}
            kvSeparator={this.state.kvSeparator}
            defaultOption={this.state.defaultOption}
          />
          : <React.Fragment>
            <Groups
              groups={this.state.groups}
              delimiter={this.state.delimiter}
              kvSeparator={this.state.kvSeparator}
              cookieKey={this.state.cookieKey}
              setSelected={this.setSelected}
              setAllSelected={this.setAllSelected}
              handleAddOption={this.handleAddOption}
              handleDeleteGroup={this.handleDeleteGroup}
              flipGroupActiveState={this.flipGroupActiveState}
              editSelected={this.editSelected}
            />
            <AddGroup handleAddGroup={this.handleAddGroup}/>
          </React.Fragment>
          }
        </Paper>
      </div>
    )
  }
}

var styles = {
  root: {
    minWidth: 300,
  },
  paper: {
    margin: 10,
    padding: 10,
  }
}

export default withStyles(styles)(App);
