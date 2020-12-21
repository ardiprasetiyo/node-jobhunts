const express = require('express');
const router = express.Router();
const JobsController = require('../controllers/Jobs')
const CvController = require('../controllers/Cv')
// Endpoints V1
router.patch('/v1/jobs/', JobsController.updateJobCatalogue)
router.get('/v1/jobs', JobsController.getJobs)
router.post('/v1/cv', CvController.storeCv)
router.get('/v1/cv/:cvId', CvController.getCv)
router.get('*', (_, res) => res.json({statusCode: 404, message: 'Resources not found'}) )

module.exports = router;
