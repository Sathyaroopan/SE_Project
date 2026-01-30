import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    rollNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },

  
    password: {
      type: String,
      required: true,
      minlength: 6, // store HASHED password only
    },

  
    dailyAvailableHours: {
      type: Number, // hours per day user can study
      default: 4,
      min: 0,
      max: 24,
    },

    studyPreference: {
      type: String,
      enum: ["morning", "evening", "night"],
      default: "evening",
    },

    // ---- Ethics & Privacy ----
    consentForAnalytics: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);

