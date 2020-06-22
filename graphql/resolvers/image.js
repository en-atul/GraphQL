const { UserInputError } = require("apollo-server");
const Image = require("../../models/image");
const { validateImage } = require("../../util/validators");
const got = require("got");
const FileType = require("file-type");
var link = require("url");
var http = require("https");
var request = require("request");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var sizeOf = require("image-size");
module.exports = {
	Query: {
		async getImage() {
			try {
				const image = await Image.find();
				return image;
			} catch (err) {
				throw new Error(err);
			}
		},
		async getSingleImage(_, { name }) {
			if (name.trim() === "") {
				throw new UserInputError("name required");
			}

			try {
				const image = await Image.find({ name });
				if (image) {
					return image;
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async addImage(_, { url, name, type }) {
			let len = "";
			const { valid, errors } = validateImage(url, name, type);
			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}
			const image = await Image.findOne({ name });
			if (image) {
				errors.general = "Image name already exist";
				throw new UserInputError("Image name already exist", { errors });
			}

			const stream = got.stream(url);
			var fi = await FileType.fromStream(stream);

			function getFileSize(url) {
				var fileSize = "";
				var http = new XMLHttpRequest();
				http.open("HEAD", url, false); // false = Synchronous

				http.send(null); // it will stop here until this http request is complete

				// when we are here, we already have a response, b/c we used Synchronous XHR

				if (http.status === 200) {
					fileSize = http.getResponseHeader("content-length");
				}

				return fileSize;
			}

			const newImage = new Image({
				url,
				name,
				type,
				metaData: {
					size: getFileSize(url),
					extType: fi.ext,
				},
			});

			const res = await newImage.save();
			return res;
		},
	},
};
