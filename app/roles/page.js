// app/roles/page.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const RoleForm = ({ role, onSave }) => {
    const [roleData, setRoleData] = useState(role || { name: '', permissions: [] });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === 'permissions') {
            setRoleData((prev) => ({
                ...prev,
                permissions: checked
                    ? [...prev.permissions, value]
                    : prev.permissions.filter((permission) => permission !== value),
            }));
        } else {
            setRoleData({ ...roleData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(roleData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={roleData.name}
                onChange={handleChange}
                placeholder="Role Name"
            />
            <label>
                <input
                    type="checkbox"
                    name="permissions"
                    value="read"
                    checked={roleData.permissions.includes('read')}
                    onChange={handleChange}
                />
                Read
            </label>
            <label>
                <input
                    type="checkbox"
                    name="permissions"
                    value="write"
                    checked={roleData.permissions.includes('write')}
                    onChange={handleChange}
                />
                Write
            </label>
            <label>
                <input
                    type="checkbox"
                    name="permissions"
                    value="delete"
                    checked={roleData.permissions.includes('delete')}
                    onChange={handleChange}
                />
                Delete
            </label>
            <button type="submit">Save</button>
        </form>
    );
};

const RolePage = () => {
    const router = useRouter();

    const handleSave = (role) => {
        // Handle save role logic (API call to save role)
        alert('Role saved');
        router.push('/roles');
    };

    return (
        <div>
            <h1>Manage Roles</h1>
            <RoleForm onSave={handleSave} />
        </div>
    );
};

export default RolePage;
