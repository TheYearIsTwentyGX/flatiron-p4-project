import React from 'react';
import './Sidebar.css';
import { useHistory, NavLink } from 'react-router-dom';

export default function Sidebar() {
	const history = useHistory();

	return (
		<div className="sidebar">
			<NavLink to="/home" activeClassName="active" className="sidebar-item">Home</NavLink>
			<NavLink to="/login" activeClassName="active" className="sidebar-item">Sign In</NavLink>
			<NavLink to="/albums" activeClassName="active" className="sidebar-item">Albums</NavLink>
			<NavLink to="/signup" activeClassName="active" className="sidebar-item">Sign Up</NavLink>
		</div>
	)
}