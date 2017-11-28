import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../../../state/ducks/authentication';
import { uistate_authmodalActions } from '../../../state/ducks/uistate_authmodal';
import Navbar from '../../components/Navbar/Navbar';

const mapStateToProps = state => ({
	currentAuthStatus: state.currentAuthStatus
});
const mapDispatchToProps = {
	openModal: uistate_authmodalActions.requestModalOpen,
	setModalContent: uistate_authmodalActions.requestModalContentSet,
	closeModal: uistate_authmodalActions.requestModalClose,
	logout: authActions.requestLogOut
};

class NavigationContainer extends Component {
	render() {
		let {
			currentAuthStatus,
			setModalContent,
			openModal,
			closeModal,
			logout
		} = this.props;

		let navbarProps = {
			authStatus: currentAuthStatus.get('status'),
			currentUser: currentAuthStatus.get('currentUser'),
			setModalContent,
			openModal,
			closeModal,
			logout
		};

		return (
			<Navbar {...navbarProps} />
		);
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);