const pagination = require("./pagination");

/**
 * Generate object for filter model.
 *
 * @param  {Object} params
 * @return {Object}
 */
module.exports = (params) => {
  const { page, pageSize } = params;
  let { sort } = params;
  const query = pagination.getParams(page, pageSize);

  if (sort) {
    let order = "asc";

    if (sort.startsWith("-")) {
      sort = sort.replace("-", "");
      order = "desc";
    }

    query.sort = {
      [sort]: order === "asc" ? 1 : -1,
    };
  }

  return query;
};
