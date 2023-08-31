import React, { createContext, useState, Children } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);
	const [url] = useState('');


	return (<UserContext.Provider value={{ user, setUser, url }}>{children}</UserContext.Provider>);
}

export { UserContext }