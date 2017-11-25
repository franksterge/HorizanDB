import React from 'react';
import Field from './Field';

const Form = ({
	fields,
	onSubmit,
	classNames,
	children
}) => (
	<form onSubmit={onSubmit}>
		{
			fields && fields.length ? fields.map(fieldMeta => (<Field {...fieldMeta} />)) : 'Missing form fields!'
		}
	</form>
);

export default Form;