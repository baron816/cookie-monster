import React, {Component} from 'react';

import Cookies from 'js-cookie';
import RadioInput from './RadioInput';
import parseCookies, {removeCookieValue, splitCookieValue} from './parseCookies';

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
    var groupKeys = Object.keys(this.props.groups);
    return (
      <div className='Groups'>
        {groupKeys.map((groupKey) => {
          var groupVal = this.props.groups[groupKey];
          return (
            <div key={groupKey}>
              <h2>{groupKey}</h2>
              <form>
                <RadioInput
                  name={groupKey}
                  onChange={this.handleRemoveCookieValue}
                  value={groupKey}
                  checked={!groupVal.selectedOption}
                >
                  Disable
                </RadioInput>
                {groupVal.options.map((option) => {
                  return (
                    <RadioInput
                      key={option}
                      name={groupKey}
                      value={groupKey + this.props.kvSeparator + option}
                      onChange={this.handleChangeCookieValue}
                      checked={groupVal.selectedOption === option}
                    >
                      {option}
                    </RadioInput>
                  )
                })}
              </form>
            </div>
          )
        })}
      </div>
    );
  }
}
