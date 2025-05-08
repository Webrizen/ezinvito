import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  profileImage: String,
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to sync with Clerk (we'll implement this later)
userSchema.post('save', async function(doc) {
  // Potential Clerk sync logic here
});

export default mongoose.models.User || mongoose.model('User', userSchema);