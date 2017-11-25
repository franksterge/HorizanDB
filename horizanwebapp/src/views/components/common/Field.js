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
          <label>
            <strong>{label}</strong>
          </label>
        }
        {
          subtitle ? (
            <p>{subtitle}</p>
          ) : null
        }
        {
          type === 'textarea' ? (
            <textarea name={name}
              required={isRequired}
              defaultValue={defaultValue || ''}>
            </textarea>
          ) : (
            <input type={type}
              placeholder={placeholder || ''}
              name={name}
              required={isRequired}
              defaultValue={defaultValue || ''} />
          )
				}
				{
					type === 'submit' ? (
						<button type={ type }>
							{ text }
						</button>
					) : null
				}
      </fieldset>
    );
  }

  return innerContents;
};

export default Field;