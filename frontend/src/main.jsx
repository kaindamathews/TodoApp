import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginPage from "./pages/LoginPage.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import TaskListPage from "./pages/TaskListPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProtectedRoute from "./pages/component/ProtectedRoute.jsx";
import {AuthProvider} from "./pages/component/AuthProvider.jsx";

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
        element:<ProtectedRoute><TaskListPage /></ProtectedRoute>
    }


]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>
)
