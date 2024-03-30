import React from "react";
import {Link,useNavigate} from "react-router-dom";
import {FiArrowRight} from "react-icons/fi";

const SignupPage = () => {
    const navigate = useNavigate();
    const handleSignup = () => {
        navigate("/home");
    };
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-black rounded-lg p-8 max-w-md w-full">
                <h2 className="text-white text-2xl mb-4">Signup Page</h2>
                <div className="mb-4">
                    <label htmlFor="firstname" className="block text-white mb-2">First Name</label>
                    <input type="text" id="firstname"
                           className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-yellow-500"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="lastname" className="block text-white mb-2">Last Name</label>
                    <input type="text" id="lastname"
                           className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-yellow-500"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input type="email" id="email"
                           className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-yellow-500"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-white mb-2">Password</label>
                    <input type="password" id="password"
                           className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-yellow-500"/>
                </div>
                <button className="bg-yellow-500 text-black py-2 px-4 rounded w-full mb-4" onClick={handleSignup}>Signup</button>
                <div className="flex items-center justify-center">
                    <Link to="/" className="text-white flex items-center">
                        <span className="mr-1">Or Login</span>
                        <FiArrowRight/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
