import React from "react";
import { useHistory } from "react-router";
import "./HomePage.css";

function HomePage() {
	const history = useHistory();

	const startButtonClickHandler = () => {
		return history.push("/play-game");
	};

	return (
		<div className="homepage-wrapper">
			<h1 className="heading">Memory Game</h1>
			<button className="button start-button" onClick={startButtonClickHandler}>
				Start
			</button>
		</div>
	);
}

export default HomePage;
