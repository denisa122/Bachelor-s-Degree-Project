import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import './PrivateRoute.css';

const PrivateRoute = ({ element: Component, isAuthenticated }) => {
    const [showError, setShowError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
                setRedirect(true);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isAuthenticated]);

    if (isAuthenticated) {
        return Component;
    }

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <>
        {showError && <div className="error-popup text-center">You must be logged in to view this page. <br></br>Redirecting to login page...</div>}
        </>
    )
};

export default PrivateRoute;