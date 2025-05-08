import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  type: { 
    type: String, 
    enum: [
      'new_rsvp', 
      'guest_message', 
      'gallery_upload', 
      'event_reminder', 
      'system'
    ], 
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  relatedItem: {
    type: { type: String },
    id: mongoose.Schema.Types.ObjectId
  },
  createdAt: { type: Date, default: Date.now }
});

notificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);