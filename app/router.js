'use strict';

/**
 * @param {Egg.Application} app - egg application
 */




module.exports = app => {
  require('./router/default/index.js')(app)
  require('./router/admin/index.js')(app)
};