import React, { createContext, useState, Children } from 'react';

const ItemContext = createContext();

export function ItemProvider({ children }) {
	const [albums, setAlbums] = useState([]);
	return (<ItemContext.Provider value={{ albums, setAlbums }}>{children}</ItemContext.Provider>);
}

export { ItemContext }