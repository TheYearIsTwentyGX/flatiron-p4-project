import React, { createContext, useState, Children } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);


	return (<UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>);
}

export { UserContext }