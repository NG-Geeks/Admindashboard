'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send POST request to login
            const response = await axios.post('/api/users/login', formData);

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.data));

            // Redirect based on role
            const userRole = response.data.role;
            if (userRole === 'Admin') {
                router.push('/dashboard'); // Admin Dashboard
            } else {
                router.push('/userdashboard'); // User Dashboard
            }
        } catch (err) {
            setError('Invalid credentials, please try again.');
        }
    };

    return (
        <div className="font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
                    {/* Left Section */}
                    <div>
                        <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
                            Seamless Login for Exclusive Access
                        </h2>
                        <p className="text-sm mt-6 text-gray-800">
                            Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.
                        </p>
                        <p className="text-sm mt-12 text-gray-800">
                            Don't have an account?{' '}
                            <a
                                href="/auth/signup"
                                className="text-blue-600 font-semibold hover:underline ml-1"
                            >
                                Register here
                            </a>
                        </p>
                    </div>

                    {/* Right Section */}
                    <form
                        className="max-w-md md:ml-auto w-full"
                        onSubmit={handleSubmit}
                    >
                        <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
                            Sign in
                        </h3>

                        {error && (
                            <div className="mb-4 text-red-500">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Username Field */}
                            <div>
                                <input
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                                    placeholder="Username"
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <input
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                                    placeholder="Password"
                                />
                            </div>

                            {/* Remember Me and Forgot Password */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-3 block text-sm text-gray-800"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a
                                        href="/forgot-password"
                                        className="text-blue-600 hover:text-blue-500 font-semibold"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="!mt-8">
                            <button
                                type="submit"
                                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
