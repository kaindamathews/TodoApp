import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSignup = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    role: "USER"
                })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                navigate("/home");
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred while signing up. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-black rounded-lg p-8 max-w-md w-full">
                <h2 className="text-white text-2xl mb-4">Signup Page</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                    <label htmlFor="firstname" className="block text-white mb-2">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-yellow-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastname" className="block text-white mb-2">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-yellow-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-yellow-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-white mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-yellow-500"
                    />
                </div>





                
                <button
                    className="bg-yellow-500 text-black py-2 px-4 rounded w-full mb-4"
                    onClick={handleSignup}
                >
                    Signup
                </button>
                <div className="flex items-center justify-center">
                    <Link to="/" className="text-white flex items-center">
                        <span className="mr-1">Or Login</span>
                        <FiArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
