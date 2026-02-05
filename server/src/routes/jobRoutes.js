const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.post('/', auth, jobController.createJob);

module.exports = router;
