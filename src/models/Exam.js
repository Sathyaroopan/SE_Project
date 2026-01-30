import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    examDate: {
      type: Date,
      required: true,
    },
    syllabusWeight: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Exam ||
  mongoose.model("Exam", ExamSchema);

