// app/users/page.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    // Fetch users from the mock API
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get('/api/users');
            setUsers(res.data);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        // Implement delete functionality
        alert(`Delete user with ID: ${id}`);
    };

    const handleStatusChange = async (id, status) => {
        // Implement status change functionality
        alert(`Change status of user with ID: ${id} to ${status}`);
    };

    return (
        <div>
            <h1>Manage Users</h1>
            <Link href="/users/new">Add New User</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>
                                <Link href={`/users/${user.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                                <button onClick={() => handleStatusChange(user.id, user.status === 'Active' ? 'Inactive' : 'Active')}>
                                    {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;
