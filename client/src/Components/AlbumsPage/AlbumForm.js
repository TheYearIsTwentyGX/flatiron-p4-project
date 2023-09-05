import React, { useState, useContext, useEffect } from "react";
import Card from "../Card";
import { UserContext } from "../Context/UserContext";
import { useHistory } from "react-router-dom";

export default function AlbumForm() {
	const [formValues, setFormValues] = useState({});
	const [errors, setErrors] = useState([]);
	const { user, checkSession } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		if (user === null && !checkSession()) {
			history.push("/login");
			return;
		}
	}, []);

	function handleChange(e) {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		fetch(`/albums`, {
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

				history.push("/albums");
			})
	}
	return (
		<Card title="Create a new Album">
			<form onSubmit={handleSubmit}>
				<div className="general-flex">
					<div className="upright-flex">
						<label htmlFor="title">Album Title</label>
						<input onChange={handleChange} type="text" className="fancy-textblock" name="Title" id="title" />
						<label htmlFor="artist">Album Artist</label>
						<input onChange={handleChange} type="text" className="fancy-textblock" name="Artist" id="artist" />
						<label htmlFor="track-count">Track Count</label>
						<input onChange={handleChange} type="number" className="fancy-textblock" name="TrackCount" id="track-count" />
					</div>
					<div className="vTop-hCenter-flex">
						<div className="upright-flex">
							<label htmlFor="album-art">Album Cover</label>
							<input onChange={handleChange} type="text" className="fancy-textblock" name="AlbumArt" id="album-art" />
							<button type="submit" className="standard-button">Submit</button>
						</div>
						<div className="upright-flex">
							<img className="spaced-image" height={300} src={formValues.AlbumArt} />
						</div>
					</div>
				</div>
			</form>
			{
				errors.length > 0
					? <div>
						<p className="error">{"Error(s) have occurred:"}</p>
						{errors.map((error) => <p className="error" key={error}>{error}</p>)}
					</div>
					: null
			}
		</Card>
	)
}