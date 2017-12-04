import React from 'react';
import Field from './Field';

const Form = ({
	fields,
	onSubmit,
	classNames,
	children,
	customStyles
}) => (
	<form onSubmit={onSubmit} style={{
			...customStyles
		}}>
		{
			fields && fields.length ? fields.map((fieldMeta, key) => (
				<Field key={key} {...fieldMeta} />
			)) : 'Missing form fields!'
		}
	</form>
);

export default Form;