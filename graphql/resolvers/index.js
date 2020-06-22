const imageResolver = require("./image");

module.exports = {
	Query: {
		...imageResolver.Query,
	},
	Mutation: {
		...imageResolver.Mutation,
	},
};
