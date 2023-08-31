import React, { useState, useContext } from "react";
import Card from "../Card";
import "./Album.css";
import { UserContext } from "../Context/UserContext";

export default function Album({ album }) {
	const { user, url } = useContext(UserContext);
	const [composing, setComposing] = useState(false);
	const [formValues, setFormValues] = useState({ album_id: album.id, user_id: user.id });
	const [errors, setErrors] = useState([]);
	function handleChange(e) {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	}

	function postReview(e) {
		e.preventDefault();
		fetch(`/reviews`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formValues)
		})
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data) || data.errors !== undefined) {
					setErrors(data.errors ?? data);
					return;
				}
				album.ReviewCount++;
				setComposing(false);
			})
			.catch((err) => console.error(err));
	}

	function startReview() {
		setComposing(true);
	}
	return (
		<div className="card-contents">
			<Card title={album.Title}>
				<h2 className="artist-text">{album.Artist}</h2>
				<img src={album.AlbumArt} alt={album.Title} />
				<div className="general-flex">
					<p className="count-text">{`${album.TrackCount} ${(album.TrackCount > 1 ? "tracks" : "track")}`}</p>
					<p className="count-text">{`${album.ReviewCount} ${(album.ReviewCount === 1 ? "review" : "reviews")}`}</p>
				</div>
				<button onClick={startReview} className={composing ? "hidden" : "review-button"}>Write a Review</button>
				<div className={composing ? "review-form" : "hidden"}>
					<form>
						<div>
							<label htmlFor="Title">Review</label>
							<input onChange={handleChange} className="fancy-textblock" type="text" name="Title" />
						</div>
						<textarea onChange={handleChange} className="fancy-textblock" name="Body" />
					</form>
					<div className="general-flex">
						<button className="review-button" onClick={postReview}>Submit</button>
						<button className="review-button cancel-button" onClick={() => setComposing(false)}>Cancel</button>
					</div>
				</div>
			</Card>
		</div>
	)
}