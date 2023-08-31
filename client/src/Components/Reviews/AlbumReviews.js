import React, { useContext, useEffect, useState } from "react";
import { ItemContext } from "../Context/ItemContext";
import { UserContext } from "../Context/UserContext";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Card from "../Card";
import SingleReview from "./SingleReview";
import "./AlbumReviews.css";


export default function AlbumReviews() {
	const { albums, setAlbums } = useContext(ItemContext);
	const { user, url } = useContext(UserContext);
	const history = useHistory();
	const location = useLocation();
	const { id } = useParams();
	const [album, setAlbum] = useState(albums.find(x => x.id == id) ?? {});
	function exists(obj) {
		return obj !== null && obj !== undefined;
	}

	useEffect(() => {
		fetch("/albums/" + id)
			.then(res => res.json())
			.then(data => {
				setAlbum(data);
			})
	}, []);


	return (
		<div>
			<Card>
				<div className="center-row-flex">
					<h1 className="album-review-label">Reviews for: </h1>
					<h1 className="album-title">{album.Title}</h1>
				</div>
				<div className="general-flex">
					<img src={album.AlbumArt} alt={album.Title} />
					<div className="upright-flex vertical-center">
						<h3 className="artist-text-reviews" >{album.Artist}</h3>
						<h3>{album.TrackCount + " tracks"}</h3>
					</div>
				</div>
			</Card>
			<div>
				{exists(album) && exists(album.Reviews) ? album.Reviews.map(x => (<SingleReview key={x.id} review={x} album={album} />)) : null}
			</div>
		</div>
	)
}