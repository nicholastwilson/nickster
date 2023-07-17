import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";
import store from "./store/store.js";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </HashRouter>
    </React.StrictMode>
);