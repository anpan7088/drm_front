// App.js
import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Button, Container } from 'react-bootstrap'

// Bootstrap Bundle JS, bootstrap.css is imported in the App.scss
import "./scss/App.scss"

import Topbar from './components/Topbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from "./components/Register";
import Profile from "./pages/UserProfile";
import DormsManagement from "./pages/DormsManagement";
import DormReviewManagement from "./pages/DormReviewManagement";
import DormPage from "./pages/DormPage";
import Footer from "./components/Footer";
import Carusels from './pages/Carusels';
import Locations from './pages/Locations';

// Create a router object, which is an object that contains all the routes
const router = createBrowserRouter([
    {   path: "contact",
        element: <Contact />,
    },
    {   path: "about",
        element: <About />,
    },
    {   path: "profile",
        element: <Profile />,
    },
    {
        path: "locations",
        element: <Locations />,
    },
    {   path: "dorms",
        element: <DormsManagement />,
    },
    {   path: "reviews",
        element: <DormReviewManagement />,
    },
    {   path: "dorm/:dormID",
        element : <DormPage />,
    },
    {   path: "register",
        element: <Register />,
    },
    {   path: "carusels",
        element: <Carusels />,
    },
    {   path: "*",
        element: <Home />,
    },
    
]);

// The App component is the root component of the application
function App() {
    return (
        <div className='app'>
            <Topbar />
            <Container>
                <RouterProvider router={router} />
            </Container>
            <Footer />
        </div>
    )
}

export default App
