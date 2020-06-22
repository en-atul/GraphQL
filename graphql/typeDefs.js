const { gql } = require("apollo-server");

// The GraphQL schema
module.exports = gql`
	type Image {
		id: ID!
		url: String!
		name: String!
		type: String!
		metaData: [Meta]!
	}

	type Meta {
		id: ID!
		size: String!
		extType: String!
	}

	type Query {
		getImage: [Image]
		getSingleImage(name: String!): [Image]
	}

	type Mutation {
		addImage(url: String!, name: String!, type: String!): Image!
	}
`;
