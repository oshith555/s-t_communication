import mongoose from 'mongoose';

const { Schema } = mongoose;

const acknowledgmentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    policy: { type: Schema.Types.ObjectId, ref: 'Policy', required: true, index: true },
    acceptedAt: { type: Date, default: Date.now },
    signature: { type: String, required: true },
  },
  { timestamps: true }
);

acknowledgmentSchema.index({ user: 1, policy: 1 }, { unique: true });

export default mongoose.model('Acknowledgment', acknowledgmentSchema);


