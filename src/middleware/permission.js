const Boom = require("boom");
const { ROLES } = require("../constants/user");
const { ROLES_EMPLOYER } = require("../constants/employer");
const permissionsService = require("../features/api/permission/permission.service");

/**
 * Middleware check if user is has permission for an action.
 *
 * @param {Object} req
 * @param {Object} res
 */
const hasPermission = (permission) => async (req, res, next) => {
  const { role } = req.user;
  let arrayPermission;
  if (role !== ROLES_EMPLOYER.ADMIN) {
    arrayPermission = await permissionsService.getPermissionFilter({
      roles: role,
    });
    const per = arrayPermission.permissions.find((perm) => perm === permission);
    if (!per) {
      return next(
        Boom.badData("User does not have permissions", {
          code: "USER.NO_PERMISSIONS",
        })
      );
    }
  }
  next();
};

module.exports = {
  hasPermission,
};
