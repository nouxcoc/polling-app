import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import './App.scss';
import { history } from './_helpers/history';

function App() {
	return (
		<div className="App">
			<Router history={history}>
				<div className="container py-4">
					<Switch>
						{routes.map((route, i) => (
							<Route
								key={i}
								path={route.path}
								render={(props) => <route.component {...props} routes={route.routes} />}
							/>
						))}
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
