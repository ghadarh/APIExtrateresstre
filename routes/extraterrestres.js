const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const { validateParam, schemas } = require('../helpers/routehelpers');
const ExtraterrestresController = require('../controllers/extraterrestres');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

// GET/POST Extraterrestre
router.route('/extraterrestre')
  .get(ExtraterrestresController.getAllExtraterrestres)
  .post(ExtraterrestresController.newExtraterrestre);


// GET/PUT Single Extraterrestre
router.route('/extraterrestre/:ExtId')
  .get(ExtraterrestresController.getSingleExtraterrestre)
  .put(ExtraterrestresController.updateExtraterrestre)
  .delete(ExtraterrestresController.deleteExtraterrestre);

  router.route('/signup')
  .post(ExtraterrestresController.signUp);

  router.route('/signin')
   .post(passportSignIn, ExtraterrestresController.signIn);

  router.route('secret')
   .get(passportJWT, ExtraterrestresController.secret);




module.exports = router;
