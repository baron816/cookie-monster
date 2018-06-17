import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Groups from './Groups';
import Settings from './Settings';
import AddGroup from './AddGroup';
import 'typeface-roboto';

import parseCookies, {removeCookieValue} from './parseCookies';
import Cookies from 'js-cookie';

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
    }, () => {
      this.persist();
      var oldCookie = Cookies.get(this.state.cookieKey);
      var newCookie = parseCookies({
        delimiter: this.state.delimiter,
        kvSeparator: this.state.kvSeparator,
        oldCookie
      }, value);

      Cookies.set(this.state.cookieKey, newCookie);
    })
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
            selected: `${newGroupKey}${this.state.kvSeparator}${this.state.defaultOption}`
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
    }, () => {
      this.persist();
      var oldCookie = Cookies.get(this.state.cookieKey);
      var newCookie = removeCookieValue({
        delimiter: this.state.delimiter,
        kvSeparator: this.state.kvSeparator,
        oldCookie
      }, groupKey);

      Cookies.set(this.state.cookieKey, newCookie);
    });
  };

  flipSettings = () => {
    this.setState((state) => {
      return {...state, settingsActive: !state.settingsActive};
    })
  };

  handleSettingsChange = (e) => {
    var value = e.target.value;
    this.setState({[e.target.name]: value}, this.persist);
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Paper>
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
            />
            <AddGroup handleAddGroup={this.handleAddGroup}/>
            <IconButton aria-label="Settings" onClick={this.flipSettings}>
              <SettingsIcon />
            </IconButton>
          </React.Fragment>
          }
        </Paper>
      </React.Fragment>
    )
  }
}

export default App;
