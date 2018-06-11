import React, {Component} from 'react';

import Group from './Group';

import Cookies from 'js-cookie';
import parseCookies, {removeCookieValue, splitCookieValue} from './parseCookies';
import Divider from '@material-ui/core/Divider';

export default class Groups extends Component {
  cookieHandlerLift = (fn) => (e) => {
    var {cookieKey, delimiter, kvSeparator, setSelected} = this.props;
    var oldCookie = Cookies.get(cookieKey);
    var newValue = e.target.value;

    var newCookie = fn({
      delimiter,
      kvSeparator,
      oldCookie
    }, newValue)

    Cookies.set(cookieKey, newCookie);
    setSelected(...splitCookieValue(newValue, kvSeparator));
  }

  handleChangeCookieValue = this.cookieHandlerLift(parseCookies);
  handleRemoveCookieValue = this.cookieHandlerLift(removeCookieValue);

  render() {
    return (
      <div className='Groups'>
        {Object.entries(this.props.groups)
          .map(([groupKey, {options, selected}]) => {
          return (
            <React.Fragment key={groupKey}>
            <Group
              groupKey={groupKey}
              kvSeparator={this.props.kvSeparator}
              options={options}
              handleAddOption={this.props.handleAddOption}
              selected={selected}
              setSelected={this.props.setSelected}
              handleDeleteGroup={this.props.handleDeleteGroup}
            />
            <Divider />
            </React.Fragment>
          )
        })}
      </div>
    );
  }
}
