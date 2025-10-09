import mongoose from "mongoose";

const quatationSchema = new mongoose.Schema(
  {
    desc: { type: String, required: true, trim: true },
    hsn: { type: String, required: true },
    gst: { type: Number, required: true, default: 0, min: 0, max: 100 },
    dueOn: { type: Date },
    batch: { type: String, default: "" },
    qty: { type: Number, required: true, default: 0 },
    rate: { type: Number, required: true, default: 0 },
    unit: { type: String, default: "" },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    amount: { type: Number, default: 0 }, // amount before GST
    totalAmount: { type: Number, default: 0 }, // after GST
  },
  { timestamps: true }
);

// ✅ Auto calculate amount and totalAmount before save
quatationSchema.pre("save", function (next) {
  const baseAmount = this.qty * this.rate;
  const discounted = baseAmount * (1 - this.discount / 100);
  this.amount = discounted; // amount after discount
  this.totalAmount = discounted * (1 + this.gst / 100); // amount + GST
  next();
});

const Quatation = mongoose.model("Quatation", quatationSchema);
export default Quatation;
