import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import { useHistory } from 'react-router-dom';
import UserReviews from './UserReviews';

export default function MyReviews() {
	const [reviews, setReviews] = useState([]);
	const { user, checkSession } = useContext(UserContext);
	const history = useHistory();


	useEffect(async () => {
		let currentUser = user;
		if (user === null) {
			const sessionStatus = await checkSession();
			if (sessionStatus === false) {
				console.log("pushing to login from MyReviews")
				history.push('/login');
				return;
			}
			currentUser = sessionStatus;
		}

		fetch(`/users/${currentUser.id}/reviews`)
			.then(res => res.json())
			.then(data => {
				console.log(data)
				if (data.hasOwnProperty('errors'))
					return;
				setReviews(data);
			})
	}, []);

	return (
		<div>
			<h1>My Reviews</h1>
			{reviews.length > 0 ? reviews.map(review => (<UserReviews key={review.review.id} review={review} />)) : null}
		</div>
	)
}