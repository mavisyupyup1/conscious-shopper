const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now
    // },
    username: {
      type: String,
      required: true
    },
    userId:{
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'Business'
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    timestamps: true
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
