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
import UploadPage from './routes/upload';
import SignupPage from './routes/signup';
import User from './routes/user';
import UserPhotos from './routes/user-photos';
import Popular from './routes/popular';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <FrontPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "logout",
                element: <LogOut />
            },
            {
                path: "upload",
                element: <UploadPage />
            },
            {
                path:"signup",
                element: <SignupPage />
            },
            {
                path: "u/:userId",
                element: <User />,
                children: [
                    {
                        path: "",
                        element: <UserPhotos />
                    }
                ]
            },
            {
                path: "popular",
                element: <Popular />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
