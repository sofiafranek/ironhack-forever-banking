'use strict';

const { Router } = require('express');
const router = new Router();

const RouteGuard = require("./../middleware/route-guard");

router.get('/', RouteGuard, (req, res, next) => {
  res.json({ type: 'success', data: { title: 'Hello World' } });
});

module.exports = router;
