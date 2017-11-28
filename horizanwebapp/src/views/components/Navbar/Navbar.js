import React from 'react';
import { Link } from "react-router-dom";

const Navbar = ({
	authStatus,
	currentUser,
	setModalContent,
	openModal,
	closeModal,
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
								<button onClick={() => {
									setModalContent('LOGIN')
									openModal()
								}}>
									Login / Signup
								</button>
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
								<button onClick={logout}>
									Logout
								</button>
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