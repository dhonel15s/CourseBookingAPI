const express = require("express");
const router = express.Router();

const Course =  require("../models/Course.js");
const courseController =  require("../controllers/courseController.js");

const auth = require("../auth.js")



// ACTIVITY

// Routes go here


// Creating a single course
router.post("/create", auth.verify, (request, response) => {

	const isAdmin = auth.decode(request.headers.authorization).isAdmin; 

	courseController.addCourse(request.body, isAdmin)
	.then(resultFromController => {response.send(resultFromController)});
})


// Get all courses
router.get("/all", (request, response) => {
	courseController.getAllCourses()
	.then(resultFromController => {response.send(resultFromController)});
})

// Get all active courses
router.get("/active", (request, response) => {
	courseController.getActiveCourses()
	.then(resultFromController => {response.send(resultFromController)});
})

// Get specific courses
router.get("/:courseId", (request, response) => {
	courseController.getCourse(request.params.courseId)
	.then(resultFromController => {response.send(resultFromController)});
})

// Update a single course
router.patch("/:courseId/update", auth.verify, (request, response) => {
	courseController.updateCourse(request.params.courseId, request.body)
	.then(resultFromController => {response.send(resultFromController)});
})

router.patch("/:courseId/archive", auth.verify, (request, response) => {
	courseController.archiveCourse(request.params.courseId)
	.then(resultFromController => {response.send(resultFromController)});
})

module.exports = router;