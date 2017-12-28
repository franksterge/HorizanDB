import React from 'react';
import Button from '@atlaskit/button';
import {
  DropdownMenuStateless as Dropdown,
	DropdownItemGroup,
	DropdownItem
} from '@atlaskit/dropdown-menu';
import { Link } from "react-router-dom";

const getTriggerString = userInfo => {
	return !!userInfo ?
		(!!userInfo.firstname ? `${userInfo.firstname} ${userInfo.lastname}` : userInfo.email) :
		'Loading...'
};

const Navbar = ({
	authStatus,
	currentUser,
	setModalContent,
	openModal,
	logout,
	isDropdownOpen,
	toggleDropDown
}) => (
	<nav className="Navbar">
		<ul className="Navbar_list">
			{/* Contains the logo and displayed on all screen sizes */}
			<li className="Navbar_list_segment all">
				<Link to='/' className="Brand">
					Horizan
				</Link>
			</li>

			{/* Contains the dropdown manu for desktop/tablets */}
			<li className="Navbar_list_segment desktop_tablet">
				{
					authStatus === 'Authenticated!' ? (
						<Dropdown isOpen={isDropdownOpen}
							onOpenChange={toggleDropDown}
							trigger={ getTriggerString(currentUser) }
							triggerType="button"
							shouldFitContainer>
							<DropdownItemGroup>
								<DropdownItem>
									<Link to='/profile'>
										Profile
									</Link>
								</DropdownItem>
								<DropdownItem onClick={logout}>
									Log out
								</DropdownItem>
							</DropdownItemGroup>
						</Dropdown>
					) : (
						<Button onClick={() => {
								setModalContent('LOGIN')
								openModal()
							}}>
							Login / Sign up
						</Button>
					)
				}
			</li>
		</ul>
	</nav>
);

export default Navbar;