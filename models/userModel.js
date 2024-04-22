import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: String,
  avatarPublicId: String,
});
UserSchema.methods.toJSON = function () {
  console.log(typeof this);

  let obj = this.toObject();
  console.log(typeof obj);
  console.log("cobj", obj.password);
  delete obj.password;
  console.log("cobj1", obj.password);

  return obj;
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
