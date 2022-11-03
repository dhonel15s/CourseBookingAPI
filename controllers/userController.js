const User = require("../models/User.js");
const Course = require("../models/Course.js");

// Add bcrypt dependency
const bcrypt = require("bcrypt");

// Add jsonwebtoken dependency
const auth = require("../auth.js");

module.exports.checkEmailExists = (reqBody) => {
	return User.find({email : reqBody.email})
	.then((result) => {
		if (result.length > 0) {
			return true;
		}else{
			return false;
		}
	})
}

module.exports.registerUser = (reqBody) => {
	let newUser = new User({
		firstName : reqBody.firstName,
		lastName : reqBody.lastName,
		email : reqBody.email,
		mobileNo : reqBody.mobileNo,
		password : bcrypt.hashSync(reqBody.password, 10)//10 is salt(level of encryption)
	})

	return newUser.save()
	.then((user, error) => {
		if(error){
			return false;
		}else{
			return true;
		}
	})
}

module.exports.loginUser = (reqBody) => {
	return User.findOne({email : reqBody.email})
	.then(result => {
		if(result == null){
			return false;
		}else{
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)
			if(isPasswordCorrect){
				return {access: auth.createAccessToken(result)};
			}
		}
	})
}

module.exports.getProfile = (data) => {
	return User.findById(data.userId)
	.then(result => {
		return result;
	})
}

//Use "async" because this function might take too long to respond since this uses 2DB
module.exports.enroll = async (data) => {

	// Adds the courseId in the User's enrollment array
	let isUserUpdated = await User.findById(data.userId)
	.then(user => {
		user.enrollments.push({courseId : data.courseId});

		return user.save()
		.then((user, error) => {
			if(error){
				return false;
			}else{
				return true;
			}
		})
	})

	//Add the userId in the Course enrollees
	let isCourseUpdated = await Course.findById(data.courseId)
	.then(course => {
		course.enrollees.push({userId: data.userId});

		return course.save()
		.then((course, error) => {
			if(error){
				return false;
			}else{
				return true;
			}
		})
	})



	// COMBINE: Check if both user and course was updated successfully
	if(isUserUpdated && isCourseUpdated){
		return true;
	}else{
		return false;
	}
}