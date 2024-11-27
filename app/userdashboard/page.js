"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    // Effect hook to handle user login status and role-based redirection
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (!loggedInUser) {
            router.push("/auth/login"); // Redirect to login if not logged in
        } else {
            setUser(loggedInUser); // Set the logged-in user data
        }
    }, []);

    // If user data is still loading, show loading text
    if (!user) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    // Component to display user permissions
    const PermissionsSection = () => (
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Permissions</h2>
            <p className="text-gray-600 mb-4">
                You can view your permissions here. You do not have the ability to
                modify them.
            </p>
            <ul className="space-y-2">
                {user.permissions && user.permissions.length > 0 ? (
                    user.permissions.map((perm, index) => (
                        <li key={index} className="text-lg text-gray-700">
                            {perm}
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">No permissions assigned.</li>
                )}
            </ul>
        </div>
    );

    // Component for Admins to manage permissions
    const AdminPermissionManager = () => (
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Manage Permissions
            </h2>
            <p className="text-gray-600 mb-4">
                Admin users can manage user permissions.
            </p>
            <button
                className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300"
                onClick={() => router.push("/permissions")}
            >
                Go to Permission Manager
            </button>
        </div>
    );

    // Component to display account information
    const AccountInfoSection = () => (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Your Account Information
            </h2>
            <div className="space-y-4">
                <p>
                    <strong className="text-gray-700">Username:</strong> {user.username}
                </p>
                <p>
                    <strong className="text-gray-700">Email:</strong> {user.email}
                </p>
                <p>
                    <strong className="text-gray-700">Role:</strong> {user.role}
                </p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-6 text-center text-white">
                    User Dashboard
                </h1>
                <p className="text-xl text-center mb-8 text-white">
                    Welcome, {user.username}
                </p>

                {/* Display Permissions and Account Info */}
                <PermissionsSection />
                <AccountInfoSection />

                {/* Optional link to permission page for Admin users */}
                {user.role === "Admin" && <AdminPermissionManager />}
            </div>
        </div>
    );
};

export default UserDashboard;
