import React from "react";
import Card from "../Card";

export default function SingleReview({ review }) {

	return (
		<Card>
			<div className="upright-flex">
				<h2 className="review-title">{review.Title}</h2>
				<div className="general-flex">
					<h3 className="writer-title">Written by:</h3>
					<h3 className="writer">{review.Writer}</h3>
				</div>
				<p className="review-body">{review.Body}</p>
			</div>
		</Card>
	)
}