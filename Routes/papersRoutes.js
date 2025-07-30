const express = require('express');

const router = express.Router();
const papersController = require('../Controllers/papersController');

router.get('/papers', papersController.getAllPapers);

router.get('/papers/:id' ,papersController.getAllPapersByID);

router.get('/papers/name/:name', papersController.getAllPapersByName);

router.get('/papers/charges/:charge', papersController.GetAllPapersByCharges);

router.get('/papers/:id/charges', papersController.getPaperChargesByID);

router.get('/papers/name/:name/charges', papersController.getPaperChargesByName);


module.exports = router;

