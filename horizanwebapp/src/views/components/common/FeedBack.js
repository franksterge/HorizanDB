import React from 'react';
import Button from '@atlaskit/button';

const Feedback = ({
	code,
	message,
	type,
	onDismiss
}) => {
	let innerContents;

	switch (type) {
		case 'error':
			innerContents = (
				<div style={{
					padding: '10px',
					border: '1px solid #ddd',
					borderRadius: '3px'
				}}>
					<strong style={{
						color: 'red',
						padding: '10px 0',
					}}>
						{ code }
					</strong>
					<p>{ message }</p>
					<Button appearance='subtle'
						spacing='compact'
						onClick={onDismiss}>
						Dismiss
					</Button>
				</div>
			);
			break;
		case 'warning':
			innerContents = (
				<div style={{
					backgroundColor: '#FFAB00'
				}}>
					<strong>{ code }</strong>
					<p>{ message }</p>
					<Button appearance='subtle'
						spacing='compact'
						onClick={onDismiss}>
						Dismiss
					</Button>
				</div>
			);
			break;
		case 'success':
			innerContents = (
				<div style={{
					backgroundColor: '#57D9A3'
				}}>
					<strong>{ code }</strong>
					<p>{ message }</p>
					<Button appearance='subtle'
						spacing='compact'
						onClick={onDismiss}>
						Dismiss
					</Button>
				</div>
			);
			break;
		default:
			// made for message
			innerContents = (
				<div style={{
					backgroundColor: '#ddd'
				}}>
					<strong>{ code }</strong>
					<p>{ message }</p>
					<Button appearance='subtle'
						spacing='compact'
						onClick={onDismiss}>
						Dismiss
					</Button>
				</div>
			);
			break;
	}

	return innerContents;
};

export default Feedback;