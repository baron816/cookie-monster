import React from 'react';

import TextField from '@material-ui/core/TextField';

export default function SearchBar(props) {
  return <TextField
      label="Search Groups"
      value={props.term}
      onChange={props.onChange}
      fullWidth
    />;
}
