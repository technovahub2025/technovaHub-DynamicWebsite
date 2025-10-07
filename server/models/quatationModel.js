import mongoose from "mongoose";

const quatationSchema = new mongoose.Schema({
  sno: { type: Number },
  desc: { type: String, required: true },
  hsn: { type: String, required: true },
  gst: { type: String, required: true },
  batch: { type: String },
  qty: { type: Number, required: true },
  rate: { type: Number, required: true },
  unit: { type: String },
  discount: { type: Number, default: 0 },
  amount: { type: Number, required: true }
}, { timestamps: true });

const Quatation = mongoose.model("Quatation", quatationSchema);
export default Quatation;
