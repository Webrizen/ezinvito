import mongoose from 'mongoose';

const rsvpResponseSchema = new mongoose.Schema({
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  response: { 
    type: String, 
    enum: ['attending', 'not_attending', 'maybe'], 
    required: true 
  },
  message: String,
  plusOnesAttending: Number,
  dietaryRestrictions: [String],
  customAnswers: mongoose.Schema.Types.Mixed,
  ipAddress: String,
  userAgent: String,
  respondedAt: { type: Date, default: Date.now }
});

rsvpResponseSchema.index({ guestId: 1, eventId: 1 }, { unique: true });

export default mongoose.models.RSVPResponse || mongoose.model('RSVPResponse', rsvpResponseSchema);