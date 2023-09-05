import React, { useContext, useEffect } from 'react';
import './Sidebar.css';
import { useHistory, NavLink } from 'react-router-dom';
import { UserContext } from './Context/UserContext';

export default function Sidebar() {
	const history = useHistory();
	const { user, checkSession } = useContext(UserContext);

	useEffect(async () => {
		if (user === null) {
			const sessionStatus = await checkSession();
			console.log("Session status: ", sessionStatus)
			if (sessionStatus)
				return;
			else {
				console.log("pushing to login from Sidebar")
				history.push('/login');
			}
		}
	}, []);

	function isLoggedIn() {
		return user !== null && user?.id !== undefined;
	}

	return (
		<div className="sidebar">
			<NavLink to="/home" activeClassName="active" className="sidebar-item">Home</NavLink>
			{isLoggedIn() ? null : <NavLink to="/login" activeClassName="active" className="sidebar-item">Sign In</NavLink>}
			{isLoggedIn() ? <NavLink to="/my-reviews" activeClassName="active" className="sidebar-item">My Reviews</NavLink> : null}
			<NavLink to="/albums" activeClassName="active" className="sidebar-item">Albums</NavLink>
			{isLoggedIn() ? null : <NavLink to="/signup" activeClassName="active" className="sidebar-item">Sign Up</NavLink>}
			{isLoggedIn() ? <NavLink to="/logout" activeClassName="active" className="sidebar-item">Logout</NavLink> : null}
		</div>
	)
}