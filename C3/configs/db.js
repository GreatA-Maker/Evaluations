const mongoose = require("mongoose");

const connect = () => {
	return mongoose.connect(
		"mongodb+srv://cluster0.knoe0.mongodb.net/myFirstDatabase"
	);
};

module.exports = connect;
