import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  endDate: Date,
  location: {
    venue: String,
    onlineEvent: { type: Boolean, default: false },
    meetingLink: String
  },
  userId: { type: String, required: true },
  host: { type: String, required: true },
  invitationDesign: {
    templateId: { type: String, required: true, default: 'classic' },
  },
  customSlug: { 
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: v => /^[a-z0-9-]+$/.test(v),
      message: "Only letters, numbers and hyphens allowed"
    }
  },
  privacy: {
    type: String,
    enum: ['public', 'private', 'invite-only'],
    default: 'invite-only'
  },
  qrSettings: {
    enabled: { type: Boolean, default: true },
    expiresAt: Date,
    secretKey: String
  },
  galleryEnabled: { type: Boolean, default: true },
  guestbookEnabled: { type: Boolean, default: true },
  rsvpDeadline: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add index for better query performance
eventSchema.index({ host: 1 });
eventSchema.index({ customUrl: 1 }, { unique: true });

export default mongoose.models.Event || mongoose.model('Event', eventSchema);