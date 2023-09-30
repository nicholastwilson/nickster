import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from './features/storage/store';

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(
    // <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </HashRouter>
    // </React.StrictMode>
);