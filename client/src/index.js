import React, {createContext} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App'
import UserStore from "./store/UserStore";
import PublicationStore from "./store/PublicationStore";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
export const Context = createContext(null)

root.render(
    <Context.Provider value={{
        user: new UserStore(),
        publication: new PublicationStore()
    }}>
        <App />
    </Context.Provider>,
)