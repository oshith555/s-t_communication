import mongoose from 'mongoose';

const { Schema } = mongoose;

const trainingSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String },
    lessons: [
      {
        title: { type: String, required: true },
        content: { type: String },
        videoUrl: { type: String },
      },
    ],
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Training', trainingSchema);


