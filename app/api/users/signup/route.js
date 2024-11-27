let users = [
    { id: 1, email: 'admin@example.com', password: 'admin123', role: 'Admin' },
    { id: 2, email: 'editor@example.com', password: 'editor123', role: 'Editor' },
];

export async function POST(req) {
    try {
        const { email, password, role } = await req.json();

        // Validate input
        if (!email || !password || !role) {
            return new Response('Invalid input', { status: 400 });
        }

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return new Response('User already exists', { status: 400 });
        }

        // Create new user
        const newUser = {
            id: users.length + 1,
            email,
            password,
            role,
        };
        users.push(newUser);

        // Return new user data
        return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
}
