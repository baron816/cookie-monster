import React, {Component} from 'react';

import Group from './Group';

import Divider from '@material-ui/core/Divider';

export default class Groups extends Component {
  render() {
    return (
      <div className='Groups'>
        {Object.entries(this.props.groups)
          .map(([groupKey, {options, selected, active}]) => {
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
              active={active}
              flipGroupActiveState={this.props.flipGroupActiveState}
              editSelected={this.props.editSelected}
            />
            <Divider />
            </React.Fragment>
          )
        })}
      </div>
    );
  }
}
