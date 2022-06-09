const mongoose = require("mongoose");
const ULID = require("ulid");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const { ROLES_EMPLOYER } = require("../constants/employer");

var employerSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      default: () => ULID.ulid(),
    },
    name: { type: String, required: false },
    surname: { type: String, required: false },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: [ROLES_EMPLOYER.ADMIN, ROLES_EMPLOYER.SUPPORT],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

employerSchema.set("toJSON", {
  transform: (doc, employer) => {
    delete employer._id;
    delete employer.__v;
    delete employer.createdAt;
    delete employer.updatedAt;

    return employer;
  },
});

employerSchema.statics.toJSON = function (employer) {
  delete employer._id;
  delete employer.__v;
  delete employer.createdAt;
  delete employer.updatedAt;

  return employer;
};

employerSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

employerSchema.methods.toAuthJSON = function () {
  const employer = {};
  employer.token = jwt.generateJWT({
    uuid: this.uuid,
    type: "employer",
    createdAt: new Date(),
  });
  return employer;
};

employerSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  }
  next();
});

employerSchema.pre("findOneAndUpdate", function (next) {
  const update = this._update;

  if (update && update.password) {
    const hash = bcrypt.hashSync(update.password, bcrypt.genSaltSync(10));
    this._update.password = hash;
  }

  next();
});

module.exports = mongoose.model("Employer", employerSchema);
