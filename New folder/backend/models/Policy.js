import mongoose from 'mongoose';

const { Schema } = mongoose;

const policySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ['EISP', 'ISSP', 'SysSP'], required: true, index: true },
    contentHtml: { type: String },
    fileUrl: { type: String },
    version: { type: String, default: '1.0' },
    isActive: { type: Boolean, default: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Policy', policySchema);


