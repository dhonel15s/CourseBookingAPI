const express = require("express");
const router = express.Router();

const User =  require("../models/User.js");
const userController =  require("../controllers/userController.js");

const auth = require("../auth.js")


router.post("/checkEmail", (request, response) => {
	userController.checkEmailExists(request.body)
	.then(resultFromController =>response.send(resultFromController)); 
});


router.post("/register", (request, response) => {
	userController.registerUser(request.body)
	.then(resultFromController => response.send(resultFromController));
});


router.post("/login", (request, response) => {
	userController.loginUser(request.body)
	.then(resultFromController => response.send(resultFromController));
});

// S38 Activity - Code Along
// auth.verify is a middleware
router.post("/details", auth.verify, (request, response) => {
	//we can get token by accessing request.headers.authorization
	const userData = auth.decode(request.headers.authorization)

	userController.getProfile({userId :userData.id})
	.then(resultFromController => response.send(resultFromController));
});



router.post("/enroll", auth.verify, (request, response) => {
	let data = {
		userId : auth.decode(request.headers.authorization).id,
		courseId: request.body.courseId
	}

	userController.enroll(data)
	.then(resultFromController => response.send(resultFromController));
});


module.exports = router;