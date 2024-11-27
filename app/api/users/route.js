import bcrypt from 'bcrypt';

let users = [
    { id: 1, username: 'admin', password: await bcrypt.hash('admin123', 10), role: 'Admin', permissions: ['read', 'write', 'delete'] },
    { id: 2, username: 'editor', password: await bcrypt.hash('editor123', 10), role: 'Editor', permissions: ['read', 'write'] },
];

// GET All Users (Admin action)
export async function GET(req) {
    return new Response(JSON.stringify(users.map(({ password, ...u }) => u)), { status: 200 });
}

// POST to Sign Up a New User
export async function POST(req) {
    try {
        const { username, password, role, permissions } = await req.json();

        if (!username || !password || password.length < 6) {
            return new Response('Invalid input: Username and password are required. Password must be at least 6 characters.', { status: 400 });
        }

        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
            return new Response('User already exists', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: users.length + 1, username, password: hashedPassword, role, permissions };
        users.push(newUser);

        return new Response(JSON.stringify({ id: newUser.id, username: newUser.username, role: newUser.role, permissions: newUser.permissions }), { status: 201 });
    } catch (error) {
        return new Response('Error creating user', { status: 500 });
    }
}

// POST to Login (validate credentials)
export async function POST_LOGIN(req) {
    const { username, password } = await req.json();

    const user = users.find((u) => u.username === username);
    if (!user) {
        return new Response('Invalid credentials', { status: 401 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return new Response('Invalid credentials', { status: 401 });
    }

    return new Response(JSON.stringify({ id: user.id, username: user.username, role: user.role, permissions: user.permissions }), { status: 200 });
}

// PUT to Update User Information
export async function PUT(req) {
    const { id, username, role, permissions } = await req.json();

    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return new Response('User not found', { status: 404 });
    }

    const validRoles = ['Admin', 'Editor', 'Viewer'];
    const validPermissions = ['read', 'write', 'delete'];
    if (!validRoles.includes(role) || permissions.some((perm) => !validPermissions.includes(perm))) {
        return new Response('Invalid role or permissions', { status: 400 });
    }

    const updatedUser = { ...users[userIndex], username, role, permissions };
    users[userIndex] = updatedUser;

    return new Response(JSON.stringify({ id: updatedUser.id, username: updatedUser.username, role: updatedUser.role, permissions: updatedUser.permissions }), { status: 200 });
}

// DELETE to Remove User
export async function DELETE(req) {
    const { id, loggedInUserId } = await req.json();

    const loggedInUser = users.find((user) => user.id === loggedInUserId);
    if (!loggedInUser || loggedInUser.role !== 'Admin') {
        return new Response('Permission denied', { status: 403 });
    }

    const userToDelete = users.find((user) => user.id === id);
    if (!userToDelete) {
        return new Response('User not found', { status: 404 });
    }

    users = users.filter((user) => user.id !== id);
    return new Response('User deleted successfully', { status: 200 });
}
