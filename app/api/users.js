let users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'Admin' },
    { id: 2, username: 'editor', password: 'editor123', role: 'Editor' }
];

export async function POST(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    if (path === '/api/users/signup') {
        return await handleSignup(req);
    } else if (path === '/api/users/login') {
        return await handleLogin(req);
    } else {
        return new Response('Not Found', { status: 404 });
    }
}

async function handleSignup(req) {
    const { username, password, role } = await req.json();

    // Validate inputs
    if (!username || !password || password.length < 6) {
        return new Response('Invalid input. Ensure username and password meet requirements.', { status: 400 });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return new Response('User already exists', { status: 400 });
    }

    // Add new user
    const newUser = { id: users.length + 1, username, password, role: role || 'Editor' };
    users.push(newUser);

    return new Response(JSON.stringify(newUser), { status: 201 });
}

async function handleLogin(req) {
    const { username, password } = await req.json();

    // Validate inputs
    if (!username || !password) {
        return new Response('Invalid input. Username and password are required.', { status: 400 });
    }

    // Authenticate user
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return new Response('Invalid credentials', { status: 401 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
}
