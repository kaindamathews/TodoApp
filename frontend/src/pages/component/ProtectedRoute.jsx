import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const accessToken = localStorage.getItem('access_token');

    return (
        <Route
            {...rest}
            element={accessToken ? <Element /> : <Navigate to="/login" replace />}
        />
    );
};

export default ProtectedRoute;
