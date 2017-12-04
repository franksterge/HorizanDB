import React from 'react';
import ModalWrapper from '../common/ModalWrapper';
import Button from '@atlaskit/button';
import Form from '../common/Form';
import Field from '../common/Field';

const Authentication = ({
	closeAuthModal,
	modalIsOpen,
	modalContentType,
	getLoginFields,
	getSignUpFields,
	handleLogin,
	handleSignup,
	setModalContent,
	authModalFeedback,
	dismissFeedback
}) => {
	let temporaryStyles = {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		flex: 1
	};

	let modalContent = (
		<div style={temporaryStyles}>
			{
				modalContentType === 'LOGIN' ? (
					<div style={temporaryStyles}>
						<Form fields={getLoginFields()}
							onSubmit={handleLogin.bind(this)}
							customStyles={temporaryStyles} />
						<br />
						<h6>
							Don't have an account?
						</h6>
						<br />
						<Button type="button"
							onClick={setModalContent.bind(null, 'SIGNUP')}
							shouldFitContainer>
							Sign up
						</Button>
					</div>
				) : (
					<div style={temporaryStyles}>
						<Form fields={getSignUpFields()}
							onSubmit={handleSignup.bind(this)}
							customStyles={temporaryStyles} />
						<br />
						<h6>
							Already have an account?
						</h6>
						<br />
						<Button type="button"
							onClick={setModalContent.bind(null, 'LOGIN')}
							shouldFitContainer>
							Log In
						</Button>
					</div>
				)
			}
		</div>
	);

	let footerContent = (
		<Button
			appearance='subtle'>
			Forgot password
		</Button>
	);

	let modalProps = {
		isOpen: modalIsOpen,
		onClose: closeAuthModal,
		title: modalContentType === 'LOGIN' ? 'Login' : 'Signup',
		content: modalContent,
		footerContent: footerContent,
		modalFeedback: authModalFeedback,
		dismissFeedback
	};

	return (
		<ModalWrapper {...modalProps} />
	);
};

export default Authentication;

{/*
	<div>
		{
			modalContentType === 'LOGIN' ? (
				<div>
					<h5>
						<strong>Login</strong>
					</h5>
					<Form fields={getLoginFields()}
						onSubmit={handleLogin.bind(this)} />
					<h6>
						Don't have an account?
					</h6>
					<button type="button"
						className="secondary button expanded"
						onClick={setModalContent.bind(null, 'SIGNUP')}>
						Sign Up
					</button>
				</div>
			) : (
				<div>
					<h5>
						<strong>
							Signup
						</strong>
					</h5>
					<Form fields={getSignUpFields()}
						onSubmit={handleSignup.bind(this)} />
					<h6>
						Already have an account?
					</h6>
					<button type="button"
						className="secondary button expanded"
						onClick={setModalContent.bind(null, 'LOGIN')}>
						Log In
					</button>
				</div>
			)
		}
		<div>
			<button className="clear button expanded">
				Forgot password
			</button>
		</div>
	</div>
*/}