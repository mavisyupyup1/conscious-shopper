const { Schema, model } = require('mongoose');

const voteSchema = new Schema(
    {
        vote: {
            type: String,
            enum: ['upVote', 'downVote'],
            default: 'upVote'
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        businessId: {
            type: Schema.Types.ObjectId,
            ref: 'Business',
            required: true,
            unique: true
        }
    }
);

const Vote = model('Vote', voteSchema)

module.exports = Vote;