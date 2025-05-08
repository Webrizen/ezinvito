import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
  eventId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event', 
    required: true 
  },
  name: {
    type: String,
    required: true 
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: v => /^\+?[\d\s-]{10,}$/.test(v),
      message: "Invalid phone number"
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending'
  },
  qrCode: String,  // Just store the QR code string (URL or base64)
  guests: Number    // Simple +1 count
}, { 
  timestamps: true  // createdAt, updatedAt auto-added
});

// Only essential indexes
guestSchema.index({ eventId: 1, phone: 1 }, { unique: true });

export default mongoose.models.Guest || mongoose.model('Guest', guestSchema);