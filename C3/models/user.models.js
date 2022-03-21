// User Model

const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true, min: 3, max: 30 },
		lastname: { type: String, required: false, min: 3, max: 30 },
		age: { type: Number, required: true, min: 1, max: 150 },
		email: { type: String, required: true, unique: true },
		profileImages: [{ type: Image, required: true }],
	},
	{
		timestamps: { type: string, required: true },
	}
);

const User = mongoose.model("User", userSchema);
