import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = async () => {
        try {
            // Send request to logout endpoint
            const response = await fetch("http://localhost:8080/api/v1/auth/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            if (response.ok) {
                localStorage.removeItem('access_token');
                navigate('/');

            } else {
                console.error("Failed to logout");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <nav className="flex justify-between items-center bg-gray-800 p-4 fixed top-0 left-0 right-0">
            <div className="text-white">Welcome, [User Name]</div>
            <div className="relative">
                <button className="text-white" onClick={toggleDropdown}>
                    <FiUser />
                </button>
                {showDropdown && (
                    <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-md shadow-md p-2">
                        <ul>
                            <li>
                                <Link to="/profile" className="block py-2 px-4 hover:bg-gray-700">Profile</Link>
                            </li>
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
