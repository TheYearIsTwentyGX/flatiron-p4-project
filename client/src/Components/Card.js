import React from "react";
import "./Card.css";

function Card(props) {
	const { title = null, value = "", children } = props;
	return (
		<div className="card-root">
			{title === null ? title : (<h1>{title}</h1>)}
			{value === "" ? children : <p>{value}</p>}
		</div>
	);
}

export default Card;