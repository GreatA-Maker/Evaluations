//Publication Model

const { default: mongoose } = require("mongoose");

const publicationSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
	},
	{
		timestamps: { type: string, required: true },
	}
);

const Publication = mongoose.model("publication", publicationSchema);
