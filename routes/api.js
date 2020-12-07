const express = require('express');
const router = express.Router();
const JobsController = require('../controllers/Jobs')

// Endpoints V1
router.patch('/v1/jobs/', JobsController.updateJobCatalogue)
router.get('*', (_, res) => res.json({statusCode: 404, message: 'Resources not found'}) )

module.exports = router;
