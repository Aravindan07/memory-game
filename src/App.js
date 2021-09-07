import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import GamePage from "./pages/GamePage/GamePage";

function App() {
	return (
		<div>
			<Switch>
				<Route exact path="/play-game" component={GamePage} />
				<Route exact path="/" component={HomePage} />
			</Switch>
		</div>
	);
}

export default App;
