// app/users/[id]/page.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const UserForm = ({ userId }) => {
    const [user, setUser] = useState({ name: '', email: '', role: '', status: 'Active' });
    const router = useRouter();

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                const res = await axios.get(`/api/users/${userId}`);
                setUser(res.data);
            };
            fetchUser();
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userId) {
            // Edit user API call
            await axios.put(`/api/users/${userId}`, user);
        } else {
            // Add new user API call
            await axios.post('/api/users', user);
        }
        router.push('/users');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Name"
            />
            <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
            </select>
            <select
                value={user.status}
                onChange={(e) => setUser({ ...user, status: e.target.value })}
            >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            <button type="submit">Save</button>
        </form>
    );
};

const UserEditPage = () => {
    const { id } = useRouter().query;

    return <UserForm userId={id} />;
};

export default UserEditPage;
