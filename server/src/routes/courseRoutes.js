const express = require('express');
const router = express.Namespace ? express.Namespace() : express.Router();
const courseController = require('../controllers/courseController');

router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);

module.exports = router;
