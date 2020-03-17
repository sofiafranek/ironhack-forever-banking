'use strict';

const { Router } = require('express');
const router = new Router();

const RouteGuard = require('./../middleware/route-guard');

router.get('', RouteGuard, async (req, res, next) => {
  
});

router.get('', async (req, res, next) => {

});

module.exports = router;
