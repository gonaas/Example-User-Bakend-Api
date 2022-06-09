const userRouter = require("./user/user.router");
const userProtectedRouter = require("./user/user.protected.router");

const tag = "api";
module.exports = (app, passport) => {
  /**
   * User
   */
  app.use(`/${tag}/user`, userRouter);
  app.use(
    `/${tag}/user-s`,
    passport.authenticate("jwt", { session: false }),
    userProtectedRouter
  );
};
