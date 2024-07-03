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
import DormsManagement from "./pages/DormsManage";
import DormReviewManagement from "./pages/DormReviewManagement";
import DormPage from "./pages/DormPage";
import Footer from "./components/Footer";
import Carusels from './pages/Carusels';

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


function App() {
    const [count, setCount] = useState(0)

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
