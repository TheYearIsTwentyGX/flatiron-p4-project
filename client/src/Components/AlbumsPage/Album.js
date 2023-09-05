import React, { useState, useContext, useEffect } from "react";
import Card from "../Card";
import "./Album.css";
import { UserContext } from "../Context/UserContext";
import { useHistory } from "react-router-dom";
import { ItemContext } from "../Context/ItemContext";

export default function Album({ album }) {
	const { user, url } = useContext(UserContext);
	const { albums, setAlbums } = useContext(ItemContext);
	const [composing, setComposing] = useState(false);
	album.HasReviewed = album.Reviews.some((review) => review.user_id === user.id);
	const [formValues, setFormValues] = useState({
		album_id: album.id, user_id: user.id,
		Title: (album.HasReviewed ? album.Reviews.find(x => x.user_id == user.id).Title ?? "" : ""),
		Body: (album.HasReviewed ? album.Reviews.find(x => x.user_id == user.id).Body ?? "" : "")
	});
	const [errors, setErrors] = useState([]);
	const history = useHistory();

	function handleChange(e) {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	}

	function postReview(e) {
		const postOrPatch = album.HasReviewed ? [album.Reviews.find(x => x.user_id === user.id).id, "PATCH"] : ["", "POST"];
		e.preventDefault();
		fetch(`/reviews/${postOrPatch[0]}`, {
			method: postOrPatch[1],
			credentials: "same-origin",
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
				console.log("Data: ", data);
				if (postOrPatch[1] === "PATCH")
					album.Reviews = album.Reviews.filter(x => x.user_id !== user.id);
				else {
					album.ReviewCount++;
					album.HasReviewed = true;
				}
				album.Reviews.push(data);

				setAlbums(albums.map(x => x.id == album.id ? album : x));
				setComposing(false);
				history.push(`/albums/${album.id}`);
			})
			.catch((err) => console.error(err));
	}

	function viewAlbum(e) {
		history.push(`/albums/${album.id}`);
	}

	function deleteReview(e) {
		e.preventDefault();
		let review = album.Reviews.find(x => x.user_id == user.id);
		fetch(`/reviews/${review.id}`, {
			method: "DELETE",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formValues)
		})
			.then((res) => {
				if (res.status === 204) {
					const index = album.Reviews.indexOf(review);
					album.Reviews.splice(index, 1);
					album.ReviewCount--;
					album.HasReviewed = false;
					setAlbums(albums.map(x => x.id == album.id ? album : x));
					setErrors([]);
					setFormValues({ ...formValues, Title: "", Body: "" });
				}
				else
					return res.json();
			}).then((data) => { if (data !== undefined) setErrors(data.errors ?? data); })
			.then(console.log(errors))
			.catch((err) => setErrors([err]));
	}

	function startReview() {
		setComposing(true);
	}
	return (
		<div className="card-contents">
			<Card >
				<div onClick={viewAlbum} className="clickable-area">
					<h1>{album.Title}</h1>
					<h2 className="artist-text">{album.Artist}</h2>
					<img width={425} height={425} src={album.AlbumArt} alt={album.Title} />
				</div>
				<div className="general-flex">
					<p className="count-text">{`${album.TrackCount} ${(album.TrackCount > 1 ? "tracks" : "track")}`}</p>
					<div onClick={viewAlbum} className="clickable-area">
						<p className="count-text">{`${album.ReviewCount} ${(album.ReviewCount === 1 ? "review" : "reviews")}`}</p>
					</div>
				</div> {
					errors.length > 0
						? <div>
							<p className="error">{"Error(s) have occurred:"}</p>
							{errors.map((error) => <p className="error" key={error}>{error}</p>)}
						</div>
						: null
				}
				<div className="general-flex">
					<button onClick={startReview} className={composing ? "hidden" : "review-button"}>{album.HasReviewed ? "Edit your" : "Write a"} Review</button>
					{album.HasReviewed ? <button onClick={deleteReview} className={composing ? "hidden" : "review-button"}>Delete your Review</button> : null}
				</div>
				<div className={composing ? "review-form" : "hidden"}>
					<form>
						<div>
							<label htmlFor="Title">Review</label>
							<input value={formValues.Title} onChange={handleChange} className="fancy-textblock" type="text" name="Title" />
						</div>
						<textarea value={formValues.Body} onChange={handleChange} className="fancy-textblock" name="Body" />
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