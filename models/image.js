const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lotSchema = new Schema({
	url: String,
	name: String,
	type: String,
	metaData: [{ size: String, extType: String }],
});

module.exports = mongoose.model("Image", lotSchema);
