import React, { useCallback, useEffect, useRef, useState } from "react";
import { Prompt } from "react-router";
import Card from "../../components/Card/Card";
import { data } from "../../data";
import { shuffle } from "../../utils/shuffle";
import Header from "../../components/Header/Header";
import AllCorrect from "../../components/AllCorrect/AllCorrect";
import "./GamePage.css";

function GamePage() {
	const [cards, setCards] = useState(() => shuffle(data));
	const [noOfMoves, setNoOfMoves] = useState(0);
	const [matches, setMatches] = useState([]);
	const [openedCards, setOpenedCards] = useState([]);
	const [allMatched, setAllMatched] = useState(false);
	const timeout = useRef(null);

	// Check whether two opened cards have the same value
	const checkCards = useCallback(() => {
		const [first, second] = openedCards;
		const firstCard = cards.find((card) => card.id === first);
		const secondCard = cards.find((card) => card.id === second);
		if (firstCard.value === secondCard.value) {
			setMatches((prevMatches) => [
				...prevMatches,
				{ id: first, value: firstCard.value },
				{ id: second, value: secondCard.value },
			]);
			setOpenedCards([]);
		} else {
			timeout.current = setTimeout(() => {
				setOpenedCards([]);
			}, 500);
		}
	}, [cards, openedCards]);

	// Check whether all cards are matched
	const checkCompletion = useCallback(() => {
		if (matches.length === cards.length) {
			setAllMatched(true);
		}
	}, [cards.length, matches.length]);

	// Click Handler for Cards
	const handleCardClick = (index) => {
		if (openedCards.length === 1) {
			setOpenedCards((prevCards) => [...prevCards, index]);
			setNoOfMoves((moves) => moves + 1);
		} else {
			setOpenedCards([index]);
		}
	};

	// Check whether a card is flipped or not
	const checkIsFlipped = (value) => {
		return openedCards.includes(value);
	};

	// Check if a card is matched and hence disable it
	const checkIsDisabled = (card) => {
		return matches.find((item) => item.id === card.id);
	};

	useEffect(() => {
		let timer;
		if (openedCards.length === 2) {
			timer = setTimeout(checkCards, 300);
		}
		return () => clearTimeout(timer);
	}, [openedCards.length, checkCards]);

	useEffect(() => {
		checkCompletion();
	}, [matches, checkCompletion]);

	// Handler for page reload
	const handleBeforeUnload = (e) => {
		e.preventDefault();
		const message = "Are you sure you want to leave?";
		e.returnValue = message;
		return message;
	};

	useEffect(() => {
		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	// Handler for restart
	const restartClickHandler = () => {
		setNoOfMoves(0);
		setOpenedCards([]);
		setMatches([]);
		setCards(shuffle(data));
		setAllMatched(false);
	};

	return (
		<>
			<Prompt when={!allMatched} message="Are you sure you want to leave?" />
			<div className="game-page-wrapper">
				<Header
					noOfMoves={noOfMoves}
					matches={matches}
					restartClickHandler={restartClickHandler}
				/>
				<div className="game-board">
					{cards.map((item) => (
						<Card
							key={item.id}
							value={item.value}
							index={item.id}
							handleClick={handleCardClick}
							isFlipped={checkIsFlipped(item.id)}
							isDisabled={checkIsDisabled(item)}
						/>
					))}
					{allMatched && <AllCorrect restartClickHandler={restartClickHandler} />}
				</div>
			</div>
		</>
	);
}

export default GamePage;
