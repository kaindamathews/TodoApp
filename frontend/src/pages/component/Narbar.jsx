import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = async () => {
                localStorage.removeItem('access_token');
                navigate('/');
    };

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/users/getUserProfile", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
                    }
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUserName(userData.firstname);
                } else {
                    console.error("Failed to fetch user profile");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        getUserProfile();
    }, []);

    return (
        <nav className="flex justify-between items-center bg-gray-800 p-4 fixed top-0 left-0 right-0">
            <div className="text-white">Welcome, {userName}</div>
            <div className="relative">
                <button className="text-white" onClick={toggleDropdown}>
                    <FiUser />
                </button>
                {showDropdown && (
                    <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-md p-2">
                        <ul>
                            <li>
                                <button onClick={handleLogout} className="block py-2 px-4 hover:bg-gray-700">Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
