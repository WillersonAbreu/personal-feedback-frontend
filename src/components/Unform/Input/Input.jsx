import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import StyledInput from './StyledInput';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <StyledInput
        ref={inputRef}
        defaultValue={defaultValue}
        className={error ? 'has-error' : ''}
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
}
