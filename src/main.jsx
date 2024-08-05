// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { LoginProvider } from './context/loginContext.jsx';

// Create a root element to render the React app
// this is the entry point of the app, and some boilerplate generated from vite create react app
// LoginProvider is a context provider, which is a component that provides the login context to the app
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <LoginProvider>
            <App />
        </LoginProvider>
    </React.StrictMode>,
)
