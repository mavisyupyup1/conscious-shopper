import { gql } from '@apollo/client';

export const QUERY_THOUGHTS = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      userId
      businessId
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_THOUGHT = gql`
  query thought($id: ID!) {
    thought(_id: $id) {
      _id
      thoughtText
      createdAt
      userId
      businessId
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      type
      stripeId
      businesses {
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
        thoughts {
          _id
          thoughtText
          createdAt
          userId
          businessId
          reactionCount
          reactions {
            _id
            createdAt
            reactionBody
            username
          }
        }
        voteCount
        votes {
          _id
          voteType
          userId
          businessId
        }
      }
      friends {
        _id
        username
      }
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
      votes {
        _id
        voteType
        userId
        businessId
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      type
      stripeId
      businesses {
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
        thoughts {
          _id
          thoughtText
          createdAt
          userId
          businessId
          reactionCount
          reactions {
            _id
            createdAt
            reactionBody
            username
          }
        }
        voteCount
        votes {
          _id
          voteType
        }
      }
      friends {
        _id
        username
      }
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
      votes {
        _id
        voteType
        businessId
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
     type
     stripeId
      friendCount
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
      friends {
        _id
        username
      }
      votes {
        _id
        voteType
        userId
        businessId
      }
    }
  }
`;

export const QUERY_ALL_BUSINESS = gql`
  query allBusiness{
    allBusiness{
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
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
      voteCount
      votes {
        _id
        voteType
        userId
        businessId
      }
    }
  }
`

export const QUERY_BUSINESS = gql`
  query business($id: ID!){
    business(_id: $id) {
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
      thoughts {
        _id
        thoughtText
        createdAt
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
      voteCount
      votes {
        _id
        voteType
        userId
        businessId
      }
    }
  }
`;

export const QUERY_VOTE = gql`
  query vote($id: ID!){
    vote(_id: $id){
      _id
      voteType
      userId
      businessId
    }
  }
`;