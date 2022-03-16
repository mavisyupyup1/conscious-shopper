const { Schema, model } = require('mongoose');

const voteSchema = new Schema(
    {
        voteType: {
            type: String,
            default: 'upVote'
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        businessId: {
            type: Schema.Types.ObjectId,
            ref: 'Business',
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Vote = model('Vote', voteSchema);

module.exports = Vote;