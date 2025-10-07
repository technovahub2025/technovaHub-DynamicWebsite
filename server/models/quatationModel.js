import mongoose from "mongoose";

const quatationSchema = new mongoose.Schema({
  desc: { type: String, required: true, trim: true },
  hsn: { type: String, required: true },
  gst: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,   // ensures gst is a valid percentage
  },
  dueOn: {
    type: Date,
  },
  batch: {
    type: String,
    default: "",
  },
  qty: {
    type: Number,
    required: true,
    default: 0,
  },
  rate: {
    type: Number,
    required: true,
    default: 0,
  },
  unit: {
    type: String,
    default: "",
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,  // ensures discount is a valid percentage
  },
}, { timestamps: true });

const Quatation = mongoose.model("Quatation", quatationSchema);
export default Quatation;
