import React from 'react';
import Button from '@atlaskit/button';
import { Link } from "react-router-dom";

const Navbar = ({
	authStatus,
	currentUser,
	setModalContent,
	openModal,
	logout
}) => (
	<nav className="Navbar">
		<ul className="Navbar_uncollapsed">
			{/* lone links */}
			<li>
				<Link to='/'>
					Horizan
				</Link>
			</li>

			{/* Grouped links */}
			<li>
				{
					authStatus !== 'Authenticated!' ? (
						<ul className="Navbar_uncollapsed_links">
							<li>
								<Button
									onClick={() => {
										setModalContent('LOGIN')
										openModal()
									}}>
									Login / Sign up
								</Button>
							</li>
						</ul>
					) : (
						<ul className="Navbar_uncollapsed_links">
							<li>
								<Link to='/profile'>
									{
										!!currentUser ? currentUser.email : null
									}
								</Link>
							</li>
							<li>
								<Button
									onClick={logout}>
									Logout
								</Button>
							</li>
						</ul>
					)
				}
			</li>
		</ul>

		{/* Mobile nav */}
	</nav>
);

export default Navbar;