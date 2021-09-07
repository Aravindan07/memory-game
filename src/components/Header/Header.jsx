import React from "react";
import "./styles.css";

function Header({ noOfMoves, matches, restartClickHandler }) {
	return (
		<div className="header-wrapper">
			<p
				style={{
					color: "#fff",
					margin: "1rem 0",
					fontSize: "16px",
					fontWeight: "800",
					letterSpacing: "0.6px",
				}}
			>
				No of Moves: {noOfMoves}
			</p>
			<p
				style={{
					color: "#fff",
					margin: "1rem 0",
					fontSize: "16px",
					fontWeight: "800",
					letterSpacing: "0.6px",
				}}
			>
				Matches: {matches.length / 2}
			</p>
			<button className="button start-button" onClick={restartClickHandler}>
				Restart
			</button>
		</div>
	);
}

export default Header;
