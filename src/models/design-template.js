import mongoose from 'mongoose';

const designTemplateSchema = new mongoose.Schema({
  templateId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['formal', 'casual', 'themed', 'holiday', 'modern'], required: true },
  thumbnailUrl: { type: String, required: true },
  previewUrl: String,
  isPremium: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  customizableOptions: {
    colors: {
      primary: { type: Boolean, default: true },
      secondary: { type: Boolean, default: true },
      accent: { type: Boolean, default: true }
    },
    fonts: { type: Boolean, default: true },
    background: { type: Boolean, default: true },
    layout: { type: Boolean, default: false }
  },
  defaultSettings: {
    colors: {
      primary: String,
      secondary: String,
      accent: String
    },
    fontFamily: String,
    backgroundImage: String
  },
  availableFor: [String], // event types this template is suitable for
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.DesignTemplate || mongoose.model('DesignTemplate', designTemplateSchema);