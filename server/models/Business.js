const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    title: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
   location: {
      type: String,
      required: true
    },
    links: [{
        type: String,
        required: true
      }],
      phone: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },

      image: [
          {
        type: String,
        required: true
      }
    ],

    blackOwned: {
        type: Boolean,
        required: true
      },

     womenOwned: {
        type: Boolean,
        required: true
      },
    thoughts:[thoughtSchema],
    reactions: [reactionSchema],
    
  },
  {
    toJSON: {
      getters: true
    },
    
  }
);
//need to figure out how to do upvote and downvote (optional)
thoughtSchema.virtual('voteCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
