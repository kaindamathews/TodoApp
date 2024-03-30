import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const LoginPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-black rounded-lg p-8 max-w-md w-full">
                <h1 className="text-white text-2xl mb-4">Login Page</h1>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-white mb-2">Username</label>
                    <input type="text" id="username" className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-yellow-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-white mb-2">Password</label>
                    <input type="password" id="password" className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-yellow-500" />
                </div>
                <button className="bg-yellow-500 text-black py-2 px-4 rounded w-full mb-4">Login</button>
                <div className="flex items-center justify-center">
                    <Link to="/signup" className="text-white flex items-center">
                        <span className="mr-1">Or Sign up</span>
                        <FiArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
