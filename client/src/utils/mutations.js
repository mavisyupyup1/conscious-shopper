import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($userCreate: userCreate!) {
    addUser(userCreate: $userCreate) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!, $businessId: ID) {
    addThought(thoughtText: $thoughtText businessId: $businessId) {
      _id
      thoughtText
      createdAt
      username
      userId
      businessId
      reactionCount
      reactions {
        _id
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
    addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      accountType
      friendCount
      friends {
        _id
        username
      }
      votes {
        _id
        voteType
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: ID!) {
    removeFriend(id: $id) {
      _id
      username
      accountType
      friends {
        _id
        username
      }
      votes {
        _id
        voteType
      }
    }
  }
`;

export const CREATE_BUSINESS = gql`
  mutation addBusiness($business: businessCreate!){
    addBusiness(business: $business){
      _id
      title
      createdAt
      location
      links
      phone 
      description
      userId
      image
      blackOwned
      womenOwned
      closing
      momAndDad
    }
  }
`;

export const NEW_VOTE = gql`
  mutation addVote($voteType: String!, $businessId: ID!){
    addVote(voteType: $voteType, businessId: $businessId){
      _id
      voteType
      userId
      businessId
    }
  }
`;

export const UPDATE_VOTE = gql`
  mutation updateVote($voteType: String!, $id: ID!){
    updateVote(voteType: $voteType, _id: $id){
      _id
      voteType
    }
  }
`;
