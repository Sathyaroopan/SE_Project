import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true },
  name: String,
  course: String,
  semester: Number,
  password: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
