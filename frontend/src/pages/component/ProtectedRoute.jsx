import { useEffect} from 'react';
import {useAuth} from './AuthProvider';
import {useNavigate} from "react-router-dom";

const ProtectedRoute = ({children }) => {
    const accessToken = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!accessToken) {
            navigate('/', { replace: true });
        }
    }, [navigate, accessToken]);

    return children;
};

export default ProtectedRoute;


