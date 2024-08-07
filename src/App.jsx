// App.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Container } from 'react-bootstrap'

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
import UserManagment from "./pages/UserManagment";
import useAutoHideFooter from "./hooks/useAutoHideFooter";

// Create a router object, which is an object that contains all the routes
// The router object is used to render the components, acording to the url
// createBrowserRouter is a function that takes an array of objects, each object is a route
// this is standard router from react-router-dom
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
    {   path: "users",
        element: <UserManagment />,
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
// It contains the router provider, which is used to render the routes,
// RouterProvider is a component from react-router-dom, it takes the router object as a prop
function App() {
    useAutoHideFooter(); // Call the hook to automatically hide the footer
    
    // The App component returns the router provider, which is used to render the routes
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
