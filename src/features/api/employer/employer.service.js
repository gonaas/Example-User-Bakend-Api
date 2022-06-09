const Employer = require(`../../../models/employer`);

const toPublic = (employer) => Employer.toJSON(employer);

const createEmployer = async (data, session = undefined) => {
  const employer = new Employer(data);
  return await employer.save({ session });
  //return true;
};

const getEmployer = async (uuid) =>
  Employer.findOne({
    uuid,
  }).setOptions({ sanitizeFilter: false });

/**
 * Get a Employer by filter.
 *
 * @param  {String} email
 * @return {Object}
 */
const getEmployerFilter = async (filter) =>
  Employer.findOne(filter).setOptions({ sanitizeFilter: false });

/**
 * Get a Employer by filter.
 *
 * @param  {String} email
 * @return {Object}
 */
const getEmployersFilter = async (filter) =>
  Employer.find(filter).setOptions({ sanitizeFilter: false });

module.exports = {
  toPublic,
  createEmployer,
  getEmployersFilter,
  getEmployerFilter,
  getEmployer,
};
