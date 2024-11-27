// /api/roles.js

let roles = [
    { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
    { id: 2, name: 'Editor', permissions: ['read', 'write'] },
    { id: 3, name: 'Viewer', permissions: ['read'] }
];

// GET All Roles (for admin to view all roles)
export async function GET(req) {
    return new Response(JSON.stringify(roles), { status: 200 });
}

// POST to Create a New Role
export async function POST(req) {
    const { name, permissions } = await req.json();

    // Validate input
    if (!name || !permissions || permissions.length === 0) {
        return new Response('Invalid input: Name and permissions are required.', { status: 400 });
    }

    // Check if role already exists
    const existingRole = roles.find((role) => role.name === name);
    if (existingRole) {
        return new Response('Role already exists', { status: 400 });
    }

    // Create new role
    const newRole = { id: roles.length + 1, name, permissions };
    roles.push(newRole);

    return new Response(JSON.stringify(newRole), { status: 201 });
}

// PUT to Update an Existing Role
export async function PUT(req) {
    const { id, name, permissions } = await req.json();

    // Validate input
    if (!name || !permissions || permissions.length === 0) {
        return new Response('Invalid input: Name and permissions are required.', { status: 400 });
    }

    const roleIndex = roles.findIndex((role) => role.id === id);
    if (roleIndex === -1) {
        return new Response('Role not found', { status: 404 });
    }

    const updatedRole = { ...roles[roleIndex], name, permissions };
    roles[roleIndex] = updatedRole;

    return new Response(JSON.stringify(updatedRole), { status: 200 });
}

// DELETE to Remove a Role
export async function DELETE(req) {
    const { id } = await req.json();

    // Find role to delete
    const roleIndex = roles.findIndex((role) => role.id === id);
    if (roleIndex === -1) {
        return new Response('Role not found', { status: 404 });
    }

    // Remove role from the list
    roles = roles.filter((role) => role.id !== id);

    return new Response('Role deleted successfully', { status: 200 });
}
