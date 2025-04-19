import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

// Create the User schema
const UserTokenSchema = new Schema({
    token: { type: String, required: true },
    userId: { type: String, required: true },
    isActive: { type: Number },
    isDelete: { type: Number },
    createdAt: { type: Date, default: Date.now },
});

// Create the User model
const UserAccessToken = mongoose.model('UserAccesstToken', UserTokenSchema);

// Export the User model
export default UserAccessToken;
