import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>
);