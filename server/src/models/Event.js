import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['Seminar', 'Webinar', 'Workshop', 'Hackathon', 'Other'], default: 'Other' },
    mode: { type: String, enum: ['online', 'offline'], required: true },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    location: { type: String },
    posterPath: { type: String },
    certTemplatePath: { type: String },
    signaturePath: { type: String },
    registrationLink: { type: String },
    shareId: { type: String, unique: true, index: true },
    certificatesSent: { type: Boolean, default: false },
    customFields: [{
      label: { type: String, required: true },
      fieldType: { type: String, enum: ['text', 'email', 'phone', 'number', 'textarea', 'select', 'checkbox'], default: 'text' },
      required: { type: Boolean, default: false },
      options: [{ type: String }], // For select dropdowns
      placeholder: { type: String }
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

export default mongoose.model('Event', EventSchema);
