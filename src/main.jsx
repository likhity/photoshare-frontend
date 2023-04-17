import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import App from './App';
import FrontPage from './routes/front-page';
import LoginPage from './routes/login';
import LogOut from "./routes/logout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <FrontPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "logout",
                element: <LogOut />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
