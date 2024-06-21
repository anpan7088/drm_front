import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Button } from 'react-bootstrap'

// Bootstrap Bundle JS, bootstrap.css is imported in the App.scss
import "./scss/App.scss";
import "./scss/custom.scss"
// #mkd java script za bootstrap ne sum siguren bash dali treba oti upotrebuime komponenti react-bootstrap
// ali neka sto via red sea za sega
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from './pages/Home';
import About from './pages/About';
import Topbar from './components/Topbar';
import Contact from './pages/Contact';
import Register from "./components/Register";
import Profile from "./pages/UserProfile";
import DormsManagement from "./pages/DormsManage";
import DormReviewManagement from "./pages/DormReviewManagement";
import Footer from "./components/Footer";
import DormPage from "./pages/DormPage";

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
