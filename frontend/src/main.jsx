import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginPage from "./pages/LoginPage.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import TaskListPage from "./pages/TaskListPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProtectedRoute from "./pages/component/ProtectedRoute.jsx";

const router = createBrowserRouter([
    {
        path:'/',
        element:<LoginPage />,
        errorElement:<NotFoundPage/>
    },
    {
        path:'/signup',
        element:<SignupPage />
    },
    {
        path:'/home',
        element: <TaskListPage />
    }


]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
