function getPagination(query) {
  const page = Math.max(parseInt(query.page || '1', 10), 1);
  const limitRaw = parseInt(query.limit || '10', 10);
  const limit = Math.min(Math.max(limitRaw, 1), 50);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

function buildPaginationMeta(page, limit, totalItems) {
  const totalPages = Math.max(Math.ceil(totalItems / limit), 1);
  return { page, limit, totalPages, totalItems };
}

module.exports = { getPagination, buildPaginationMeta };




