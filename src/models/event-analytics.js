import mongoose from 'mongoose';

const eventAnalyticsSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  date: { type: Date, required: true, default: Date.now },
  metrics: {
    pageViews: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    invitationOpens: { type: Number, default: 0 },
    rsvpSubmissions: { type: Number, default: 0 },
    galleryViews: { type: Number, default: 0 },
    guestbookEntries: { type: Number, default: 0 }
  },
  trafficSources: {
    direct: { type: Number, default: 0 },
    email: { type: Number, default: 0 },
    social: { type: Number, default: 0 },
    referral: { type: Number, default: 0 }
  },
  deviceTypes: {
    desktop: { type: Number, default: 0 },
    mobile: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 }
  }
});

eventAnalyticsSchema.index({ eventId: 1, date: 1 });

export default mongoose.models.EventAnalytics || mongoose.model('EventAnalytics', eventAnalyticsSchema);