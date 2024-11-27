// app/api/permissions.js
let permissions = [
    { id: 1, name: 'Read' },
    { id: 2, name: 'Write' },
    { id: 3, name: 'Delete' }
];

// Get all permissions
export async function GET() {
    return new Response(JSON.stringify(permissions), { status: 200 });
}

// Add a new permission
export async function POST(req) {
    const newPermission = await req.json();
    newPermission.id = permissions.length + 1;
    permissions.push(newPermission);
    return new Response(JSON.stringify(newPermission), { status: 201 });
}

// Update a permission
export async function PUT(req) {
    const updatedPermission = await req.json();
    const permissionIndex = permissions.findIndex(perm => perm.id === updatedPermission.id);
    if (permissionIndex !== -1) {
        permissions[permissionIndex] = updatedPermission;
        return new Response(JSON.stringify(updatedPermission), { status: 200 });
    }
    return new Response('Permission not found', { status: 404 });
}

// Delete a permission
export async function DELETE(req) {
    const { id } = await req.json();
    permissions = permissions.filter(perm => perm.id !== id);
    return new Response('Permission deleted', { status: 200 });
}
