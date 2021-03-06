import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

export default function configureStore(initialState) {
	const middlewares = [thunk];

	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(...middlewares),
			// Add support for Redux dev tools
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	);

	if(module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextReducer = require('../reducers').default;
			store.replaceReducer(nextReducer);
		})
	}
	return store;
}
