const User = require(`../../../models/user`);

const toPublic = (user) => User.toJSON(user);

const createUser = async (data, session = undefined) => {
  const user = new User(data);
  return await user.save({ session });
};

const putUser = async (uuid, data) =>
  User.findOneAndUpdate({ uuid }, data, { new: true });

const deleteUser = async (userToDelete) => userToDelete.delete();

const getUser = async (uuid) =>
  User.findOne({
    uuid,
  }).setOptions({ sanitizeFilter: false });

/**
 * Get a User by filter.
 *
 * @param  {String} email
 * @return {Object}
 */
const getUserFilter = async (filter) =>
  User.findOne(filter).setOptions({ sanitizeFilter: false });

/**
 * Get a User by filter.
 *
 * @param  {String} email
 * @return {Object}
 */
const getUsersFilter = async (filter) =>
  User.find(filter).setOptions({ sanitizeFilter: false });

/**
 * List user using options filters and pagination.
 *
 * @param  {Object} filters
 * @param  {Object} options
 * @return {Array}
 */

const getUsersPaginated = (filters, options) =>
  User.paginate(filters, {
    options,
  });

module.exports = {
  toPublic,
  createUser,
  putUser,
  deleteUser,
  getUsersFilter,
  getUserFilter,
  getUser,
  getUsersPaginated,
};
