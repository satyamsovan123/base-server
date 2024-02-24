/**
 * @fileoverview This file contains constants used for pagination configuration
 * @module configs/paginationConfig
 */

/**
 * This constant is used for pagination configuration
 * @constant {object}
 */
const paginationConfig = {
  page: 1,
  limit: 5,
  lean: true,
  offset: 0,
  // sort: { createdAt: -1 },
};

module.exports = { paginationConfig };
