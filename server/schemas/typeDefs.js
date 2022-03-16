const { gql } = require('apollo-server-express');

const typeDefs = gql`

scalar Upload
scalar Date

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    businesses: [Business]
    thoughts: [Thought]
    friends: [User]
    votes: [Vote]
    stripeId:String
    type:String
  }
 
  type Business {
    _id: ID
    title: String
    createdAt: String
    location: String
    links: [String]
    phone: String
    description: String
    userId: ID
    image: [String]
    blackOwned: Boolean
    womenOwned: Boolean
    closing: Boolean
    momAndDad: Boolean
    thoughts: [Thought]
    voteCount: Int
    votes: [Vote]
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!

  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: Date
    userId: ID
    businessId: ID
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Vote {
    _id: ID
    voteType: String
    userId: ID
    businessId: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
    allBusiness: [Business] 
    business(_id: ID!): Business
    votes: [Vote]
    vote(_id: ID!): Vote
    stripeId: String
    type: String
    feed(filter: String): [Business]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, type: String, stripeId:String): Auth
    addThought(thoughtText: String!, businessId: ID): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
    addBusiness(business: businessCreate!): Business
    addVote(voteType: String!, businessId: ID!): Vote
    updateVote(voteType: String!, _id: ID!): Vote
    addStripe(stripeId:String):User,
    uploadFile(file: Upload!): File!

  }

  input businessCreate {
    title: String!
    location: String!
    links: [String]
    phone: String!
    description: String!
    image: [String]
    blackOwned: String
    womenOwned: String
    closing:String
    momAndDad:String
  }
`;


module.exports = typeDefs;
