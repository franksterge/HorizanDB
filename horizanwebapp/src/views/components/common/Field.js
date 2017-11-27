import React from 'react';

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
        <textarea name={name}
          required={isRequired}
          defaultValue={defaultValue || ''}>
        </textarea>
      );
      break;
    case 'submit':
      controlElement = (
        <button type={ type } className="success button expanded">
          { text }
        </button>
      );
      break;
    default:
      controlElement = (
        <input type={type}
          placeholder={placeholder || ''}
          name={name}
          required={isRequired}
          defaultValue={defaultValue || ''} />
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
          label ? (
            <label>{label}</label>
          ) : null
        }
        {
          subtitle ? (
            <p>{subtitle}</p>
          ) : null
        }
        {
          controlElement
        }
      </fieldset>
    );
  }

  return innerContents;
};

export default Field;