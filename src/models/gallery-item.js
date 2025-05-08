import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  thumbnailUrl: String,
  caption: String,
  tags: [String],
  approved: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  metadata: {
    width: Number,
    height: Number,
    size: Number,
    format: String,
    duration: Number
  },
  createdAt: { type: Date, default: Date.now },
});

galleryItemSchema.index({ eventId: 1, createdAt: -1 });

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', galleryItemSchema);