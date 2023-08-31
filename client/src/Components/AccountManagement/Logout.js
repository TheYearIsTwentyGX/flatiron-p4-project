import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Logout() {
	const history = useHistory();
	const { setUser } = useContext(UserContext);
	useEffect(() => {
		fetch('/logout', {
			method: 'POST',
			credentials: "same-origin",
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(d => {
			setUser(null);
			history.push('/login');
		})
	}, []);


	return (
		<div>
		</div>
	)
}