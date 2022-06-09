const mongoose = require("mongoose");
const ULID = require("ulid");

var permissionsSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      default: () => ULID.ulid(),
    },
    roles: { type: String, required: true },
    permissions: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

permissionsSchema.virtual("remoteVisibleField").get(() => {
  const remoteObj = {
    uuid: this.uuid,
  };
  return remoteObj;
});

permissionsSchema.set("toJSON", {
  transform: (doc, permissions) => {
    delete permissions._id;
    delete permissions.__v;
    delete permissions.createdAt;
    delete permissions.updatedAt;

    return permissions;
  },
  virtuals: true,
});

permissionsSchema.statics.toJSON = function (permissions) {
  delete permissions._id;
  delete permissions.__v;
  delete permissions.createdAt;
  delete permissions.updatedAt;

  return permissions;
};

module.exports = mongoose.model("Permissions", permissionsSchema);
