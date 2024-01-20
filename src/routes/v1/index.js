const express = require('express');
const config = require('../../config/config');
const authRoute = require('./auth.route');
const docsRoute = require('./docs.route');
const productsRoute = require('./products.route');
const categoryRoute = require('./category.route')
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/product',
    route: productsRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});




/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
