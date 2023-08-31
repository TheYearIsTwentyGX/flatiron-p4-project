import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "../Card";
import { ItemContext } from "../Context/ItemContext";
import Album from "./Album";
import { UserContext } from "../Context/UserContext";

export default function Albums() {
	const { albums, setAlbums } = useContext(ItemContext);
	const { user, url } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		if (user === null) {
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
			<div className="general-flex">
				{albums.map((album) => (<Album key={album.id} album={album} />))}
			</div>
		</div>
	)
}