import mongoose from 'mongoose';

const { Schema } = mongoose;

const proposalSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    status: { type: String, enum: ['submitted', 'approved', 'rejected'], default: 'submitted', index: true },
    reviewer: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: { type: Date },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Proposal', proposalSchema);


