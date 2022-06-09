const express = require("express");
const router = express.Router();

const userController = require("./user.controller");
const userMiddleware = require("./user.middleware");
const userValidator = require("./user.validators");

const hasPermission = require("../../../middleware/permission");
const { PERMISSIONS } = require("../../../constants/permissions");

// Get user list filter
router.get(
  "/filter",
  hasPermission.hasPermission(PERMISSIONS.USER_LIST_FILTER),
  userController.getUsersFilter
);

router.get(
  "/paginate",
  hasPermission.hasPermission(PERMISSIONS.USER_LIST_FILTER),
  userController.getUsersFilterPaginate
);

// Get user by uuid
router.get(
  "/:uuid",
  hasPermission.hasPermission(PERMISSIONS.USER_GET_PROFILE),
  userMiddleware.loadUser,
  userController.getUser
);

// Create a new user
router.post(
  "/",
  hasPermission.hasPermission(PERMISSIONS.USER_CREATE),
  userValidator.createUser,
  userMiddleware.checkDni,
  userMiddleware.checkEmail,
  userMiddleware.checkTelephone,
  userController.createUser
);

// Modify a user
router.put(
  "/:uuid",
  hasPermission.hasPermission(PERMISSIONS.USER_UPDATE),
  userValidator.updateUser,
  userMiddleware.loadUser,
  userController.updateUser
);

// Delete a user by uuid administrative
router.delete(
  "/:uuid",
  hasPermission.hasPermission(PERMISSIONS.USER_DELETE),
  userMiddleware.loadUser,
  userController.deleteUser
);

module.exports = router;
