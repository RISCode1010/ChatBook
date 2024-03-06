const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      //   select: false,
    },
    pic: {
      type: "String",
      required: true,
      // default: function() {
      //   return `https://api.dicebear.com/5.x/initials/svg?seed=${this.name}`;
      // }
      // default:
      //   "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.methods.createAccessToken = function () {
//   return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: "1d",
//   });
// };

// userSchema.methods.createRefreshToken = function () {
//   return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: "30d",
//   });
// };

userSchema.methods.getJwtToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.KEY, {
    expiresIn: "30d",
  });
  return token;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  const validPassword = await bcrypt.compare(enteredPassword, this.password);
  return validPassword;
};


module.exports = mongoose.model('User', userSchema);