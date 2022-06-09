const Permissions = require(`../../../models/permissions`);

const toPublic = (permissions) => Permissions.toJSON(permissions);
/**
 * Get a Permissions by filter.
 *
 * @param  {String} email
 * @return {Object}
 */
const getPermissionFilter = async (filter) =>
  Permissions.findOne(filter).setOptions({ sanitizeFilter: false });

/**
 * Get a Permissions by filter.
 *
 * @param  {String} email
 * @return {Object}
 */
const getPermissionsFilter = async (filter) =>
  Permissions.find(filter).setOptions({ sanitizeFilter: false });

module.exports = {
  toPublic,
  getPermissionsFilter,
  getPermissionFilter,
};
