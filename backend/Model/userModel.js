const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  passwd: { type: String, require: true },
  image: {
    type: String,
    require: true,
    default:
      "https://www.svgrepo.com/show/382693/user-account-person-avatar.svg",
  },
},{
    timestamps:true
});

const User = mongoose.model("User",userSchema);

module.exports=User;