import React, { useContext } from 'react';
import './Sidebar.css';
import { useHistory, NavLink } from 'react-router-dom';
import { UserContext } from './Context/UserContext';

export default function Sidebar() {
	const history = useHistory();
	const { user } = useContext(UserContext);

	console.log(user)

	function isLoggedIn() {
		return user !== null && user?.id !== undefined;
	}

	return (
		<div className="sidebar">
			<NavLink to="/home" activeClassName="active" className="sidebar-item">Home</NavLink>
			{isLoggedIn() ? null : <NavLink to="/login" activeClassName="active" className="sidebar-item">Sign In</NavLink>}
			<NavLink to="/albums" activeClassName="active" className="sidebar-item">Albums</NavLink>
			<NavLink to="/reviews" activeClassName="active" className="sidebar-item">Reviews</NavLink>
			{isLoggedIn() ? null : <NavLink to="/signup" activeClassName="active" className="sidebar-item">Sign Up</NavLink>}
			{isLoggedIn() ? <NavLink to="/logout" activeClassName="active" className="sidebar-item">Logout</NavLink> : null}
		</div>
	)
}