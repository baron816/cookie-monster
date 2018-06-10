import React from 'react';

export default function RadioInput({
  formGroup,
  id,
  value,
  onChange,
  children,
  checked
}) {
  return (
    <label>
      <input
        type='radio'
        id={id}
        name={formGroup}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {children}
    </label>
  )
}
