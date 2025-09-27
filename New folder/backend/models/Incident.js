import mongoose from 'mongoose';

const { Schema } = mongoose;

const incidentSchema = new Schema(
  {
    reporter: { type: Schema.Types.ObjectId, ref: 'User' },
    isAnonymous: { type: Boolean, default: false },
    type: { type: String, enum: ['phishing', 'malware', 'data_loss', 'other'], default: 'other' },
    description: { type: String, required: true },
    status: { type: String, enum: ['open', 'in_progress', 'resolved'], default: 'open', index: true },
    attachments: [{ url: String, name: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Incident', incidentSchema);


