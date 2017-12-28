import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { authActions } from '../../../state/ducks/authentication';
import { uistate_authmodalActions } from '../../../state/ducks/uistate_authmodal';
import { uistate_feedbackActions } from '../../../state/ducks/uistate_feedback';
import Authentication from '../../components/Authentication/Authentication';

const mapStateToProps = state => ({
	currentAuthStatus: state.currentAuthStatus,
	uiStateAuthModal: state.uiStateAuthModal,
	uiStateFeedback: state.uiStateFeedback
});
const mapDispatchToProps = {
	requestLogin: authActions.requestLogin,
	requestSignup: authActions.requestSignup,
	openModal: uistate_authmodalActions.openModal,
	closeModal: uistate_authmodalActions.requestModalClose,
	setModalContent: uistate_authmodalActions.requestModalContentSet,
	emitFeedback: uistate_feedbackActions.emitFeedback,
	dismissFeedback: uistate_feedbackActions.dismissFeedback
};

class AuthContainer extends Component {
	handleLogin(e) {
		e.preventDefault();

		let { target } = e;

		let email = target.email.value;
		let password = target.password.value;

		if (!email ||
			!password) {
			throw new Error('Missing fields');
		} else {
			// location where ui feedback should start
			this.props.requestLogin(email, password);
		}
	}
	handleSignup(e) {
		e.preventDefault();

		let { target } = e;
		let { props } = this;

		let firstname = target.firstname.value;
		let lastname = target.lastname.value;
		let email = target.email.value;
		let password = target.password.value;
		let confirmPassword = target.confirmPassword.value;

		if (!firstname ||
			!lastname ||
			!email ||
			!password ||
			!confirmPassword) {
			throw new Error('Missing fields');
		} else if (password !== confirmPassword) {
			 props.emitFeedback('auth/passwords-dont-match');
		} else {
			// location where ui feedback should start
			props.requestSignup(email, password, firstname, lastname);
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
				text: 'Sign up'
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
		let { uiStateFeedback } = props;

		let authModalFeedback = !!uiStateFeedback.size && uiStateFeedback.get('uiLocatin') === 'AUTH_MODAL' ? uiStateFeedback : null;

		let authenticationProps = {
			closeAuthModal: props.closeModal,
			modalIsOpen: props.uiStateAuthModal.get('modalIsOpen'),
			modalContentType: props.uiStateAuthModal.get('modalContentType'),
			getLoginFields: this.getLoginFields,
			getSignUpFields: this.getSignUpFields,
			handleLogin: this.handleLogin.bind(this),
			handleSignup: this.handleSignup.bind(this),
			setModalContent: props.setModalContent,
			dismissFeedback: props.dismissFeedback,
			authModalFeedback
		};

		return <Authentication {...authenticationProps} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);