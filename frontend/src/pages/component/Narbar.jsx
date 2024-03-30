import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
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
                                <Link to="/logout" className="block py-2 px-4 hover:bg-gray-700">Logout</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
