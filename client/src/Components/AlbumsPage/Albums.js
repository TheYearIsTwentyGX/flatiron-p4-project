import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ItemContext } from "../Context/ItemContext";
import Album from "./Album";
import { UserContext } from "../Context/UserContext";

export default function Albums() {
	const { albums, setAlbums } = useContext(ItemContext);
	const { setUser, user, checkSession } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		if (user === null && !checkSession()) {
			history.push("/login");
			return;
		}

		fetch(`/albums`)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				return null;
			})
			.then((data) => {
				if (data === null) {
					return;
				}
				setAlbums(data);
				console.log(data);
			})
	}, []);
	return (
		<div>
			<h1>Albums</h1>
			<button onClick={(e) => history.push("/albums/new")} className="standard-button">Add a new Album</button>
			<div className="general-flex">
				{albums.map((album) => (<Album key={album.id} album={album} />))}
			</div>
		</div>
	)
}