import React from 'react';
import Modal from 'react-modal';
import Form from '../common/Form';
import Field from '../common/Field';

const modalStyles = {
	overlay : {
		backgroundColor   : 'rgba(0, 0, 0, 0.3)',
		display: 'flex',
		WebkitOverflowScrolling    : 'touch',
		justifyContent: 'center',
		alignItems: 'center'
	},
	content : {
		display: 'flex',
		maxHeight: '75%',
		overflow: 'scroll',
		border                     : '1px solid #ccc',
		background                 : '#fff',
		WebkitOverflowScrolling    : 'touch',
		borderRadius               : '0px',
		outline                    : 'none',
		padding                    : '0px'
	}
};

const Authentication = ({
	closeAuthModal,
	modalIsOpen,
	modalContentType,
	getLoginFields,
	getSignUpFields,
	handleLogin,
	handleSignup,
	setModalContent
}) => {
	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeAuthModal}
			contentLabel="Modal"
			className="column medium-6 small-10"
			style={ modalStyles }>
			<div className="column medium-12 small-12">
				<div className="medium-12 small-12 row align-right">
					<button className="no-padding-x button clear"
						onClick={closeAuthModal}>
						Close
					</button>
				</div>
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
								onSubmit={handleLogin.bind(this)} />
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
			
		</Modal>
	);
};

export default Authentication;