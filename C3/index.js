const express = require("express");
const mongoose = require("mongoose");

//user
const User = require("./models/user.models");

//book
const Book = require("./models/book.models");

//publication
const Publication = require("./models/publication.models");

//comment

const Comment = require("./models/comment.models");

const connect = require("./configs/db");

const app = express();

app.user(express.json());

//validation

const { body, validationresult } = require("express-validator");

app.post(
	"/user",
	body("firstname").trim().not().isEmpty(),
	body("lastname").trim().not().isEmpty(),
	body("age")
		.not()
		.isEmpty.withMessage("Age cannot be empty")
		.isNumeric()
		.withMessage("age must be between 1 and 150")
		.custom((val) => {
			if (val < 1 || val > 150) {
				throw new Error("Incorrect age provided");
			}
		}),
	body("email")
		.isEmail()
		.custom(async (value) => {
			const user = await User.findOne({ email: value });

			if (User) {
				throw new Error("Email is already taken");
			}
			return true;
		}),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const user = await User.create(req.body);
	}
);
