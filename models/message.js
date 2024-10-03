const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

messageSchema.method('toJSON', function () {
    const { __v, _id, text, user, room, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Message', messageSchema)