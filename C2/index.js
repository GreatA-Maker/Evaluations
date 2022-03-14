const express = require("express");

const mongoose = require("mongoose");
const { stringify } = require("querystring");

const app = express();

const connect = () => {
	return mongoose.connect(
		"mongodb+srv://user:userpass@cluster0.knoe0.mongodb.net/myFirstDatabase"
	);
};

//user schema

const userSchema = new mongoose.Schema({
	firstName: { type: string, required: true },
	middleName: { type: string, required: false },
	lastName: { type: string, required: true },
	age: { type: number, required: true },
	email: { type: email, required: true },
	address: { type: string, required: true },
	gender: { type: string, default: "Female", require: false },
	gender: { type: string, default: "customer", require: false },
	createdAt: { type: Date, required: true, default: Date.now },
	updatedAt: { type: Date, required: true, default: Date.now },
});

const User = mongoose.model("user", userSchema);

// BranchDetail schema
const BranchDetailSchema = new mongoose.Schema({
	name: { type: string, required: true },
	address: { type: string, required: true },
	IFSC: { type: string, required: true },
	MICR: { type: number, required: true },
	createdAt: { type: Date, required: true, default: Date.now },
	updatedAt: { type: Date, required: true, default: Date.now },
});

const branch = mongoose.model("branch", BranchDetailSchema);

//MasterAccount Schema
const MasterAccountSchema = new mongoose.Schema({
	userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	branch: { type: mongoose.Schema.Types.name, ref: "branch" },
	balance: { type: number, required: true },
	createdAt: { type: Date, required: true, default: Date.now },
	updatedAt: { type: Date, required: true, default: Date.now },
});

const MasterAccount = mongoose.model("masterAccount", MasterAccountSchema);

//SavingsAccount Schema
const SavingsAccountSchema = new mongoose.Schema({
	userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	account_number: { type: number, unique: true },
	createdAt: { type: Date, required: true, default: Date.now },
	updatedAt: { type: Date, required: true, default: Date.now },
});

const SavingsAccount = mongoose.model("savingsAccount", SavingsAccountSchema);

//FixedAccount schema
const FixedAccountSchema = new mongoose.Schema({
	userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	account_number: { type: number, unique: true },
	balance: { type: number, required: true },
	interestRate: { type: number, required: true },
	startDate: { type: Date, required: true },
	maturityDate: { type: Date, required: true },
	createdAt: { type: Date, required: true, default: Date.now },
	updatedAt: { type: Date, required: true, default: Date.now },
});

const FixedAccount = mongoose.model("fixedAccount", FixedAccountSchema);

// GET API to get all the details of the master account ( here you will get the complete detail of
// the master account collection along with the full user detail )

app.get("/masterAccount", async (req, res) => {
	try {
		const details = await MasterAccount.create(req.body);

		return res.status(200).send(masterAccount);
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
});

// POST API for the user to create a SavingsAccount

app.post("/savingaccount", async (req, res) => {
	try {
		const savingsAccount = await SavingsAccount.create(req.body);

		return res.status(200).send(savingsAccount);
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
});

//POST API for the user to create a FixedAccount

app.post("/fixedaccount", async (req, res) => {
	try {
		const fixedAccount = await FixedAccount.create(req.body);

		return res.status(200).send(savingsfixed);
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
});

// GET API that takes the master account id and returns a list of all the accounts that the user has
// but only the account_number and balance

app.get("masterAccount/:id", async (req, res) => {
	try {
		const details = await MasterAccount.findById(req.params.id).lean().exec();

		return res.status(200).send(masterAccount);
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
});

//DELETE API for fixed account

app.delete("fixedaccount/:id", async (req, res) => {
	try {
		const fixed = await FixedAccount.findById(req.params.id).lean().exec();

		return res.status(200).send(fixed);
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
});

//POST API that will on maturity transfer the balance of FixedAccount to the SavingsAccount

app.post("fixedaccount", async (req, res) => {
	try {
		const fixedaccount = await FixedAccount.findById(req.params.id)
			.lean()
			.exec();

		return res.status(200).send(fixedaccount);
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
});

app.listen(5000, async () => {
	try {
		await connect();
	} catch (err) {
		console.log(err);
	}

	console.log("Listening on port 5000");
});
