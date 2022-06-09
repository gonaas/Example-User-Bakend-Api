const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const ULID = require("ulid");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const { ROLES } = require("../constants/user");

var userSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      default: () => ULID.ulid(),
    },
    name: { type: String, required: true },
    surname: { type: String, required: false },
    dni: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true },
    role: {
      type: String,
      enum: [ROLES.CLIENT, ROLES.ADMINISTRATIVE],
      required: true,
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (doc, user) => {
    delete user._id;
    delete user.__v;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
  },
});

userSchema.statics.toJSON = function (user) {
  delete user._id;
  delete user.__v;
  delete user.createdAt;
  delete user.updatedAt;

  return user;
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.toAuthJSON = function () {
  const user = {};
  user.token = jwt.generateJWT({
    uuid: this.uuid,
    type: "user",
    createdAt: new Date(),
  });
  return user;
};

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  const update = this._update;

  if (update && update.password) {
    const hash = bcrypt.hashSync(update.password, bcrypt.genSaltSync(10));
    this._update.password = hash;
  }

  next();
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema);
