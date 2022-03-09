const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const businessSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [ 2, 'Provide a legal name for your business!!' ],
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
   location: {
      type: String,
      unique: true,
      required: true
    },
    links: [{
        type: String
      }],
    phone: {
      type: String,
      required: true,
      match: [/^([\d+]{3})[\.-]+([\d+]{3})[\.-]+([\d+]{4})$/, "Provide a valid phone number in `555-555-5555` format"]
    },
    description: {
      type: String,
      required: true
    },
    image: [
      {
        type: String
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
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vote'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    
  }
);
//need to figure out how to do upvote and downvote (optional)
businessSchema.virtual('voteCount').get(function() {
  return this.votes.length
});

const Business = model('Business', businessSchema);

module.exports = Business;
