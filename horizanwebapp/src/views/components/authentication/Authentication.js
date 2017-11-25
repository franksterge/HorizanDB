import React from 'react';
import Modal from 'react-modal';
import Form from '../common/Form';
import Field from '../common/Field';

const Authentication = ({
	closeAuthModal,
	authModalIsOpen,
	authModalContent,
	getLoginFields,
	getSignUpFields,
	handleLogin,
	handleSignup,
	setModalContent
}) => {
	return (
		<Modal
			isOpen={authModalIsOpen}
			onRequestClose={closeAuthModal}
			contentLabel="Modal">
			<div>
				<button onClick={closeAuthModal}>
					Close Modal
				</button>
			</div>
			{
				authModalContent === 'login' ? (
					<div>
						<div>
							<h1>Login</h1>
						</div>
						<Form fields={getLoginFields()}
							onSubmit={handleLogin.bind(this)} />
						<div>
							Don't have an account?
							<button type="button"
								onClick={setModalContent.bind(null, 'signup')}>
								Sign Up
							</button>
						</div>
					</div>
				) : (
					<div>
						<div>
							<h1>Signup</h1>
						</div>
						<Form fields={getSignUpFields()}
							onSubmit={handleLogin.bind(this)} />
						<div>
							Already have an account?
							<button type="button"
								onClick={setModalContent.bind(null, 'login')}>
								Log In
							</button>
						</div>
					</div>
				)
			}
			<div>
				<button>
					Forgot password
				</button>
			</div>
		</Modal>
	);
};

export default Authentication;