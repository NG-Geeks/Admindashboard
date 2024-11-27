"use client";
import React, { useState } from 'react';

const PermissionManager = () => {
    const [permissions, setPermissions] = useState([
        { name: 'Read', isAssigned: false },
        { name: 'Write', isAssigned: false },
        { name: 'Delete', isAssigned: false },
    ]);

    const handlePermissionChange = (name) => {
        setPermissions((prev) =>
            prev.map((perm) =>
                perm.name === name ? { ...perm, isAssigned: !perm.isAssigned } : perm
            )
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-3xl font-semibold text-gray-800 mb-6">Manage Permissions</h3>
                <p className="text-gray-600 mb-6">Select the permissions you want to assign to the user.</p>

                <ul className="space-y-4">
                    {permissions.map((perm) => (
                        <li key={perm.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={perm.isAssigned}
                                    onChange={() => handlePermissionChange(perm.name)}
                                    className="mr-4 h-5 w-5 text-indigo-500 focus:ring-indigo-500"
                                />
                                <span className="text-lg text-gray-700">{perm.name}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="mt-8">
                    <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PermissionManager;
