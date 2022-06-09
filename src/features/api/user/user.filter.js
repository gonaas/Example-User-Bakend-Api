/**
 * Return filter object for searching News.
 *
 * @param  {Object} params
 * @return {Object}
 */
module.exports = (params) => {
  const query = {};

  if (params.uuid) {
    query.uuid = params.uuid;
  }

  if (params.name) {
    query.name = params.name;
  }

  if (params.email) {
    query.email = params.email;
  }

  if (params.role) {
    query.role = params.role;
  }

  if (params.token) {
    query.token = params.token;
  }

  query.deleted = { $ne: true };

  return query;
};
