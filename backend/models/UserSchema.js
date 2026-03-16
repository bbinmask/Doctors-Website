import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  gender: { type: String, enum: ["male", "female", "others"] },
  bloodType: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  console.log({ password: this.password, first: "First" });
  this.password = await bcrypt.hash(this.password, 10);
  console.log({ password: this.password });
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
  const matched = await bcrypt.compare(password, this.password);

  return matched;
};

export default mongoose.model("User", UserSchema);
