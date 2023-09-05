import React, { createContext, useState, Children } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);
	const [url] = useState('');

	async function checkSession() {
		let retVal = false;
		await fetch('/session')
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return null;
			}).then(data => {
				if (data !== null) {
					setUser(data.user);
					retVal = data.user;
				}
			})
		return retVal;
	}

	return (<UserContext.Provider value={{ user, setUser, checkSession }}>{children}</UserContext.Provider>);
}

export { UserContext }