import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  eventType: {
    type: String,
    required: true,
    enum: [
      'conference',
      'workshop',
      'meetup',
      'webinar',
      'social',
      'concert',
      'exhibition',
      'networking',
      'hackathon',
      'wedding',
      'birthday',
      'corporate'
    ],
    default: 'meetup'
  },
  description: String,
  date: { type: Date, required: true },
  endDate: Date,
  location: {
    venue: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    },
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
    default: function () {
      return `event-${this._id.toString()}`
    },
    sparse: true,
    lowercase: true,
    trim: true,
    validate: {
       validator: v => !v || /^[a-z0-9-]+$/.test(v),
      message: "Custom URL cannot be empty"
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
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add index for better query performance
eventSchema.index({ host: 1 });

export default mongoose.models.Event || mongoose.model('Event', eventSchema);