const userService = require("./user.service");
const Boom = require("boom");

/**
 * Load client by id.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const loadUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(
      Boom.badData("The email is required", { code: "USER.EMAIL_REQUIRED" })
    );
  }
  const user = await userService.getUserFilter({ email });
  if (!user) {
    return next(Boom.badData("user not found", { code: "NOT_FOUND" }));
  }
  res.locals.user = user;

  next();
};

const loadUser = async (req, res, next) => {
  let user;

  let userUuid;
  if (req.params.uuid) {
    userUuid = req.params.uuid;
  } else if (req.body.uuid) {
    userUuid = req.body.uuid;
  }

  if (!userUuid) {
    return next(
      Boom.badData("The user identifier is required", {
        code: "USER.IDENTIFIER_REQUIRED",
      })
    );
  }

  try {
    user = await userService.getUserByUuid(userUuid);
  } catch (error) {
    return next(Boom.notFound("User not found", { code: "USER.NOT_FOUND" }));
  }

  if (!user)
    return next(Boom.notFound("User not found", { code: "USER.NOT_FOUND" }));

  res.locals.user = user;

  next();
};

async function checkDni(req, res, next) {
  let user;

  const { dni } = req.body;

  if (!dni) {
    return next(
      Boom.badData("The dni is required", { code: "USER.DNI_REQUIRED" })
    );
  }

  try {
    user = await userService.getUserFilter({ dni });
  } catch (error) {
    return next(Boom.badData("Dni not found", { code: "USER.ERROR_DNI" }));
  }

  if (user)
    return next(
      Boom.badImplementation("user dni exists", {
        code: "USER.DNI_EXISTS",
      })
    );

  res.locals.user = user;

  next();
}

async function checkEmail(req, res, next) {
  let user;

  const { email } = req.body;

  if (!email) {
    return next(
      Boom.badData("The Email is required", { code: "USER.EMAIL_REQUIRED" })
    );
  }

  try {
    user = await userService.getUserFilter({ email });
  } catch (error) {
    return next(Boom.badData("Email not found", { code: "USER.ERROR_EMAIL" }));
  }

  if (user)
    return next(
      Boom.badImplementation("user not found", {
        code: "USER.EMAIL_EXISTS",
      })
    );

  res.locals.user = user;

  next();
}

async function checkTelephone(req, res, next) {
  let user;

  const { telephone } = req.body;

  if (!telephone) {
    return next(
      Boom.badData("The Telephone is required", {
        code: "USER.TELEPHONE_REQUIRED",
      })
    );
  }

  try {
    user = await userService.getUserFilter({ telephone });
  } catch (error) {
    return next(
      Boom.badData("Telephone not found", { code: "USER.ERROR_TELEPHONE" })
    );
  }

  if (user)
    return next(
      Boom.badImplementation("user not found", {
        code: "USER.TELEPHONE_EXISTS",
      })
    );

  res.locals.user = user;

  next();
}

module.exports = {
  loadUserByEmail,
  loadUser,
  checkDni,
  checkEmail,
  checkTelephone,
};
