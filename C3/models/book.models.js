//Book Model

const User = require("./models/user.models");

const { default: mongoose } = require("mongoose");

const bookSchema = new mongoose.Schema(
	{
		likes: { type: Number, default: 1 },
		coverImage: { type: String, required: true, max: 1 },
		content: { type: string, required: true },
		userid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		publicationid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Publication",
			required: true,
		},
	},
	{
		timestamps: { type: string, required: true },
	}
);

const Book = mongoose.model("book", bookSchema);
