const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    accountType: String
    businesses: [Business]
    thoughts: [Thought]
    friends: [User]
<<<<<<< HEAD
   stripId:String
   type:String
  }

  type Order {
    _id:ID
    purchaseDate: String
=======
    votes: [Vote]
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
    thoughts: [Thought]
    voteCount: Int
    votes: [Vote]
>>>>>>> main
  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
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
    userId: ID!
    businessId: ID!
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
<<<<<<< HEAD
    stripeId: String
    type: String
   
  }
  
  type Checkout {
    session: ID
=======
    allBusiness: [Business] 
    business(_id: ID!): Business
    vote(_id: ID!): Vote
  }

  input userCreate {
    username: String!
    email: String!
    password: String!
    accountType: String!
>>>>>>> main
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(userCreate: userCreate!): Auth
    addThought(thoughtText: String!, businessId: ID): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
<<<<<<< HEAD
    createSubscription(source:String!):User
=======
    addBusiness(business: businessCreate!): Business
    addVote(voteType: String!, businessId: ID!): Vote
    updateVote(voteType: String!, _id: ID!): Vote
  }

  input businessCreate {
    title: String!
    location: String!
    links: [String]
    phone: String!
    description: String!
    image: [String]
    blackOwned: Boolean
    womenOwned: Boolean
>>>>>>> main
  }
`;


module.exports = typeDefs;
