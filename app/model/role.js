import mongoose from 'mongoose';

// Define the schema for the Role
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    permissions: [{
        type: String,
        enum: ['read', 'write', 'delete'],  // You can expand permissions
    }],
}, { timestamps: true });

// Create the Role model
const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);

export default Role;

