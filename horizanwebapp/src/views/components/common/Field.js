import React from 'react';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/field-text'
import FieldTextArea from '@atlaskit/field-text'

const Field = ({
  type,
  name,
  isRequired,
  placeholder,
  label,
  children,
  subtitle,
	defaultValue,
	text
}) => {
  let innerContents;
  let controlElement;

  switch (type) {
    case 'textarea':
      controlElement = (
        <FieldTextArea
          required={isRequired}
          label={label || ''}
          name={name}
          value={defaultValue || ''} />
      );
      break;
    case 'submit':
      controlElement = (
        <Button
          appearance='primary'
          type={type}>
          { text }
        </Button>
      );
      break;
    default:
      controlElement = (
        <TextField
          type={type}
          name={name}
          placeholder={placeholder || ''}
          label={label}
          value={defaultValue || ''}
          compact={true}
          required={isRequired} />
      );
      break;
  }

  if (children) {
    innerContents = (
      <fieldset>
        { children }
      </fieldset>
    );
  } else {
    innerContents = (
      <fieldset>
        {
          controlElement
        }
      </fieldset>
    );
  }

  return innerContents;
};

export default Field;