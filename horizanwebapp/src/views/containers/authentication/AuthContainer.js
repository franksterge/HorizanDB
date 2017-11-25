import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { authActions } from '../../../state/ducks/authentication';
import { uistate_authmodalActions } from '../../../state/ducks/uistate_authmodal';
import Authentication from '../../components/authentication/Authentication';

const mapStateToProps = state => ({
	currentAuthStatus: state.currentAuthStatus,
	uiStateAuthModal: state.uiStateAuthModal
});
const mapDispatchToProps = {
	requestLogin: authActions.requestLogin,
	requestSignup: authActions.requestSignup,
	openModal: uistate_authmodalActions.openModal,
	closeModal: uistate_authmodalActions.closeModal,
	setModalContent: uistate_authmodalActions.requestModalContentSet
};

class AuthContainer extends Component {
	openAuthModal() {
    this.setState({
      authModalIsOpen: true
    })
  }
	handleLogin(e) {}
	handleSignup(e) {
		e.preventDefault();

		let { target } = e;

		let name = target.name.value;
		let email = target.email.value;
		let password = target.email.password;
		let confirmPassword = target.email.confirmPassword;

		if (!name ||
				!email ||
				!password ||
				!confirmPassword) {
			throw new Error('Missing fields');
		} else if (password !== confirmPassword) {
			throw new Error('Passwords dont match');
		} else {
			this.props.requestSignup(email, password, name);
		}
	}
	getSignUpFields() {
		return [
			{
				type: 'text',
				name: 'firstname',
				isRequired: true,
				placeholder: 'First name',
				label: 'First name'
			},
			{
				type: 'text',
				name: 'lastname',
				isRequired: true,
				placeholder: 'Last name',
				label: 'Last name'
			},
			{
				type: 'email',
				name: 'email',
				isRequired: true,
				placeholder: 'name@email.com',
				label: 'Email'
			},
			{
				type: 'password',
				name: 'password',
				isRequired: true,
				placeholder: '',
				label: 'Password'
			},
			{
				type: 'password',
				name: 'confirmPassword',
				isRequired: true,
				placeholder: '',
				label: 'Confirm password'
			},
			{
				type: 'submit',
				text: 'Signup'
			}
		];
	}
	getLoginFields() {
		return [
			{
				type: 'email',
				name: 'email',
				isRequired: true,
				placeholder: 'name@email.com',
				label: 'Email'
			},
			{
				type: 'password',
				name: 'password',
				isRequired: true,
				placeholder: '',
				label: 'Password'
			},
			{
				type: 'submit',
				text: 'Login'
			}
		];
	}
	render() {
		let { props, state } = this;

		let authenticationProps = {
			closeAuthModal: props.closeModal,
			modalIsOpen: props.uiStateAuthModal.get('modalIsOpen'),
			modalContentType: props.uiStateAuthModal.get('modalContentType'),
			getLoginFields: this.getLoginFields,
			getSignUpFields: this.getSignUpFields,
			handleLogin: this.handleLogin,
			handleSignup: this.handleSignup,
			setModalContent: props.setModalContent
		};

		return <Authentication {...authenticationProps} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);