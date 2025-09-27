import mongoose from 'mongoose';

const { Schema } = mongoose;

const quizResultSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    training: { type: Schema.Types.ObjectId, ref: 'Training', required: true, index: true },
    score: { type: Number, required: true, min: 0, max: 100 },
    totalQuestions: { type: Number, required: true, min: 1 },
    passed: { type: Boolean, default: false },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

quizResultSchema.index({ user: 1, training: 1 }, { unique: false });

export default mongoose.model('QuizResult', quizResultSchema);


