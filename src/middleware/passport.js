const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const Boom = require("boom");

const userService = require("../features/api/user/user.service");
const employerService = require("../features/api/employer/employer.service");

const config = require("../config");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
opts.secretOrKey = config.jwt.public;
opts.passReqToCallback = true;
/**
 * This middleware handle the validation passport jwt strategy and user status.
 *
 * @param {Object} passport
 */
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (req, jwtPayload, done) => {
      const expirationDate = new Date(jwtPayload.exp * 1000);
      if (expirationDate < new Date()) {
        return done(
          Boom.forbidden("Token expired", {
            code: "USER.LOGIN.TOKEN_EXPIRED",
          })
        );
      }

      if (jwtPayload.type === "user") {
        try {
          const user = await userService.getUserFilter({
            uuid: jwtPayload.uuid,
          });
          if (user.deleted) {
            return done(
              Boom.forbidden("User has been deleted", {
                code: "USER.LOGIN.USER_DELETED",
              })
            );
          }
          return done(null, user);
        } catch (e) {
          return done(
            Boom.forbidden("User does not exist", {
              code: "USER.LOGIN.USER_NOT_EXIST",
            })
          );
        }
      }

      if (jwtPayload.type === "employer") {
        try {
          const employer = await employerService.getEmployerFilter({
            uuid: jwtPayload.uuid,
          });
          if (employer.deleted) {
            return done(
              Boom.forbidden("Employer has been deleted", {
                code: "EMPLOYER.LOGIN.USER_DELETED",
              })
            );
          }
          return done(null, employer);
        } catch (e) {
          return done(
            Boom.forbidden("Employer does not exist", {
              code: "EMPLOYER.LOGIN.USER_NOT_EXIST",
            })
          );
        }
      }
      return done(null, false);
    })
  );
};
