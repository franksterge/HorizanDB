import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import foundation from '../styles/foundation.min.css';
import App from '../styles/App.css';
import AuthContainer from '../containers/authentication/AuthContainer';
import { uistate_authmodalActions } from '../../state/ducks/uistate_authmodal';
import store from '../../state/store/index';

const mapStateToProps = state => ({
	currentAuthStatus: state.currentAuthStatus
});
const mapDispatchToProps = {
	openModal: uistate_authmodalActions.requestModalOpen
};

class Home extends Component {
  render() {
		let { props } = this;
		let { currentAuthStatus } = props;

		let authStatus = currentAuthStatus.get('status');
		let currentUser = currentAuthStatus.get('currentUser');

    return (
      <div className="App">
				<AuthContainer />
				<nav className="Navbar row simple">
					<div className="Logo column medium-10 small-5">
						<Link className="clear button" to="#">
							Horizan
						</Link>
					</div>
					<div className="Links column medium-2 small-5">
						{
							authStatus === 'Authenticated!' ? (
								<ul className="menu simple">
									<li>
										<Link className="clear button" to='/profile'>
											{
												currentAuthStatus.get('currentUser').email ||
												currentAuthStatus.currentUser.name
											}
										</Link>
									</li>
								</ul>
							) : (
								<ul className="menu simple">
									<li>
										<button className="clear button" onClick={props.openModal}>
											Login / Signup
										</button>
									</li>
								</ul>
							)
						}
					</div>
				</nav>
			</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);