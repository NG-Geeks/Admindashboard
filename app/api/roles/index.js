import dbConnect from '../../../utils/dbConnect'; // A utility to handle DB connections
import Role from '../../../models/role'; // Import Role model

// Connect to the database
dbConnect();

// POST: Create a new role
export async function post(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { name, permissions } = req.body;

        // Check if the role already exists
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: 'Role already exists.' });
        }

        // Create the new role
        const newRole = new Role({
            name,
            permissions,
        });

        // Save to DB
        await newRole.save();

        res.status(201).json({ message: 'Role created successfully', role: newRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// GET: Fetch all roles
export async function get(req, res) {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
