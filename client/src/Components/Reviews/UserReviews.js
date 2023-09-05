import React from 'react';
import Card from '../Card';

export default function UserReviews({ review }) {
	return (
		<Card>
			<div className='general-flex'>
				<div className='upright-flex'>
					<h2>{review.album.Title}</h2>
					<img width={375} height={375} src={review.album.AlbumArt} alt={review.album.Title} />
					<p>Review Post Date: {new Date(review.review.created_at).toLocaleString()}</p>
					<p>Last Edited: {new Date(review.review.updated_at).toLocaleString()}</p>
				</div>
				<div className='upright-flex'>
					<h3>{review.review.Title}</h3>
					<p>{review.review.Body}</p>
				</div>
			</div>
		</Card>
	)
}