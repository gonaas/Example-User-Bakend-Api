const userService = require("./user.service");
const { ROLES_LIST_USER_TYPES, ROLES } = require("../../../constants/user");
const filterUser = require("./user.filter");
const queryOptions = require("../../../utils/queryOptions");

const logger = require("../../../config/winston");

const createUser = async (req, res) => {
  try {
    const data = req.body;
    if (!data.isTutorEmp || data.role !== ROLES.COMPANY) {
      data.centreUuid = req.user.centreUuid;
    }
    const user = await userService.createUser(data);
    res.json({
      msg: `user added ${JSON.stringify(user)} `,
    });
  } catch (error) {
    logger.error(`${error}`);
    return next(Boom.badImplementation(error.message));
  }
};

const getUsersFilter = async (req, res) => {
  try {
    const filter = filterUser(req.query);
    const users = await userService.getUsersFilter(filter);
    if (!users) {
      return next(Boom.notFound("User not found", { code: "USER.NOT_FOUND" }));
    }
    return res.json({ data: users });
  } catch (error) {
    logger.error(`${error}`);
    return next(Boom.badImplementation(error.message));
  }
};

const getUsersFilterPaginate = async (req, res) => {
  try {
    const filter = filterUser(req.query);
    const options = queryOptions(req.query);
    const users = await userService.getUsersPaginated(filter, options);
    if (users && users.docs.length > 0) {
      for (let index = 0; index < users.docs.length; index++) {
        users.docs[index] = userService.toPublic(users.docs[index]);
      }
    }
    res.json({ data: users });
  } catch (error) {
    logger.error(`${error}`);
    return next(Boom.badImplementation(error.message));
  }
};

const getUser = async (req, res) => {
  let userFinal;
  if (res.locals && res.locals.user) {
    userFinal = res.locals.user;
  } else {
    userFinal = req.user;
  }
  res.json({
    data: userFinal,
  });
};

const login = async (req, res, next) => {
  const { password } = req.body;
  const { user } = res.locals;
  const response = {};

  if (!user.validPassword(password)) {
    throw new Error("INVALID USER");
  }

  const responseAuth = await user.toAuthJSON();
  response.data = responseAuth;

  return res.json(response);
};

const updateUser = async (req, res) => {
  try {
    const { uuid } = res.locals.user;
    const data = req.body;
    const updUser = await userService.putUser(uuid, data);
    res.json({
      msg: `student updated ${JSON.stringify(updUser)} `,
    });
  } catch (error) {
    logger.error(`${error}`);
    return next(Boom.badImplementation(error.message));
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = res.locals;
    res.json(await userService.deleteUser(user));
  } catch (error) {
    logger.error(`${error}`);
    return next(Boom.badImplementation(error.message));
  }
};

module.exports = {
  login,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsersFilter,
  getUsersFilterPaginate,
};
