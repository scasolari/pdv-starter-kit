import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // Assicurati che rootReducer sia corretto

// Verifica se il codice è eseguito lato client prima di applicare il middleware
const isClient = typeof window !== 'undefined';

// Usa l'applicazione del middleware solo lato client
const middleware = [thunk];

// Applica il middleware solo se siamo lato client
const enhancer = isClient ? applyMiddleware(...middleware) : undefined;

// Crea lo store con il reducer root e l'enhancer
export const store = createStore(rootReducer, enhancer);

// Crea il persistor solo lato client
export const persistor = isClient ? persistStore(store) : null;
