module.exports.validateImage = (url, name, type) => {
	const errors = {};
	if (url.trim() === "") {
		errors.name = "url must not be empty";
	}

	if (name.trim() === "") {
		errors.lat = "name required";
	}

	if (type.trim() === "") {
		errors.long = "type required";
	}

	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};
