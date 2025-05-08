import mongoose from 'mongoose';

const scanLogSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true },
  scanTime: { type: Date, default: Date.now },
  device: {
    type: { type: String }, // 'scanner', 'mobile', etc.
    identifier: String // Device ID/IP (hashed for privacy)
  },
  location: {
    lat: Number,
    lng: Number,
    accuracy: Number // Meters
  }
});

export default mongoose.models.ScanLog || mongoose.model('ScanLog', scanLogSchema);