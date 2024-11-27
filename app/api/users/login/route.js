// app/api/users/login/route.js
let users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'Admin' },
    { id: 2, username: 'editor', password: 'editor123', role: 'Editor' }
];

export async function POST(req) {
    const { username, password } = await req.json();

    // Find user by username and password
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return new Response('Invalid credentials', { status: 401 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
}
