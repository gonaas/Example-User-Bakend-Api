const config = require("../config");

const pagination = {};

/**
 * Generate object for paginate model.
 *
 * @param  {Number} page
 * @param  {Number} pageSize
 * @return {Object}
 */
pagination.getParams = (page, pageSize) => {
  let limit = parseInt(pageSize) || config.pagination.pageSize;

  if (limit > config.pagination.maxPageSize) {
    limit = config.pagination.maxPageSize;
  }

  return {
    limit,
    page: parseInt(page) || 1,
  };
};

module.exports = pagination;
