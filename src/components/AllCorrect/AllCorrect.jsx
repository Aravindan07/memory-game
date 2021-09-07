import React from "react";
import "./styles.css";

function AllCorrect({ restartClickHandler }) {
	return (
		<div className="wrapper">
			<h2>You got all Correct!!!</h2>
			<button className="button start-button" onClick={restartClickHandler}>
				Restart
			</button>
		</div>
	);
}

export default AllCorrect;
