const User = require("./models/user.models");

const Book = require("./models/book.models");

//Publication Model

const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		body: { type: String, required: true },
		userid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		bookid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
			required: true,
		},
	},
	{
		timestamps: { type: string, required: true },
	}
);

const Comment = mongoose.model("comment", commentSchema);
