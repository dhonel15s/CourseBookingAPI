const jwt = require("jsonwebtoken");

// Secret code to prevent hackings 
const secret = "CourseBookingAPI"

// Create access token na kapag na nakakaresume yung email and pasword sa login 
module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret, {});
};

// Verify a token from the request or from postman
module.exports.verify = (request, response, next) => {
	let token = request.headers.authorization;

	if(typeof token != "undefined"){
		console.log(token);

		// Sample token: Bearer <actual-token>
		token = token.slice(7, token.length);


		// To verify the token using jwt, requires the token and secret key
		return jwt.verify(token, secret, (error, data) => {
			if(error){
				return response.send({
					auth: "Failed."
				});
			}else{
				next();//run the next function pending in line
			}
		})
	}else{
		return null;
	}
}


// Decode a Token - decode user details from token
module.exports.decode = (token) => {
	if(typeof token !== "undefined"){

		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (error, data) =>{
			if(error){
				return null;
			}else{
				return jwt.decode(token, {complete: true}).payload;
			}
		})
	}else{
		return null;
	}
}