import React from "react";
import "./styles.css";

function Card({ value, handleClick, index, isFlipped, isDisabled }) {
	const cardClickHandler = () => {
		return !isFlipped && !isDisabled && handleClick(index);
	};

	const classNames = () => {
		if (isFlipped) {
			return "card-opened is-flipped";
		}
		if (isDisabled) {
			return "card is-disabled";
		} else {
			return "card";
		}
	};

	return (
		<div className={classNames()} onClick={cardClickHandler}>
			<div className="card-front-face"></div>
			<div className="card-back-face">
				<p className="value">{value}</p>
			</div>
		</div>
	);
}

export default Card;
