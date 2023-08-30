import React from "react";
import "./Card.css";

function Card(props) {
	const { title, value = "", children } = props;
	return (
		<div className="card-root">
			<h1>{title}</h1>
			{value === "" ? children : <p>{value}</p>}
		</div>
	);
}

export default Card;