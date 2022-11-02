const Course = require("../models/Course.js");

module.exports.addCourse = (reqBody, isAdmin) => {

	if(isAdmin){

		let newCourse = new Course({
			name: reqBody.name,
			description: reqBody.description,
			price: reqBody.price
		})

		return newCourse.save()
		.then((newCourse, error) => {
			if(error){
				return false;
			}

			return true
		})

	}
	// To avoid errors when user is not admin, we should return a promise
	let message = Promise.resolve('User must be ADMIN to access this.');

	return message.then((value) => {
		return value;
	});

}

module.exports.getAllCourses = () => {
	return Course.find({})//if ({}) it means get all or display all
	.then(result => {
		return result;
	})
}

module.exports.getActiveCourses = () => {
	return Course.find({ isActive: true})
	.then(result => {
		return result;
	})
}

module.exports.getCourse = (courseId) => {
	return Course.findById(courseId)
	.then(result => {
		return result;
	})
}

module.exports.updateCourse = (courseId, newData) => {
	return Course.findByIdAndUpdate(courseId, {
		name: newData.name,
		description: newData.description,
		price: newData.price
	})
	.then((updateCourse, error) => {
		if (error) {
			return false;
		}

		return true;
	})
}

module.exports.archiveCourse = (courseId) => {
	return Course.findByIdAndUpdate(courseId, {
		isActive: false
	})
	.then((archiveCourse, error) => {
		if (error) {
			return false;
		}

		return true;
	})
}
