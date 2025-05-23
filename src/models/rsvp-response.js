import mongoose from 'mongoose';

const rsvpSchema = new mongoose.Schema({
  eventId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event', 
    required: true 
  },
  
  // Core attendee info (required)
  name: { type: String, required: true },
  email: { type: String, required: true },
  
  // Attendance status (your requested 3 options)
  attendanceStatus: {
    type: String,
    enum: ['going', 'not-sure', 'not-going'],
    default: 'going',
    required: true
  },
  
  // Phone optional
  phone: String,
  
  // Guests with relationships (simplified array)
  guests: [{
    name: String,
    relationship: String // 'child', 'spouse', 'partner', 'friend', etc.
  }],
  
  respondedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Indexes for performance
rsvpSchema.index({ eventId: 1 });
rsvpSchema.index({ email: 1, eventId: 1 }, { unique: true }); 

export default mongoose.models.Rsvp || mongoose.model('Rsvp', rsvpSchema);