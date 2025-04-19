import mongoose, { Schema } from 'mongoose';

// Create the User schema
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Number },
    isDelete: { type: Number },
    createdAt: { type: Date, default: Date.now },
});

// Create the User model
const User = mongoose.model('users', UserSchema);

// Export the User model
export default User;
