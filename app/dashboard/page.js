'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useAuth from '../hooks/useAuth'; // Import the custom useAuth hook

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', password: '', role: '', permissions: [] });
    const [editingUser, setEditingUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState({ name: '', permissions: [] });
    const router = useRouter();

    // Protect the route with the useAuth hook for Admin users only
    useAuth('Admin');  // Only Admin users should be able to access this page

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
            setUser(loggedInUser);
            fetchUsers();
            fetchRoles();
        }
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users', {
                headers: { Authorization: JSON.stringify(user) }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('/api/roles');
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users', newUser, {
                headers: { Authorization: JSON.stringify(user) }
            });
            fetchUsers(); // Refresh the users list
            setNewUser({ username: '', password: '', role: '', permissions: [] });
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/users', editingUser, {
                headers: { Authorization: JSON.stringify(user) }
            });
            fetchUsers(); // Refresh the users list
            setEditingUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete('/api/users', {
                data: { id },
                headers: { Authorization: JSON.stringify(user) }
            });
            fetchUsers(); // Refresh the users list
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    // Add Role
    const handleAddRole = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/roles', newRole, {
                headers: { Authorization: JSON.stringify(user) }
            });
            fetchRoles(); // Refresh the roles list
            setNewRole({ name: '', permissions: [] });
        } catch (error) {
            console.error('Error adding role:', error);
        }
    };

    if (!user) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
            <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Admin Dashboard</h1>
                <p className="text-xl text-gray-600 text-center mb-8">Welcome, {user.username}</p>
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Permissions</h2>
                    <p className="text-gray-600">Control user access and permissions.</p>
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={() => router.push('/permissions')}
                    >
                        Go to Permission Manager
                    </button>
                </div>
                {/* Add New User Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New User</h2>
                    <form onSubmit={handleAddUser}>
                        <input
                            type="text"
                            placeholder="Username"
                            className="mb-4 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="mb-4 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                        <select
                            className="mb-4 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        >
                            <option value="">Select Role</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Add User
                        </button>
                    </form>
                </div>

                {/* Users List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Users</h2>
                    <ul className="space-y-4">
                        {users.map((user) => (
                            <li key={user.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-md">
                                <div>
                                    <p className="text-lg font-semibold text-gray-700">{user.username} ({user.role})</p>
                                    <p className="text-sm text-gray-500">Permissions: {user.permissions.join(', ')}</p>
                                </div>
                                <div>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 transition duration-300"
                                        onClick={() => handleEditUser(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Edit User Form */}
                {editingUser && (
                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit User</h2>
                        <form onSubmit={handleUpdateUser}>
                            <input
                                type="text"
                                value={editingUser.username}
                                onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                                className="mb-4 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                                value={editingUser.role}
                                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                className="mb-4 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.name}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Update User
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="w-full bg-gray-500 text-white p-3 rounded-md mt-2 hover:bg-gray-600 transition duration-300"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )}

                {/* Add Role Form */}
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Role</h2>
                    <form onSubmit={handleAddRole}>
                        <input
                            type="text"
                            placeholder="Role Name"
                            className="mb-4 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            value={newRole.name}
                            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                        />
                        <select
                            multiple
                            className="mb-4 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            value={newRole.permissions}
                            onChange={(e) => setNewRole({ ...newRole, permissions: Array.from(e.target.selectedOptions, option => option.value) })}
                        >
                            <option value="read">Editor</option>
                            <option value="write">Admin</option>
                            <option value="delete">Viewer</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Add Role
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
