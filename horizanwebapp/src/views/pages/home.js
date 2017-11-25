import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthContainer from '../containers/authentication/AuthContainer';
import { uistate_authmodalActions } from '../../state/ducks/uistate_authmodal';
import store from '../../state/store/index';

const mapStateToProps = state => ({
	currentAuthStatus: state.currentAuthStatus,
	uiStateAuthModal: state.uiStateAuthModal
});
const mapDispatchToProps = {
	openModal: uistate_authmodalActions.openModal
};

class Home extends Component {
  render() {
		let { props } = this;
		let { currentAuthStatus } = props;

    return (
      <div className="App">
				<AuthContainer />
				<header>
					<nav className="Navbar">
						<div className="Logo">
							Horizan
						</div>
						<div className="Links">
							{
								currentAuthStatus.get('status') === 'Authenticated!' ? (
									<ul>
										<li>
											<Link to='/profile'>
												{
													currentAuthStatus.currentUser.email ||
													currentAuthStatus.currentUser.name
												}
											</Link>
										</li>
									</ul>
								) : (
									<ul>
										<li>
											<button onClick={props.openModal}>
												Login / Signup
											</button>
										</li>
									</ul>
								)
							}
						</div>
					</nav>
				</header>
			</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);