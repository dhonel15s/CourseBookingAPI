// SETUP DEPENDENCIES/MODULES
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Modules from other files
const userRoutes = require("./routes/user.js")
const courseRoutes = require("./routes/course.js")

// CONVERT TO APP
const app = express();


// ADD MONGODB CONNECTION
mongoose.connect("mongodb+srv://admin:admin123@zuitt.vd4owhx.mongodb.net/Course-Booking-API?retryWrites=true&w=majority", {
	useNewUrlParser:true, 
	useUnifiedTopology:true
});


//PROMPT A MESSAGE THAT CONNECTION TO DB IS SUCCESSFUL
mongoose.connection.once("open", () => 
	console.log(`Now connected to MongoDB Atlas`));


// ADDITIONAL SETTINGS/MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Middlewares from other files or initializing the routes
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);


// APP LISTENER
//process env will prcoess either 4000 or official link that we will put
app.listen(process.env.PORT || 4000, () =>{
	console.log(`API is now online on port ${process.env.PORT || 4000}`)
}); 