import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  timetable: {
    type: Object,
    default: {},
  },
}, { timestamps: true });

const Timetable = mongoose.models.Timetable || mongoose.model("Timetable", TimetableSchema);
export default Timetable;
