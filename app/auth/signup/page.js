'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'Editor',
    });
    const [error, setError] = useState('');
    const [validationError, setValidationError] = useState({});
    const router = useRouter();

    const validateInputs = () => {
        const errors = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address.';
        }

        // Password length validation
        if (!formData.password || formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';
        }

        setValidationError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInputs()) {
            return;
        }

        try {
            // Send POST request to create user
            const response = await axios.post('/api/users/signup', formData);

            // Store user data in localStorage after successful signup
            localStorage.setItem('user', JSON.stringify(response.data));

            // Redirect based on role
            if (response.data.role === 'Admin') {
                router.push('/dashboard');
            } else {
                router.push('/userdashboard');
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError('User already exists. Please log in instead.');
            } else {
                setError('An error occurred while signing up. Please try again.');
            }
        }
    };

    return (
        <div className="font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
                    {/* Left Section */}
                    <div>
                        <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-gray-800">
                            Join Our Platform
                        </h2>
                        <p className="text-sm mt-6 text-gray-800">
                            Create your account and get started today!
                        </p>
                        <p className="text-sm mt-12 text-gray-800">
                            Already have an account?{' '}
                            <a
                                href="/auth/login"
                                className="text-blue-600 font-semibold hover:underline ml-1"
                            >
                                Log in here
                            </a>
                        </p>
                    </div>

                    {/* Right Section */}
                    <form
                        className="max-w-md md:ml-auto w-full"
                        onSubmit={handleSubmit}
                    >
                        <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
                            Sign Up
                        </h3>

                        {error && (
                            <div className="mb-4 text-red-500">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Email Field */}
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent ${validationError.email ? 'border-red-500' : ''
                                        }`}
                                    placeholder="Email address"
                                />
                                {validationError.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {validationError.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <input
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent ${validationError.password ? 'border-red-500' : ''
                                        }`}
                                    placeholder="Password (min. 6 characters)"
                                />
                                {validationError.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {validationError.password}
                                    </p>
                                )}
                            </div>

                            {/* Role Selection */}
                            <div>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                                >
                                    <option value="Editor">Editor</option>
                                    <option value="Viewer">Viewer</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="!mt-8">
                            <button
                                type="submit"
                                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
